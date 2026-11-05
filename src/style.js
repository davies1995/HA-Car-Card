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
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 16px;
    color: var(--primary-text-color);
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

  .plan svg {
    width: min(100%, 280px);
    height: auto;
    display: block;
  }

  .body {
    fill: #f7f8fa;
    stroke: #3e474f;
    stroke-width: 2;
    stroke-linejoin: round;
  }

  .hood {
    fill: #eef1f4;
    stroke: #9aa3ab;
    stroke-width: 1;
  }

  .badge {
    fill: #dfe5ea;
    stroke: #6d7780;
    stroke-width: 1;
  }

  .glass,
  .window {
    fill: #c5d8e8;
    stroke: #5f7280;
    stroke-width: 1.4;
    stroke-linejoin: round;
  }

  .window {
    transition: fill 0.2s ease;
  }

  .window.is-open {
    fill: var(--error-color, #e53935);
    stroke: #b71c1c;
  }

  .door-panel {
    fill: #f7f8fa;
    stroke: #3e474f;
    stroke-width: 1.6;
    stroke-linejoin: round;
  }

  .aperture {
    fill: #2c3136;
    stroke: none;
  }

  .boot {
    fill: #f7f8fa;
    stroke: #3e474f;
    stroke-width: 1.6;
    stroke-linejoin: round;
  }

  .boot.is-open {
    fill: var(--warning-color, #fb8c00);
    stroke: #e65100;
  }

  .window.interactive,
  .door-panel.interactive,
  .boot.interactive {
    cursor: pointer;
  }

  .window:focus-visible,
  .door-panel:focus-visible,
  .boot:focus-visible {
    outline: none;
    stroke: var(--primary-color);
    stroke-width: 2.5;
  }

  .roof {
    fill: #6d747c;
    stroke: #555c63;
    stroke-width: 1;
  }

  .wheel rect {
    fill: #2c3136;
  }

  .wheel .rim {
    fill: #a3acb4;
  }

  .mirror {
    fill: #eceff1;
    stroke: #3e474f;
    stroke-width: 1.5;
  }

  .headlight {
    fill: #e7eef3;
    stroke: #90a0aa;
    stroke-width: 1;
    stroke-linejoin: round;
  }

  .headlight.is-open {
    fill: #fff3b0;
    stroke: #e6c85a;
  }

  .headlight.interactive {
    cursor: pointer;
  }

  .taillight {
    fill: #ef9a9a;
    stroke: #c62828;
    stroke-width: 0.75;
  }

  .antenna {
    fill: #4e555c;
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
    .progress-fill,
    .window {
      transition: none;
    }
  }
`;
