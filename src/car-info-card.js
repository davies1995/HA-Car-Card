import { LitElement, html, nothing } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import { styles } from "./style.js";
import {
  BOOT_DEF,
  DOOR_DEFS,
  WINDOW_DEFS,
  convertDistance,
  formatDistance,
  isOpen,
  normalizeUnit,
  unitFromState,
  unitLabel,
} from "./vehicle-config.js";
import { getVehicle } from "./vehicles/index.js";
import "./editor.js";

const VERSION = "1.2.0";
const UNAVAILABLE = new Set(["unavailable", "unknown", "none", ""]);

console.info(
  `%c CAR-INFO-CARD %c ${VERSION} `,
  "color: #fff; background: #03a9f4; font-weight: 700;",
  "color: #03a9f4; background: #fff; font-weight: 700;"
);

function cleanText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function isUnavailable(stateObj) {
  return !stateObj || UNAVAILABLE.has(String(stateObj.state).trim().toLowerCase());
}

function numericState(stateObj) {
  if (isUnavailable(stateObj)) return null;
  const value = Number(stateObj.state);
  return Number.isFinite(value) ? value : null;
}

function displayValue(stateObj) {
  if (!stateObj) return "Not found";
  const state = String(stateObj.state).trim().toLowerCase();
  if (state === "unavailable") return "Unavailable";
  if (state === "unknown" || state === "none" || state === "") return "Unknown";
  return stateObj.state;
}

function batteryIcon(level) {
  if (!Number.isFinite(level)) return "mdi:battery-unknown";
  if (level <= 5) return "mdi:battery-outline";
  if (level >= 95) return "mdi:battery";
  const step = Math.max(10, Math.round(level / 10) * 10);
  return `mdi:battery-${step}`;
}

function levelTone(percent) {
  if (percent <= 15) return "low";
  if (percent <= 30) return "medium";
  return "high";
}

function sourceUnit(setting, stateObj, displayUnit) {
  return normalizeUnit(setting) || unitFromState(stateObj) || normalizeUnit(displayUnit) || "mi";
}

class CarInfoCard extends LitElement {
  static get properties() {
    return {
      hass: { attribute: false },
      _config: { attribute: false },
    };
  }

  static get styles() {
    return styles;
  }

  static async getConfigElement() {
    return document.createElement("car-info-card-editor");
  }

  static getStubConfig(hass) {
    const ids = Object.keys(hass?.states ?? {});
    const find = (pattern) => ids.find((id) => pattern.test(id));
    const config = {
      title: "My Vehicle",
      car_model: "hatchback",
      mileage_unit: "mi",
      range_unit: "mi",
      display_unit: "mi",
    };
    const battery = find(/^sensor\..*(battery|soc)/i);
    const mileage = find(/^sensor\..*(odometer|mileage|total_distance)/i);
    const range = find(/^sensor\..*range/i);
    const boot = find(/(boot|trunk|tailgate)/i);
    if (battery) config.battery_entity = battery;
    if (mileage) config.mileage_entity = mileage;
    if (range && range !== mileage) config.range_entity = range;
    if (boot) config.boot_entity = boot;
    for (const definition of [...DOOR_DEFS, ...WINDOW_DEFS]) {
      const pattern = new RegExp(definition.id.replace("-", "[-_ ]"), "i");
      const kind = definition.key.includes("door") ? "door" : "window";
      const match = ids.find((id) => pattern.test(id) && new RegExp(kind, "i").test(id));
      if (match) config[definition.key] = match;
    }
    return config;
  }

  setConfig(config) {
    if (!config || typeof config !== "object" || Array.isArray(config)) {
      throw new Error("Card configuration must be an object");
    }
    this._config = {
      title: "My Vehicle",
      car_model: "hatchback",
      mileage_unit: "mi",
      range_unit: "mi",
      display_unit: "mi",
      ...config,
    };
  }

  getCardSize() {
    return 7;
  }

  _resolve(value) {
    const id = cleanText(value);
    if (!id) return { configured: false, entityId: "", stateObj: null };
    return {
      configured: true,
      entityId: id,
      stateObj: this.hass?.states?.[id] ?? null,
    };
  }

  _panel(definition) {
    const resolved = this._resolve(this._config[definition.key]);
    return {
      ...definition,
      ...resolved,
      open: resolved.configured && isOpen(resolved.stateObj),
    };
  }

  _openMoreInfo(entityIdToOpen) {
    if (!entityIdToOpen || !this.hass?.states?.[entityIdToOpen]) return;
    const event = new Event("hass-more-info", {
      bubbles: true,
      composed: true,
    });
    event.detail = { entityId: entityIdToOpen };
    this.dispatchEvent(event);
  }

