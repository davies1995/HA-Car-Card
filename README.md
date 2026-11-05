# Car Info Card

A Home Assistant Lovelace card for vehicle telemetry. It shows battery or fuel level with a progress bar, remaining range, location, and whether the vehicle is charging.

The card is a single JavaScript module, registered as `car-info-card`, and can be installed with HACS or added as a dashboard resource.

## Features

- Battery or fuel percentage with a progress bar that changes color as the level drops
- Charging status with a charging icon and label
- Remaining range, using the sensor's own unit
- Location, with `home` and `not_home` shown as Home and Away
- Visual configuration in the dashboard editor through Home Assistant's form selectors
- Theme colors from Home Assistant variables such as `--primary-color` and `--secondary-background-color`

## Installation

### HACS

1. Open HACS, then Frontend (also shown as Dashboard).
2. Open the menu and choose **Custom repositories**.
3. Add `https://github.com/davies1995/HA-Car-Card` and select category **Lovelace** (Dashboard).
4. Install **Car Info Card** from the list.
5. Reload the browser.

HACS downloads `car-info-card.js` from the latest GitHub release. Publishing a release runs the included workflow, which builds that file and attaches it for you.

### Manual

1. Copy `dist/car-info-card.js` to `config/www/community/HA-Car-Card/car-info-card.js`.
2. In Home Assistant, go to **Settings → Dashboards → Resources → Add resource**.
3. URL: `/local/community/HA-Car-Card/car-info-card.js`
4. Resource type: **JavaScript module**.
5. Reload the browser.

## Usage

Add a card and search for **Car Info Card**, or paste this into the dashboard YAML:

```yaml
type: custom:car-info-card
title: My Vehicle
car_icon: mdi:car-electric
battery_entity: sensor.my_car_battery
range_entity: sensor.my_car_range
location_entity: device_tracker.my_car
charging_entity: binary_sensor.my_car_charging
```

Click a value to open the Home Assistant more-info dialog for that entity.

### Options

| Option | Description |
| --- | --- |
| `title` | Card title. Defaults to `My Vehicle`. |
| `car_icon` | Header icon. Defaults to `mdi:car`. |
| `battery_entity` | Battery or fuel level sensor. A bar is drawn when the state is a percentage from 0 to 100. |
| `battery_icon` | Optional icon. Leave unset to use an automatic battery or charging icon. |
| `range_entity` | Remaining range sensor. |
| `range_icon` | Optional icon. Defaults to `mdi:map-marker-distance`. |
| `location_entity` | `device_tracker`, `person`, or location sensor. |
| `location_icon` | Optional icon. Defaults to `mdi:crosshairs-gps`. |
| `charging_entity` | `binary_sensor` or `sensor`. `on`, `charging`, `plugged_in`, and `connected` count as charging. |
| `charging_icon` | Optional icon used while charging. Defaults to `mdi:ev-station`. |

Charging is also detected when the charging entity has `attributes.charging: true`.

## Development

Requires Node.js 18 or newer.

```bash
npm install
npm run build
```

The bundle is written to `dist/car-info-card.js`. Use `npm run watch` while editing.

## Releasing

1. Open **Releases → Draft a new release** on GitHub.
2. Create a tag such as `v1.0.0` and publish the release.
3. The **Release Custom Card** workflow builds the card and attaches `dist/car-info-card.js` to that release.

HACS uses the attached `car-info-card.js` file named in `hacs.json`.
