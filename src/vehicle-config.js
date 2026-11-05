export const DOOR_DEFS = [
  { key: "front_left_door_entity", id: "front-left", label: "Front left door", short: "Front left" },
  { key: "front_right_door_entity", id: "front-right", label: "Front right door", short: "Front right" },
  { key: "rear_left_door_entity", id: "rear-left", label: "Rear left door", short: "Rear left" },
  { key: "rear_right_door_entity", id: "rear-right", label: "Rear right door", short: "Rear right" },
];

export const WINDOW_DEFS = [
  { key: "front_left_window_entity", id: "front-left", label: "Front left window", short: "Front left" },
  { key: "front_right_window_entity", id: "front-right", label: "Front right window", short: "Front right" },
  { key: "rear_left_window_entity", id: "rear-left", label: "Rear left window", short: "Rear left" },
  { key: "rear_right_window_entity", id: "rear-right", label: "Rear right window", short: "Rear right" },
];

export const BOOT_DEF = { key: "boot_entity", id: "boot", label: "Boot", short: "Boot" };

export const HEADLIGHT_DEF = {
  key: "headlights_entity",
  id: "headlights",
  label: "Headlights",
  short: "Headlights",
};

export const CHARGE_CABLE_DEF = {
  key: "charge_cable_entity",
  id: "charge-cable",
  label: "Charge cable",
  short: "Charge cable",
};

export const CHARGING_DEF = {
  key: "charging_entity",
  id: "charging",
  label: "Charging",
  short: "Charging",
};

export const LOCK_DEF = {
  key: "lock_entity",
  id: "lock",
  label: "Lock",
  short: "Lock",
};

export const VEHICLE_OPTIONS = [
  { value: "hatchback", label: "Hatchback" },
  { value: "vw-id3", label: "VW ID.3" },
  { value: "tesla-model-3", label: "Tesla Model 3" },
];

export const UNIT_OPTIONS = [
  { value: "mi", label: "Miles" },
  { value: "km", label: "Kilometres" },
];

const OPEN_STATES = new Set([
  "on",
  "open",
  "opened",
  "down",
  "true",
  "yes",
  "opening",
  "closing",
  "ajar",
  "tilted",
  "vent",
  "partial",
]);

const CLOSED_STATES = new Set(["off", "closed", "up", "false", "no", "shut", "0"]);

function normalizedState(stateObj) {
  if (!stateObj) return "";
  return String(stateObj.state).trim().toLowerCase();
}

function isUnavailableState(state) {
  return ["unavailable", "unknown", "none", ""].includes(state);
}

export function isOpen(stateObj) {
  const state = normalizedState(stateObj);
  if (!state || isUnavailableState(state)) return false;
  if (OPEN_STATES.has(state)) return true;
  if (CLOSED_STATES.has(state)) return false;
  const numeric = Number(state);
  if (Number.isFinite(numeric)) return numeric > 0;
  return stateObj.attributes?.open === true;
}

const CABLE_CONNECTED = new Set(["connected", "plugged", "plugged_in", "plugged in", ...OPEN_STATES]);
const CABLE_DISCONNECTED = new Set(["disconnected", "unplugged", "not connected", "not_connected", ...CLOSED_STATES]);

export function isCableConnected(stateObj) {
  const state = normalizedState(stateObj);
  if (!state || isUnavailableState(state)) return false;
  if (CABLE_CONNECTED.has(state)) return true;
  if (CABLE_DISCONNECTED.has(state)) return false;
  const numeric = Number(state);
  if (Number.isFinite(numeric)) return numeric > 0;
  return false;
}

export function isCharging(stateObj) {
  const state = normalizedState(stateObj);
  if (!state || isUnavailableState(state)) return null;
  if (["charging", "charge", "on", "true", "yes"].includes(state)) return true;
  if (["not charging", "not_charging", "not-charging", "off", "false", "no"].includes(state)) return false;
  return null;
}

export function lockStatus(stateObj) {
  const state = normalizedState(stateObj);
  if (!state || isUnavailableState(state)) return "";
  if (["unlocked", "unlock"].includes(state)) return "unlocked";
  if (["locked", "lock"].includes(state)) return "locked";
  return "";
}

const KM_PER_MILE = 1.609344;

export function normalizeUnit(unit) {
  const value = String(unit ?? "").trim().toLowerCase();
  if (["mi", "mile", "miles"].includes(value)) return "mi";
  if (["km", "kilometer", "kilometre", "kilometers", "kilometres"].includes(value)) return "km";
  return "";
}

export function unitFromState(stateObj) {
  return normalizeUnit(stateObj?.attributes?.unit_of_measurement);
}

export function convertDistance(value, fromUnit, toUnit) {
  const from = normalizeUnit(fromUnit);
  const to = normalizeUnit(toUnit);
  if (!Number.isFinite(value) || !from || !to || from === to) return value;
  if (from === "mi" && to === "km") return value * KM_PER_MILE;
  return value / KM_PER_MILE;
}

export function formatDistance(value) {
  return new Intl.NumberFormat("en-GB", { maximumFractionDigits: 0 }).format(Math.round(value));
}

export function unitLabel(unit) {
  return normalizeUnit(unit) === "km" ? "km" : "mi";
}
