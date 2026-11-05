import { html, nothing, svg } from "lit";

export const WINDOW_DEFS = [
  {
    key: "front_left_window_entity",
    id: "front-left",
    label: "Front left window",
  },
  {
    key: "front_right_window_entity",
    id: "front-right",
    label: "Front right window",
  },
  {
    key: "rear_left_window_entity",
    id: "rear-left",
    label: "Rear left window",
  },
  {
    key: "rear_right_window_entity",
    id: "rear-right",
    label: "Rear right window",
  },
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

export function isWindowOpen(stateObj) {
  if (!stateObj) return false;
  const state = String(stateObj.state).trim().toLowerCase();
  if (["unavailable", "unknown", "none", ""].includes(state)) return false;
  if (OPEN_STATES.has(state)) return true;
  if (CLOSED_STATES.has(state)) return false;
  const numeric = Number(state);
  if (Number.isFinite(numeric)) return numeric > 0;
  return stateObj.attributes?.window_open === true || stateObj.attributes?.open === true;
}

function windowStatus(model) {
  if (!model.configured) return "not configured";
  if (!model.stateObj) return "not found";
  const state = String(model.stateObj.state).trim().toLowerCase();
  if (state === "unavailable") return "unavailable";
  if (state === "unknown" || state === "none" || state === "") return "unknown";
  return model.open ? "down" : "closed";
}

function onKey(event, action) {
  if (event.key !== "Enter" && event.key !== " ") return;
  event.preventDefault();
  action();
}

function windowShape(model, points, onSelect) {
  const interactive = model.configured && Boolean(model.stateObj);
  const status = windowStatus(model);
  const label = `${model.label}, ${status}`;
  const select = () => {
    if (interactive) onSelect(model.entityId);
  };
  return svg`
    <polygon
      class="window ${model.open ? "open" : ""} ${interactive ? "interactive" : ""}"
      points=${points}
      role=${interactive ? "button" : "img"}
      tabindex=${interactive ? "0" : nothing}
      aria-label=${label}
      @click=${select}
      @keydown=${(event) => onKey(event, select)}
    >
      <title>${label}</title>
    </polygon>
  `;
}

export function renderCarPlan(windows, onSelect) {
  const byId = Object.fromEntries(windows.map((model) => [model.id, model]));
  const openLabels = windows.filter((model) => model.open).map((model) => model.label.replace(" window", ""));
  const joined = openLabels.length < 2
    ? openLabels[0] || ""
    : openLabels.length === 2
      ? `${openLabels[0]} and ${openLabels[1]}`
      : `${openLabels.slice(0, -1).join(", ")}, and ${openLabels[openLabels.length - 1]}`;
  const summary = openLabels.length
    ? `${joined} ${openLabels.length === 1 ? "is" : "are"} down`
    : "All configured windows are closed";

  return html`
    <figure class="plan">
      <svg viewBox="0 0 220 400" role="img" aria-label="Top view of the vehicle, front at the top. ${summary}">
        <g class="wheel">
          <rect x="6" y="112" width="30" height="64" rx="14"></rect>
          <rect class="rim" x="13" y="126" width="16" height="36" rx="6"></rect>
        </g>
        <g class="wheel">
          <rect x="184" y="112" width="30" height="64" rx="14"></rect>
          <rect class="rim" x="191" y="126" width="16" height="36" rx="6"></rect>
        </g>
        <g class="wheel">
          <rect x="8" y="248" width="30" height="64" rx="14"></rect>
          <rect class="rim" x="15" y="262" width="16" height="36" rx="6"></rect>
        </g>
        <g class="wheel">
          <rect x="182" y="248" width="30" height="64" rx="14"></rect>
          <rect class="rim" x="189" y="262" width="16" height="36" rx="6"></rect>
        </g>

        <path
          class="body"
          d="M78 30c18-14 46-14 64 0l16 26c24 16 36 42 34 74l-4 150c-2 40-14 74-34 94-16 14-76 14-92 0-20-20-32-54-34-94l-4-150c-2-32 10-58 34-74z"
        ></path>
        <path class="hood" d="M86 58h48l10 36H76z"></path>
        <ellipse class="badge" cx="110" cy="74" rx="7" ry="7"></ellipse>
        <path class="headlight" d="M62 58h16l6 16H58z"></path>
        <path class="headlight" d="M158 58h-16l-6 16h26z"></path>
        <path class="glass" d="M72 108h76l12 46H60z"></path>
        <path class="roof" d="M90 164h40v132H90z"></path>
        <path class="glass" d="M76 304h68l-8 34H84z"></path>
        <path class="taillight" d="M58 352h22l4 10H62z"></path>
        <path class="taillight" d="M162 352h-22l-4 10h22z"></path>
        <ellipse class="mirror" cx="18" cy="132" rx="14" ry="9"></ellipse>
        <ellipse class="mirror" cx="202" cy="132" rx="14" ry="9"></ellipse>
        <path class="antenna" d="M146 214h10v8h-10z"></path>

        ${windowShape(byId["front-left"], "50,158 86,154 86,214 48,210", onSelect)}
        ${windowShape(byId["front-right"], "170,158 134,154 134,214 172,210", onSelect)}
        ${windowShape(byId["rear-left"], "48,224 86,220 86,300 46,296", onSelect)}
        ${windowShape(byId["rear-right"], "172,224 134,220 134,300 174,296", onSelect)}
      </svg>
      ${openLabels.length
        ? html`<figcaption class="window-alert">${summary}</figcaption>`
        : html`<figcaption class="window-key">Front is at the top. Open windows turn red.</figcaption>`}
    </figure>
  `;
}
