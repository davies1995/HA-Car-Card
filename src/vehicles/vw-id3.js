import { nothing, svg } from "lit";
import { VW_ID3_PLAN } from "./vw-id3-plan.js";

const SIDES = {
  "front-left": {
    door: "52,388 70,390 70,502 52,500",
    window: "74,394 102,390 104,494 74,496",
  },
  "front-right": {
    door: "382,388 398,390 398,502 382,500",
    window: "348,394 376,392 376,494 348,496",
  },
  "rear-left": {
    door: "52,522 70,524 68,655 52,650",
    window: "78,532 104,530 102,648 94,698 84,738 72,708 74,600",
  },
  "rear-right": {
    door: "382,522 398,524 398,655 382,650",
    window: "346,532 376,530 372,648 356,698 340,738 352,708 348,600",
  },
};

const HEADLIGHTS = ["64,58 125,44 140,82 96,105 58,96", "360,58 299,44 284,82 328,105 366,96"];
const BOOT = "108,800 316,800 328,845 290,862 134,862 96,845";

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
      class="id3-zone ${kind} ${open ? "is-open" : ""} ${interactive ? "interactive" : ""}"
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

export function renderVwId3({ doors, windows, boot, headlights, summary, onSelect }) {
  return svg`
    <svg class="id3" viewBox="0 0 424 912" role="img" aria-label="Top view of a VW ID.3, front at the top. ${summary}">
      ${zone(doors["front-left"], "door-zone", SIDES["front-left"].door, "open", onSelect)}
      ${zone(doors["front-right"], "door-zone", SIDES["front-right"].door, "open", onSelect)}
      ${zone(doors["rear-left"], "door-zone", SIDES["rear-left"].door, "open", onSelect)}
      ${zone(doors["rear-right"], "door-zone", SIDES["rear-right"].door, "open", onSelect)}
      ${zone(windows["front-left"], "window-zone", SIDES["front-left"].window, "down", onSelect)}
      ${zone(windows["front-right"], "window-zone", SIDES["front-right"].window, "down", onSelect)}
      ${zone(windows["rear-left"], "window-zone", SIDES["rear-left"].window, "down", onSelect)}
      ${zone(windows["rear-right"], "window-zone", SIDES["rear-right"].window, "down", onSelect)}
      ${HEADLIGHTS.map((points) => zone(headlights, "light-zone", points, "on", onSelect))}
      <image class="plan-art" href=${VW_ID3_PLAN} x="0" y="0" width="424" height="912"></image>
      ${zone(boot, "boot-zone", BOOT, "open", onSelect)}
    </svg>
  `;
}
