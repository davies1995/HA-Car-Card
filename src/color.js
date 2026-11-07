function clampByte(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return null;
  return Math.min(255, Math.max(0, Math.round(number)));
}

function hex([red, green, blue]) {
  return `#${[red, green, blue].map((channel) => channel.toString(16).padStart(2, "0")).join("")}`;
}

export function cssColor(value) {
  if (value == null || value === "") return "";
  if (Array.isArray(value)) {
    if (value.length < 3) return "";
    const channels = value.slice(0, 3).map(clampByte);
    if (channels.some((channel) => channel == null)) return "";
    return hex(channels);
  }

  const text = String(value).trim();
  const short = text.match(/^#([0-9a-f]{3})$/i);
  if (short) {
    return hex(short[1].split("").map((channel) => Number.parseInt(channel + channel, 16)));
  }
  const long = text.match(/^#([0-9a-f]{6})(?:[0-9a-f]{2})?$/i);
  if (long) return `#${long[1].toLowerCase()}`;
  const rgb = text.match(/^rgba?\(\s*([0-9.]+)\s*,\s*([0-9.]+)\s*,\s*([0-9.]+)/i);
  if (!rgb) return "";
  const channels = rgb.slice(1, 4).map(clampByte);
  if (channels.some((channel) => channel == null)) return "";
  return hex(channels);
}

export function planBackground(config) {
  if (!config || config.background_transparent === true) return "";
  if (typeof config.background_color === "string" && ["transparent", "none"].includes(config.background_color.trim().toLowerCase())) {
    return "";
  }
  return cssColor(config.background_color) || (config.white_background ? "#ffffff" : "");
}
