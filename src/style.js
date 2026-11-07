import { css } from "lit";

export const styles = css`
  :host {
    display: block;
  }

  ha-card {
    padding: 16px;
    position: relative;
    overflow: hidden;
    height: 100%;
    box-sizing: border-box;
  }

  .card-header {
    position: relative;
    display: flex;
    align-items: center;
    min-height: 40px;
    gap: 12px;
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 16px;
    color: var(--primary-text-color);
  }

  .card-header:has(.lock-badge) .header-title,
  .card-header:has(.plate) .header-title {
    max-width: calc(50% - 28px);
  }

  .lock-badge {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    padding: 0;
    border: none;
    border-radius: 999px;
    background: transparent;
    cursor: pointer;
  }

  .lock-badge.unlocked,
  .lock-badge.unlocked .glyph,
  .lock-badge.unlocked .glyph path {
    color: #e53935;
    fill: #e53935;
  }

  .lock-badge.locked,
  .lock-badge.locked .glyph,
  .lock-badge.locked .glyph path {
    color: #43a047;
    fill: #43a047;
  }

  .lock-badge.unknown {
    color: var(--secondary-text-color);
  }

  .lock-badge:focus-visible,
  .charge-plug:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }

  .glyph {
    width: 28px;
    height: 28px;
    display: block;
    fill: currentColor;
  }

  .header-title {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
  }

  .header-title span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .plate {
    margin-left: auto;
    display: inline-flex;
    align-items: stretch;
    height: 32px;
    max-width: 46%;
    border: 2px solid #111;
    border-radius: 5px;
    overflow: hidden;
    background: #f5c400;
    flex: 0 0 auto;
  }

  .plate-band {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    width: 16px;
    background: #003399;
    color: #fff;
    font-size: 8px;
    font-weight: 700;
    line-height: 1;
    padding-bottom: 3px;
  }

  .plate-text {
    min-width: 0;
    padding: 0 8px;
    color: #111;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 700;
    font-size: 16px;
    letter-spacing: 0.08em;
    line-height: 28px;
    text-transform: uppercase;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .header-title ha-icon {
    color: var(--primary-color);
    --mdc-icon-size: 24px;
  }

  .charge-indicator {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    flex: 0 0 auto;
    font-size: 0.85rem;
    font-weight: 500;
  }

  .charge-indicator.charging {
    color: var(--success-color, var(--green-color, #4caf50));
  }

  .charge-indicator.not-charging {
    color: var(--disabled-text-color, var(--secondary-text-color));
  }

  .grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
    gap: 12px;
  }

  .info-box {
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));
    border-radius: 8px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
    color: inherit;
    font: inherit;
    text-align: left;
  }

  button.info-box {
    appearance: none;
    border: none;
    margin: 0;
    width: 100%;
    cursor: pointer;
  }

  button.info-box:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }

  .info-box ha-icon {
    color: var(--primary-color);
    margin-bottom: 4px;
    --mdc-icon-size: 22px;
  }

  .info-box ha-icon.low {
    color: var(--error-color, var(--state-sensor-battery-low-color, #f44336));
  }

  .info-box ha-icon.medium {
    color: var(--warning-color, var(--state-sensor-battery-medium-color, #ff9800));
  }

  .info-box ha-icon.charging {
    color: var(--success-color, var(--green-color, #4caf50));
  }

  .label {
    font-size: 0.8rem;
    color: var(--secondary-text-color);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .value-container {
    display: flex;
    align-items: baseline;
    gap: 4px;
    min-width: 0;
  }

  .value {
    font-size: 1.2rem;
    font-weight: bold;
    color: var(--primary-text-color);
    overflow-wrap: anywhere;
  }

  .value.location {
    font-size: 1rem;
  }

  .unit {
    font-size: 0.85rem;
    color: var(--secondary-text-color);
  }

  .progress-bar {
    width: 100%;
    height: 6px;
    background-color: var(--divider-color, #e0e0e0);
    border-radius: 3px;
    margin-top: 6px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background-color: var(--primary-color);
    border-radius: 3px;
    transition: width 0.3s ease-in-out;
  }

  .progress-fill.low {
    background-color: var(--error-color, var(--state-sensor-battery-low-color, #f44336));
  }

  .progress-fill.medium {
    background-color: var(--warning-color, var(--state-sensor-battery-medium-color, #ff9800));
  }

  .progress-fill.high {
    background-color: var(--primary-color);
  }

  .progress-fill.charging {
    background-color: var(--success-color, var(--state-sensor-battery-high-color, #4caf50));
  }

  .plan {
    margin: 0 0 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .plan.has-bg .plan-canvas {
    background: var(--car-bg);
    border-radius: 16px;
  }

  .plan-canvas {
    position: relative;
    display: flex;
    justify-content: center;
    width: fit-content;
    max-width: 100%;
    margin-inline: auto;
  }

  .plan-canvas.has-plug {
    padding-inline: 34px;
  }

  .charge-plug {
    position: absolute;
    right: 2px;
    z-index: 1;
    display: inline-flex;
    padding: 0;
    border: none;
    border-radius: 999px;
    background: transparent;
    transform: translateY(-50%);
    cursor: pointer;
  }

  .plan-canvas.vw-id3 .charge-plug {
    top: 68%;
  }

  .plan-canvas.tesla-model-3 .charge-plug {
    right: auto;
    left: 2px;
    top: 91%;
  }

  .plan-canvas.bmw-3-series .charge-plug {
    right: auto;
    left: 2px;
    top: 28%;
  }

  .charge-plug.charging {
    color: var(--success-color, #43a047);
  }

  .charge-plug.not-charging {
    color: var(--error-color, #e53935);
  }

  .plan-canvas > svg {
    width: 250px;
    max-width: 100%;
    height: auto;
    display: block;
  }

  .charge-plug .glyph,
  .lock-badge .glyph {
    width: 28px;
    height: 28px;
  }

  .plan-art {
    pointer-events: none;
  }

  .id3-zone,
  .tesla-zone,
  .bmw-zone {
    fill: transparent;
    stroke: none;
  }

  .id3-zone.door-zone.is-open,
  .id3-zone.window-zone.is-open,
  .tesla-zone.door-zone.is-open,
  .tesla-zone.window-zone.is-open,
  .bmw-zone.door-zone.is-open,
  .bmw-zone.window-zone.is-open {
    fill: var(--error-color, #e53935);
    fill-opacity: 0.62;
  }

  .id3-zone.boot-zone.is-open,
  .tesla-zone.boot-zone.is-open,
  .bmw-zone.boot-zone.is-open {
    fill: var(--warning-color, #fb8c00);
    fill-opacity: 0.5;
  }

  .id3-zone.light-zone.is-open,
  .tesla-zone.light-zone.is-open,
  .bmw-zone.light-zone.is-open {
    fill: #fff3b0;
    fill-opacity: 0.92;
  }

  .id3-zone.interactive,
  .tesla-zone.interactive,
  .bmw-zone.interactive {
    cursor: pointer;
  }

  .plan-alert,
  .plan-key {
    margin: 0;
    font-size: 0.85rem;
    text-align: center;
    color: var(--secondary-text-color);
  }

  .plan-alert {
    color: var(--error-color, #e53935);
    font-weight: 600;
  }

  .battery {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    margin-bottom: 12px;
    padding: 12px;
    border: none;
    border-radius: 8px;
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));
    color: inherit;
    font: inherit;
    text-align: left;
  }

  button.battery {
    cursor: pointer;
  }

  .battery ha-icon {
    --mdc-icon-size: 32px;
    color: var(--primary-color);
  }

  .battery ha-icon.low {
    color: var(--error-color, #f44336);
  }

  .battery ha-icon.medium {
    color: var(--warning-color, #ff9800);
  }

  .battery-copy {
    flex: 1;
    min-width: 0;
  }

  .empty {
    color: var(--secondary-text-color);
    font-size: 0.95rem;
    line-height: 1.4;
  }

  @media (prefers-reduced-motion: reduce) {
    .progress-fill {
      transition: none;
    }
  }
`;
