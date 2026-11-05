import { nothing, svg } from "lit";
import { TESLA_MODEL_3_PLAN } from "./tesla-model-3-plan.js";

const SIDES = {
  "front-left": {
    door: "48,368 66,366 66,472 48,474",
    window: "68,372 92,368 94,468 70,472",
  },
  "front-right": {
    door: "338,368 356,366 356,472 338,474",
    window: "312,372 336,368 334,468 310,472",
  },
  "rear-left": {
    door: "48,495 66,493 60,650 52,655",
    window: "70,500 96,496 98,645 72,652",
  },
  "rear-right": {
    door: "338,495 356,493 344,650 338,655",
    window: "308,500 334,496 332,645 306,652",
  },
};

const HEADLIGHTS = ["66,80 82,46 108,38 116,58 92,82 72,88", "338,80 322,46 296,38 288,58 312,82 332,88"];
const BOOT = "132,728 272,728 286,752 236,764 168,764 118,752";

function onKey(event, action) {
  if (event.key !== "Enter" && event.key !== " ") return;
  event.preventDefault();
  action();
}

function zone(model, kind, points, openWord, onSelect) {
  const interactive = model?.configured && Boolean(model.stateObj);
  const open = Boolean(model?.open);
  const status = !model?.configured ? "not configured" : !model.stateObj ? "not found" : open ? openWord : "closed";
  const label = `${model?.label || kind}, ${status}`;
  const select = () => {
    if (interactive) onSelect(model.entityId);
  };
  return svg`
    <polygon
      class="tesla-zone ${kind} ${open ? "is-open" : ""} ${interactive ? "interactive" : ""}"
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

export function renderTeslaModel3({ doors, windows, boot, headlights, summary, onSelect }) {
  return svg`
    <svg class="tesla" viewBox="2 0 401 800" role="img" aria-label="Top view of a Tesla Model 3, front at the top. ${summary}">
      ${zone(doors["front-left"], "door-zone", SIDES["front-left"].door, "open", onSelect)}
      ${zone(doors["front-right"], "door-zone", SIDES["front-right"].door, "open", onSelect)}
      ${zone(doors["rear-left"], "door-zone", SIDES["rear-left"].door, "open", onSelect)}
      ${zone(doors["rear-right"], "door-zone", SIDES["rear-right"].door, "open", onSelect)}
      ${zone(windows["front-left"], "window-zone", SIDES["front-left"].window, "down", onSelect)}
      ${zone(windows["front-right"], "window-zone", SIDES["front-right"].window, "down", onSelect)}
      ${zone(windows["rear-left"], "window-zone", SIDES["rear-left"].window, "down", onSelect)}
      ${zone(windows["rear-right"], "window-zone", SIDES["rear-right"].window, "down", onSelect)}
      ${zone(boot, "boot-zone", BOOT, "open", onSelect)}
      ${HEADLIGHTS.map((points) => zone(headlights, "light-zone", points, "on", onSelect))}
      <image class="plan-art" href=${TESLA_MODEL_3_PLAN} x="0" y="0" width="401" height="800"></image>
    </svg>
  `;
}
