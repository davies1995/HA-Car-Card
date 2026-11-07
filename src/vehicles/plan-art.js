import { svg } from "lit";

export function planArt({ href, width, height }) {
  return svg`
    <image class="plan-art" href=${href} x="0" y="0" width=${width} height=${height}></image>
  `;
}
