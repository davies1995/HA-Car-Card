import { nothing, svg } from "lit";

const DOORS = {
  "front-left": {
    hingeX: 142,
    hingeY: 168,
    angle: -64,
    panel: "108,168 142,168 140,252 106,250",
    window: "114,182 134,180 133,236 113,234",
    mirror: { cx: 98, cy: 186, rx: 13, ry: 8 },
  },
  "front-right": {
    hingeX: 178,
    hingeY: 168,
    angle: 64,
    panel: "178,168 212,168 214,250 180,252",
    window: "186,180 206,182 207,234 187,236",
    mirror: { cx: 222, cy: 186, rx: 13, ry: 8 },
  },
  "rear-left": {
    hingeX: 142,
    hingeY: 262,
    angle: -64,
    panel: "108,260 142,260 140,346 106,344",
    window: "114,274 134,272 133,328 113,326",
  },
  "rear-right": {
    hingeX: 178,
    hingeY: 262,
    angle: 64,
    panel: "178,260 212,260 214,344 180,346",
    window: "186,272 206,274 207,326 187,328",
  },
};

function onKey(event, action) {
  if (event.key !== "Enter" && event.key !== " ") return;
  event.preventDefault();
  action();
}

function shape(model, className, points, openWord, onSelect) {
  const interactive = model.configured && Boolean(model.stateObj);
  const status = !model.configured ? "not configured" : !model.stateObj ? "not found" : model.open ? openWord : "closed";
  const label = `${model.label}, ${status}`;
  const select = () => {
    if (interactive) onSelect(model.entityId);
  };
  return svg`
    <polygon
      class="${className} ${model.open ? "is-open" : ""} ${interactive ? "interactive" : ""}"
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

function doorGroup(id, doors, windows, onSelect) {
  const geometry = DOORS[id];
  const door = doors[id];
  const windowModel = windows[id];
  const rotation = door.open ? `rotate(${geometry.angle} ${geometry.hingeX} ${geometry.hingeY})` : "rotate(0 0 0)";
  return svg`
    <g class="door" transform=${rotation}>
      ${shape(door, "door-panel", geometry.panel, "open", onSelect)}
      ${shape(windowModel, "window", geometry.window, "down", onSelect)}
      ${geometry.mirror
        ? svg`<ellipse class="mirror" cx=${geometry.mirror.cx} cy=${geometry.mirror.cy} rx=${geometry.mirror.rx} ry=${geometry.mirror.ry}></ellipse>`
        : nothing}
    </g>
  `;
}

export function renderHatchback({ doors, windows, boot, headlights, summary, onSelect }) {
  const bootShift = boot.open ? "translate(0 22)" : "translate(0 0)";
  return svg`
    <svg viewBox="0 0 320 540" role="img" aria-label="Top view of the hatchback, front at the top. ${summary}">
      <g class="wheel"><rect x="78" y="146" width="30" height="68" rx="14"></rect><rect class="rim" x="85" y="162" width="16" height="36" rx="6"></rect></g>
      <g class="wheel"><rect x="212" y="146" width="30" height="68" rx="14"></rect><rect class="rim" x="219" y="162" width="16" height="36" rx="6"></rect></g>
      <g class="wheel"><rect x="80" y="328" width="30" height="68" rx="14"></rect><rect class="rim" x="87" y="344" width="16" height="36" rx="6"></rect></g>
      <g class="wheel"><rect x="210" y="328" width="30" height="68" rx="14"></rect><rect class="rim" x="217" y="344" width="16" height="36" rx="6"></rect></g>

      <path class="body" d="M132 46c16-16 40-16 56 0l18 28c22 16 34 44 32 74l-4 214c-2 42-16 78-38 96-14 12-58 12-72 0-22-18-36-54-38-96l-4-214c-2-30 10-58 32-74z"></path>
      <polygon class="aperture" points="112,174 138,174 136,248 110,246"></polygon>
      <polygon class="aperture" points="182,174 208,174 210,246 184,248"></polygon>
      <polygon class="aperture" points="112,264 138,264 136,342 110,340"></polygon>
      <polygon class="aperture" points="182,264 208,264 210,340 184,342"></polygon>
      <polygon class="aperture" points="140,404 180,404 174,446 146,446"></polygon>

      ${doorGroup("front-left", doors, windows, onSelect)}
      ${doorGroup("front-right", doors, windows, onSelect)}
      ${doorGroup("rear-left", doors, windows, onSelect)}
      ${doorGroup("rear-right", doors, windows, onSelect)}

      <path class="hood" d="M138 72h44l8 34h-60z"></path>
      <ellipse class="badge" cx="160" cy="88" rx="7" ry="7"></ellipse>
      ${shape(headlights, "headlight", "114,68 136,68 140,86 110,86", "on", onSelect)}
      ${shape(headlights, "headlight", "206,68 184,68 180,86 210,86", "on", onSelect)}
      <path class="glass" d="M126 118h68l8 42h-84z"></path>
      <path class="roof" d="M146 176h28v156h-28z"></path>

      <g class="boot-lid" transform=${bootShift}>
        ${shape(boot, "boot", "132,400 188,400 180,450 140,450", "open", onSelect)}
        <path class="taillight" d="M138 436h16l2 8h-16z"></path>
        <path class="taillight" d="M182 436h-16l-2 8h16z"></path>
      </g>
    </svg>
  `;
}
