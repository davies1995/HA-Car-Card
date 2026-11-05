import { nothing, svg } from "lit";
import { BMW_3_SERIES_PLAN } from "./bmw-3-series-plan.js";

const SIDES = {
  "front-left": {
    door: "40,348 56,346 56,500 40,502",
    window: "58,355 78,352 80,495 58,498",
  },
  "front-right": {
    door: "295,348 311,346 311,500 295,502",
    window: "273,355 293,352 293,495 271,498",
  },
  "rear-left": {
    door: "40,512 56,510 54,575 40,578",
    window: "58,516 78,512 76,572 58,576",
  },
  "rear-right": {
    door: "295,512 311,510 311,575 297,578",
    window: "273,516 293,512 293,572 275,576",
  },
};

const HEADLIGHTS = ["60,55 84,32 110,30 112,55 88,64 62,62", "291,55 267,32 241,30 239,55 263,64 289,62"];
const BOOT = "100,696 252,696 266,736 214,748 138,748 86,736";

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
      class="bmw-zone ${kind} ${open ? "is-open" : ""} ${interactive ? "interactive" : ""}"
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

export function renderBmw3Series({ doors, windows, boot, headlights, summary, onSelect }) {
  return svg`
    <svg class="bmw" viewBox="0 0 352 800" role="img" aria-label="Top view of a BMW 3 Series, front at the top. ${summary}">
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
      <image class="plan-art" href=${BMW_3_SERIES_PLAN} x="0" y="0" width="352" height="800"></image>
    </svg>
  `;
}
