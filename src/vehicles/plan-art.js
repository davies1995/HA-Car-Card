import { nothing, svg } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import { lineColorFilter } from "../color.js";

export function planArt({ href, width, height, lineColor }) {
  return svg`
    <image
      class="plan-art"
      href=${href}
      x="0"
      y="0"
      width=${width}
      height=${height}
      style=${lineColor ? styleMap({ filter: lineColorFilter(lineColor) }) : nothing}
    ></image>
  `;
}