  _distance(entityKey, unitKey) {
    const resolved = this._resolve(this._config[entityKey]);
    const displayUnit = normalizeUnit(this._config.display_unit) || "mi";
    if (!resolved.configured) return { ...resolved, text: "", unit: unitLabel(displayUnit) };
    const numeric = numericState(resolved.stateObj);
    if (numeric == null) {
      return { ...resolved, text: displayValue(resolved.stateObj), unit: "" };
    }
    const fromUnit = sourceUnit(this._config[unitKey], resolved.stateObj, displayUnit);
    const converted = convertDistance(numeric, fromUnit, displayUnit);
    return { ...resolved, text: formatDistance(converted), unit: unitLabel(displayUnit) };
  }

  _renderDistance(label, reading) {
    if (!reading.configured) return nothing;
    const content = html`
      <span class="label">${label}</span>
      <div class="value-container">
        <span class="value">${reading.text}</span>
        ${reading.unit ? html`<span class="unit">${reading.unit}</span>` : nothing}
      </div>
    `;
    if (!reading.stateObj) return html`<div class="info-box">${content}</div>`;
    return html`
      <button class="info-box" type="button" @click=${() => this._openMoreInfo(reading.entityId)}>
        ${content}
      </button>
    `;
  }

  _renderBattery(battery) {
    if (!battery.configured) return nothing;
    const level = numericState(battery.stateObj);
    const percent = level == null ? null : Math.min(100, Math.max(0, level));
    const tone = percent == null ? "" : levelTone(percent);
    const content = html`
      <ha-icon class=${tone} .icon=${batteryIcon(level)}></ha-icon>
      <div class="battery-copy">
        <span class="label">Battery</span>
        <div class="value-container">
          <span class="value">${percent == null ? displayValue(battery.stateObj) : formatDistance(percent)}</span>
          ${percent == null ? nothing : html`<span class="unit">%</span>`}
        </div>
        ${percent == null
          ? nothing
          : html`
              <div
                class="progress-bar"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow=${percent}
                aria-label="Battery state of charge"
              >
                <div class="progress-fill ${tone}" style=${styleMap({ width: `${percent}%` })}></div>
              </div>
            `}
      </div>
    `;
    if (!battery.stateObj) return html`<div class="battery">${content}</div>`;
    return html`
      <button class="battery" type="button" @click=${() => this._openMoreInfo(battery.entityId)}>
        ${content}
      </button>
    `;
  }

  render() {
    if (!this.hass || !this._config) return html``;

    const title = cleanText(this._config.title) || "My Vehicle";
    const doors = Object.fromEntries(DOOR_DEFS.map((definition) => [definition.id, this._panel(definition)]));
    const windows = Object.fromEntries(WINDOW_DEFS.map((definition) => [definition.id, this._panel(definition)]));
    const boot = this._panel(BOOT_DEF);
    const alerts = [
      ...Object.values(doors).filter((door) => door.open).map((door) => `${door.short} door open`),
      ...Object.values(windows).filter((windowModel) => windowModel.open).map((windowModel) => `${windowModel.short} window down`),
      ...(boot.open ? ["Boot open"] : []),
    ];
    const summary = alerts.length ? alerts.join(", ") : "Everything reported is closed";
    const vehicle = getVehicle(this._config.car_model);
    const battery = this._resolve(this._config.battery_entity);
    const mileage = this._distance("mileage_entity", "mileage_unit");
    const range = this._distance("range_entity", "range_unit");
    const hasDistance = mileage.configured || range.configured;

    return html`
      <ha-card>
        <div class="card-header">
          <div class="header-title">
            <span>${title}</span>
          </div>
        </div>
        <figure class="plan">
          ${vehicle.render({ doors, windows, boot, summary, onSelect: (entityId) => this._openMoreInfo(entityId) })}
          <figcaption class=${alerts.length ? "plan-alert" : "plan-key"}>
            ${alerts.length ? summary : "Front is at the top. Open windows turn red."}
          </figcaption>
        </figure>
        ${this._renderBattery(battery)}
        ${hasDistance
          ? html`<div class="grid-container">${this._renderDistance("Mileage", mileage)}${this._renderDistance("Range", range)}</div>`
          : nothing}
      </ha-card>
    `;
  }
}

if (!customElements.get("car-info-card")) {
  customElements.define("car-info-card", CarInfoCard);
}

window.customCards = window.customCards || [];
if (!window.customCards.some((card) => card.type === "car-info-card")) {
  window.customCards.push({
    type: "car-info-card",
    name: "Car Info Card",
    preview: true,
    description: "Top-down vehicle plan with doors, windows, boot, battery, mileage, and range.",
    documentationURL: "https://github.com/davies1995/HA-Car-Card",
  });
}
