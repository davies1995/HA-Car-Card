import { LitElement, html, css } from "lit";
import { DOOR_DEFS, WINDOW_DEFS, BOOT_DEF, VEHICLE_OPTIONS, UNIT_OPTIONS } from "./vehicle-config.js";

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

const SCHEMA = [
  section("Vehicle", [
    { name: "title", label: "Card title", selector: { text: {} } },
    {
      name: "car_model",
      label: "Vehicle plan",
      helper: "Top-down view drawn on the card. More vehicles can be added here later.",
      selector: {
        select: {
          mode: "dropdown",
          options: VEHICLE_OPTIONS,
        },
      },
    },
  ]),
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
  section("Boot", [
    entityField(BOOT_DEF.key, BOOT_DEF.label, "On or open highlights the boot and shows it ajar."),
  ]),
  section("Battery", [
    {
      name: "battery_entity",
      label: "State of charge",
      helper: "Battery percentage. The icon changes with the level.",
      selector: { entity: { domain: ["sensor"] } },
    },
  ]),
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
      helper: "Estimated range remaining.",
      selector: { entity: { domain: ["sensor"] } },
    },
    unitField("range_unit", "Range entity unit", "Unit the range entity reports."),
    unitField("display_unit", "Display unit", "Mileage and range are converted into this unit."),
  ]),
];

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

  _computeHelper = (schema) => HELPERS[schema.name];

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

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${SCHEMA}
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
