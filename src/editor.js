import { LitElement, html, css } from "lit";

const SCHEMA = [
  { name: "title", label: "Card title", selector: { text: {} } },
  { name: "car_icon", label: "Header icon", selector: { icon: {} } },
  {
    name: "battery_entity",
    label: "Battery / fuel level",
    selector: { entity: { domain: ["sensor"] } },
  },
  {
    name: "battery_icon",
    label: "Battery / fuel icon",
    selector: { icon: {} },
  },
  {
    name: "range_entity",
    label: "Remaining range",
    selector: { entity: { domain: ["sensor"] } },
  },
  { name: "range_icon", label: "Range icon", selector: { icon: {} } },
  {
    name: "location_entity",
    label: "Location",
    selector: { entity: { domain: ["device_tracker", "person", "sensor"] } },
  },
  { name: "location_icon", label: "Location icon", selector: { icon: {} } },
  {
    name: "charging_entity",
    label: "Charging status",
    selector: { entity: { domain: ["binary_sensor", "sensor"] } },
  },
  { name: "charging_icon", label: "Charging icon", selector: { icon: {} } },
];

const HELPERS = {
  battery_entity: "Numeric level. A progress bar is shown when the value is a percentage.",
  battery_icon: "Optional. Leave empty for an automatic battery or charging icon.",
  range_entity: "Remaining range sensor. The entity's own unit is displayed.",
  location_entity: "Device tracker, person, or location sensor. home and not_home are shown as Home and Away.",
  charging_entity: "On, charging, plugged in, or connected is treated as charging.",
  charging_icon: "Optional icon shown while the vehicle is charging.",
};

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
