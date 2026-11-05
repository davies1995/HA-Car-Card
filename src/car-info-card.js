import { LitElement, html, nothing } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import { styles } from "./style.js";
import {
  BOOT_DEF,
  HEADLIGHT_DEF,
  DOOR_DEFS,
  WINDOW_DEFS,
  convertDistance,
  formatDistance,
  isCableConnected,
  isCharging,
  isOpen,
  lockStatus,
  normalizeUnit,
  powertrain,
  showsBattery,
  showsCharging,
  showsFuel,
  unitFromState,
  unitLabel,
} from "./vehicle-config.js";
import { getVehicle } from "./vehicles/index.js";
import { padlockIcon, type2Icon } from "./icons.js";
import "./editor.js";

const VERSION = "1.8.0";
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
      vehicle_type: "ev",
      mileage_unit: "mi",
      range_unit: "mi",
      display_unit: "mi",
    };
    const battery = find(/^sensor\..*(battery|soc)/i);
    const fuel = find(/^sensor\..*(fuel|tank|petrol|diesel)/i);
    const mileage = find(/^sensor\..*(odometer|mileage|total_distance)/i);
    const range = find(/^sensor\..*range/i);
    const boot = find(/(boot|trunk|tailgate)/i);
    const headlights = find(/headlight|main_light|lights/i);
    const cable = find(/charge.*(cable|plug|connect)|plug.*(connect|status)/i);
    const charging = find(/charging/i);
    const lock = find(/(^|[^a-z])lock/i);
    if (battery) config.battery_entity = battery;
    if (fuel) config.fuel_entity = fuel;
    if (mileage) config.mileage_entity = mileage;
    if (range && range !== mileage) config.range_entity = range;
    if (boot) config.boot_entity = boot;
    if (headlights) config.headlights_entity = headlights;
    if (cable) config.charge_cable_entity = cable;
    if (charging && charging !== cable) config.charging_entity = charging;
    if (lock) config.lock_entity = lock;
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
      vehicle_type: "ev",
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

  _renderLevel(label, reading, iconFor, aria) {
    if (!reading.configured) return nothing;
    const level = numericState(reading.stateObj);
    const percent = level == null ? null : Math.min(100, Math.max(0, level));
    const tone = percent == null ? "" : levelTone(percent);
    const icon = typeof iconFor === "function" ? iconFor(level) : iconFor;
    const content = html`
      <ha-icon class=${tone} .icon=${icon}></ha-icon>
      <div class="battery-copy">
        <span class="label">${label}</span>
        <div class="value-container">
          <span class="value">${percent == null ? displayValue(reading.stateObj) : formatDistance(percent)}</span>
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
                aria-label=${aria}
              >
                <div class="progress-fill ${tone}" style=${styleMap({ width: `${percent}%` })}></div>
              </div>
            `}
      </div>
    `;
    if (!reading.stateObj) return html`<div class="battery">${content}</div>`;
    return html`
      <button class="battery" type="button" @click=${() => this._openMoreInfo(reading.entityId)}>
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
    const headlights = this._panel(HEADLIGHT_DEF);
    const type = powertrain(this._config.vehicle_type);
    const chargeable = showsCharging(type);
    const cable = this._resolve(this._config.charge_cable_entity);
    const cableConnected = chargeable && cable.configured && isCableConnected(cable.stateObj);
    const charging = this._resolve(this._config.charging_entity);
    const chargingNow = chargeable && charging.configured ? isCharging(charging.stateObj) : null;
    const lock = this._resolve(this._config.lock_entity);
    const locked = lock.configured ? lockStatus(lock.stateObj) : "";
    const alerts = [
      ...Object.values(doors).filter((door) => door.open).map((door) => `${door.short} door open`),
      ...Object.values(windows).filter((windowModel) => windowModel.open).map((windowModel) => `${windowModel.short} window down`),
      ...(boot.open ? ["Boot open"] : []),
      ...(headlights.open ? ["Headlights on"] : []),
    ];
    const summaryParts = [...alerts];
    if (locked === "locked") summaryParts.push("Locked");
    if (locked === "unlocked") summaryParts.push("Unlocked");
    if (cableConnected) {
      summaryParts.push(
        chargingNow === false ? "Charge cable connected, not charging" : chargingNow ? "Charging" : "Charge cable connected"
      );
    }
    const summary = summaryParts.length ? summaryParts.join(", ") : "Everything reported is closed";
    const plugLabel =
      chargingNow === false ? "Charge cable connected, not charging" : chargingNow ? "Charge cable connected, charging" : "Charge cable connected";
    const plugEntity = charging.stateObj ? charging.entityId : cable.entityId;
    const vehicle = getVehicle(this._config.car_model);
    const battery = this._resolve(this._config.battery_entity);
    const fuel = this._resolve(this._config.fuel_entity);
    const mileage = this._distance("mileage_entity", "mileage_unit");
    const range = this._distance("range_entity", "range_unit");
    const hasDistance = mileage.configured || range.configured;

    return html`
      <ha-card>
        <div class="card-header">
          <div class="header-title">
            <span>${title}</span>
          </div>
          ${lock.configured
            ? html`
                <button
                  class="lock-badge ${locked || "unknown"}"
                  type="button"
                  aria-label=${locked === "unlocked" ? "Unlocked" : locked === "locked" ? "Locked" : "Lock unknown"}
                  @click=${() => this._openMoreInfo(lock.entityId)}
                >
                  ${padlockIcon(locked === "unlocked")}
                </button>
              `
            : nothing}
        </div>
        <figure class="plan ${this._config.white_background ? "on-white" : ""}">
          <div class="plan-canvas ${vehicle.id}${cableConnected ? " has-plug" : ""}">
            ${vehicle.render({
              doors,
              windows,
              boot,
              headlights,
              summary,
              onSelect: (entityId) => this._openMoreInfo(entityId),
            })}
            ${cableConnected
              ? html`
                  <button
                    class="charge-plug ${chargingNow === false ? "not-charging" : "charging"}"
                    type="button"
                    aria-label=${plugLabel}
                    @click=${() => this._openMoreInfo(plugEntity)}
                  >
                    ${type2Icon()}
                  </button>
                `
              : nothing}
          </div>
          <figcaption class=${alerts.length ? "plan-alert" : "plan-key"}>
            ${alerts.length ? alerts.join(", ") : "Front is at the top. Open windows turn red."}
          </figcaption>
        </figure>
        ${showsFuel(type) ? this._renderLevel("Fuel", fuel, "mdi:gas-station", "Fuel tank level") : nothing}
        ${showsBattery(type) ? this._renderLevel("Battery", battery, batteryIcon, "Battery state of charge") : nothing}
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
    description:
      "Top-down vehicle plan for ICE, EV, and hybrid vehicles, including a VW ID.3, Tesla Model 3, and BMW 3 Series.",
    documentationURL: "https://github.com/davies1995/HA-Car-Card",
  });
}
