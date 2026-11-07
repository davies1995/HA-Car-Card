import { LitElement, html, css } from "lit";
import {
  DOOR_DEFS,
  WINDOW_DEFS,
  BOOT_DEF,
  HEADLIGHT_DEF,
  CHARGE_CABLE_DEF,
  CHARGING_DEF,
  LOCK_DEF,
  VEHICLE_OPTIONS,
  UNIT_OPTIONS,
  POWERTRAIN_OPTIONS,
  powertrain,
  showsBattery,
  showsCharging,
  showsFuel,
} from "./vehicle-config.js";

const OPEN_DOMAINS = ["binary_sensor", "sensor", "cover"];

function entityField(name, label, helper) {
  return {
    name,
    label,
    helper,
    selector: { entity: { domain: OPEN_DOMAINS } },
  };
}

function unitField(name, label, helper) {
  return {
    name,
    label,
    helper,
    selector: {
      select: {
        mode: "dropdown",
        options: UNIT_OPTIONS,
      },
    },
  };
}

function section(title, schema) {
  return {
    type: "expandable",
    name: "",
    flatten: true,
    title,
    schema,
  };
}

const VEHICLE_SECTION = section("Vehicle", [
  { name: "title", label: "Card title", selector: { text: {} } },
  {
    name: "vehicle_type",
    label: "Vehicle type",
    helper: "ICE shows the fuel tank and hides charging. EV shows the battery and charging. Hybrid shows both.",
    selector: {
      select: {
        mode: "dropdown",
        options: POWERTRAIN_OPTIONS,
      },
    },
  },
  {
    name: "car_model",
    label: "Vehicle plan",
    helper: "Top-down view drawn on the card. Choose VW ID.3, Tesla Model 3, or BMW 3 Series for those plans. More vehicles can be added here later.",
    selector: {
      select: {
        mode: "dropdown",
        options: VEHICLE_OPTIONS,
      },
    },
  },
  {
    name: "white_background",
    label: "White background",
    helper: "Fills the plan with white so the black lines stay easy to see.",
    selector: { boolean: {} },
  },
]);

function rangeHelper(type) {
  if (type === "ice") return "Estimated range from how much fuel is left.";
  if (type === "hybrid") return "Estimated range from the fuel and the battery.";
  return "Estimated range from the battery.";
}

function schemaFor(type) {
  const groups = [
    VEHICLE_SECTION,
    section(
      "Doors",
      DOOR_DEFS.map((door) =>
        entityField(
          door.key,
          door.label,
          "On or open swings this door out. Left and right are the vehicle's own sides, with the front of the plan at the top."
        )
      )
    ),
    section(
      "Windows",
      WINDOW_DEFS.map((windowDef) =>
        entityField(
          windowDef.key,
          windowDef.label,
          "On, open, down, or a position above 0 turns this window red, with the door open or shut."
        )
      )
    ),
    section("Boot", [entityField(BOOT_DEF.key, BOOT_DEF.label, "On or open highlights the boot and shows it ajar.")]),
    section("Headlights", [entityField(HEADLIGHT_DEF.key, HEADLIGHT_DEF.label, "On turns both headlights pale yellow.")]),
  ];
  if (showsCharging(type)) {
    groups.push(
      section("Charging", [
        entityField(
          CHARGE_CABLE_DEF.key,
          "Charge cable",
          "When this reports connected, on, or plugged in, a Type 2 connector appears beside the charge port."
        ),
        entityField(
          CHARGING_DEF.key,
          "Charging",
          'Use a sensor that reports "charging" or "not charging". The connector is green while charging and red when it is not.'
        ),
      ])
    );
  }
  groups.push(
    section("Lock", [
      entityField(
        LOCK_DEF.key,
        "Lock",
        'Sensor that reports "locked" or "unlocked". A red open padlock means unlocked, and a green closed padlock means locked.'
      ),
    ])
  );
  if (showsFuel(type)) {
    groups.push(
      section("Fuel", [
        {
          name: "fuel_entity",
          label: "Fuel level",
          helper: "How full the tank is, as a percentage.",
          selector: { entity: { domain: ["sensor"] } },
        },
      ])
    );
  }
  if (showsBattery(type)) {
    groups.push(
      section("Battery", [
        {
          name: "battery_entity",
          label: "State of charge",
          helper: "Battery percentage. The icon changes with the level.",
          selector: { entity: { domain: ["sensor"] } },
        },
      ])
    );
  }
  groups.push(
    section("Mileage and range", [
      {
        name: "mileage_entity",
        label: "Mileage",
        helper: "Odometer entity.",
        selector: { entity: { domain: ["sensor"] } },
      },
      unitField("mileage_unit", "Mileage entity unit", "Unit the mileage entity reports."),
      {
        name: "range_entity",
        label: "Range",
        helper: rangeHelper(type),
        selector: { entity: { domain: ["sensor"] } },
      },
      unitField("range_unit", "Range entity unit", "Unit the range entity reports."),
      unitField("display_unit", "Display unit", "Mileage and range are converted into this unit."),
    ])
  );
  return groups;
}

const SCHEMA = schemaFor("ev");

const HELPERS = Object.fromEntries(
  SCHEMA.flatMap((group) => group.schema)
    .filter((field) => field.helper)
    .map((field) => [field.name, field.helper])
);

export class CarInfoCardEditor extends LitElement {
  static get properties() {
    return {
      hass: { attribute: false },
      _config: { attribute: false },
    };
  }

  setConfig(config) {
    if (!config || typeof config !== "object" || Array.isArray(config)) {
      throw new Error("Invalid card configuration");
    }
    this._config = { ...config };
  }

  _computeLabel = (schema) => schema.label || schema.name;

  _computeHelper = (schema) => schema.helper || HELPERS[schema.name];

  _valueChanged(ev) {
    ev.stopPropagation();
    if (!this._config || !this.hass || !ev.detail?.value) return;

    const newConfig = { ...this._config, ...ev.detail.value };
    for (const [key, value] of Object.entries(newConfig)) {
      if (value === "" || value === null || value === undefined) {
        delete newConfig[key];
      }
    }

    if (JSON.stringify(newConfig) === JSON.stringify(this._config)) return;

    this._config = newConfig;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: newConfig },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    if (!this.hass || !this._config) {
      return html``;
    }

    const data = { vehicle_type: "ev", ...this._config };
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${data}
        .schema=${schemaFor(powertrain(data.vehicle_type))}
        .computeLabel=${this._computeLabel}
        .computeHelper=${this._computeHelper}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }

    ha-form {
      display: block;
      padding: 16px;
    }
  `;
}

if (!customElements.get("car-info-card-editor")) {
  customElements.define("car-info-card-editor", CarInfoCardEditor);
}
