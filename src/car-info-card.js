import { LitElement, html, nothing } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import { styles } from "./style.js";
import "./editor.js";

const VERSION = "1.0.0";
const UNAVAILABLE = new Set(["unavailable", "unknown", "none", ""]);
const CHARGING_ON = new Set(["on", "true", "charging", "plugged_in", "plugged in", "connected"]);

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

function isPercentLevel(stateObj, value) {
  if (!Number.isFinite(value)) return false;
  const unit = String(stateObj?.attributes?.unit_of_measurement ?? "").trim().toLowerCase();
  if (unit === "%" || unit === "percent") return true;
  return unit === "" && value >= 0 && value <= 100;
}

function levelTone(percent, charging) {
  if (charging) return "charging";
  if (percent <= 15) return "low";
  if (percent <= 30) return "medium";
  return "high";
}

function batteryIcon(level, charging) {
  if (!Number.isFinite(level)) {
    return charging ? "mdi:battery-charging" : "mdi:battery";
  }
  if (level <= 5) {
    return charging ? "mdi:battery-charging-outline" : "mdi:battery-outline";
  }
  if (level >= 95) {
    return charging ? "mdi:battery-charging-100" : "mdi:battery";
  }
  const step = Math.max(10, Math.round(level / 10) * 10);
  return charging ? `mdi:battery-charging-${step}` : `mdi:battery-${step}`;
}

function isCharging(stateObj) {
  if (isUnavailable(stateObj)) return false;
  const state = String(stateObj.state).trim().toLowerCase();
  if (CHARGING_ON.has(state)) return true;
  return stateObj.attributes?.charging === true;
}

function formatToken(value) {
  return String(value)
    .replace(/[_-]+/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function chargingLabel(stateObj) {
  if (!stateObj) return "Not found";
  const state = String(stateObj.state).trim().toLowerCase();
  if (state === "unavailable") return "Unavailable";
  if (state === "unknown" || state === "none" || state === "") return "Unknown";
  if (isCharging(stateObj)) return "Charging";
  if (["off", "false", "not_charging", "not charging", "disconnected", "unplugged", "idle"].includes(state)) {
    return "Not charging";
  }
  return formatToken(stateObj.state);
}

function formatLocation(stateObj) {
  if (!stateObj) return "Not found";
  const state = String(stateObj.state).trim().toLowerCase();
  if (state === "home") return "Home";
  if (state === "not_home" || state === "not home") return "Away";
  if (state === "unavailable") return "Unavailable";
  if (state === "unknown" || state === "none" || state === "") return "Unknown";
  return formatToken(stateObj.state);
}

function displayValue(stateObj) {
  if (!stateObj) return "Not found";
  const state = String(stateObj.state).trim().toLowerCase();
  if (state === "unavailable") return "Unavailable";
  if (state === "unknown" || state === "none" || state === "") return "Unknown";
  return stateObj.state;
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
    const states = hass?.states ?? {};
    const ids = Object.keys(states);
    const battery = ids.find((id) => id.startsWith("sensor.") && /battery|fuel|soc/i.test(id));
    const range = ids.find((id) => id.startsWith("sensor.") && /range/i.test(id) && id !== battery);
    const location = ids.find((id) => id.startsWith("device_tracker.") || id.startsWith("person."));
    const charging = ids.find(
      (id) => /charg/i.test(id) && (id.startsWith("binary_sensor.") || id.startsWith("sensor."))
    );

    return {
      title: "My Vehicle",
      car_icon: "mdi:car",
      ...(battery ? { battery_entity: battery } : {}),
      ...(range ? { range_entity: range } : {}),
      ...(location ? { location_entity: location } : {}),
      ...(charging ? { charging_entity: charging } : {}),
    };
  }

  setConfig(config) {
    if (!config || typeof config !== "object" || Array.isArray(config)) {
      throw new Error("Card configuration must be an object");
    }
    this._config = {
      title: "My Vehicle",
      car_icon: "mdi:car",
      ...config,
    };
  }

  getCardSize() {
    return 3;
  }

  _resolve(value) {
    const id = cleanText(value);
    if (!id) {
      return { configured: false, entityId: "", stateObj: null };
    }
    return {
      configured: true,
      entityId: id,
      stateObj: this.hass?.states?.[id] ?? null,
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

  _renderChargingIndicator(stateObj) {
    const charging = isCharging(stateObj);
    const label = chargingLabel(stateObj);
    const icon = charging ? cleanText(this._config.charging_icon) || "mdi:ev-station" : "mdi:power-plug-off";
    return html`
      <span class="charge-indicator ${charging ? "charging" : "not-charging"}" title=${label} role="img" aria-label=${label}>
        <ha-icon .icon=${icon}></ha-icon>
        <span>${label}</span>
      </span>
    `;
  }

  _renderBox(resolved, content) {
    if (!resolved.configured) return nothing;
    if (!resolved.stateObj) {
      return html`<div class="info-box">${content}</div>`;
    }
    return html`
      <button class="info-box" type="button" @click=${() => this._openMoreInfo(resolved.entityId)}>
        ${content}
      </button>
    `;
  }

  _renderBattery(resolved, charging) {
    const iconOverride = cleanText(this._config.battery_icon);
    const level = numericState(resolved.stateObj);
    const showBar = isPercentLevel(resolved.stateObj, level);
    const percent = showBar ? Math.min(100, Math.max(0, level)) : null;
    const tone = percent == null ? "" : levelTone(percent, charging);
    const icon = iconOverride || batteryIcon(level, charging);
    const unit = showBar
      ? resolved.stateObj?.attributes?.unit_of_measurement || "%"
      : resolved.stateObj?.attributes?.unit_of_measurement || "";

    return this._renderBox(
      resolved,
      html`
        <ha-icon class=${tone} .icon=${icon}></ha-icon>
        <span class="label">Battery / Fuel</span>
        <div class="value-container">
          <span class="value">${displayValue(resolved.stateObj)}</span>
          ${unit && !isUnavailable(resolved.stateObj) ? html`<span class="unit">${unit}</span>` : nothing}
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
                aria-label="Battery or fuel level"
              >
                <div class="progress-fill ${tone}" style=${styleMap({ width: `${percent}%` })}></div>
              </div>
            `}
      `
    );
  }

  _renderRange(resolved) {
    const icon = cleanText(this._config.range_icon) || "mdi:map-marker-distance";
    const unit = isUnavailable(resolved.stateObj) ? "" : resolved.stateObj?.attributes?.unit_of_measurement || "";
    return this._renderBox(
      resolved,
      html`
        <ha-icon .icon=${icon}></ha-icon>
        <span class="label">Range</span>
        <div class="value-container">
          <span class="value">${displayValue(resolved.stateObj)}</span>
          ${unit ? html`<span class="unit">${unit}</span>` : nothing}
        </div>
      `
    );
  }

  _renderLocation(resolved) {
    const icon = cleanText(this._config.location_icon) || "mdi:crosshairs-gps";
    return this._renderBox(
      resolved,
      html`
        <ha-icon .icon=${icon}></ha-icon>
        <span class="label">Location</span>
        <div class="value-container">
          <span class="value location">${formatLocation(resolved.stateObj)}</span>
        </div>
      `
    );
  }

  render() {
    if (!this.hass || !this._config) {
      return html``;
    }

    const title = cleanText(this._config.title) || "My Vehicle";
    const icon = cleanText(this._config.car_icon) || "mdi:car";
    const battery = this._resolve(this._config.battery_entity);
    const range = this._resolve(this._config.range_entity);
    const location = this._resolve(this._config.location_entity);
    const charging = this._resolve(this._config.charging_entity);
    const chargingNow = isCharging(charging.stateObj);
    const hasTile = battery.configured || range.configured || location.configured;

    return html`
      <ha-card>
        <div class="card-header">
          <div class="header-title">
            <ha-icon .icon=${icon}></ha-icon>
            <span>${title}</span>
          </div>
          ${charging.configured ? this._renderChargingIndicator(charging.stateObj) : nothing}
        </div>
        ${hasTile
          ? html`
              <div class="grid-container">
                ${this._renderBattery(battery, chargingNow)}
                ${this._renderRange(range)}
                ${this._renderLocation(location)}
              </div>
            `
          : html`<div class="empty">Choose a battery, range, or location entity in the card options.</div>`}
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
    description: "Displays battery or fuel level, range, location, and charging status for a vehicle.",
    documentationURL: "https://github.com/davies1995/HA-Car-Card",
  });
}
