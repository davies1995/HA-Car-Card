# Car Info Card

A Home Assistant Lovelace card that shows a top-down plan of a vehicle. On the hatchback plan the doors swing open. On the VW ID.3 plan the doors, windows, boot, and headlights are highlighted in place. Windows turn red when they are down, and the boot is highlighted when it is open. The card also shows battery state of charge, mileage, and range, and can convert mileage and range between miles and kilometres.

Choose the plan in the card settings. Hatchback is the drawn plan. VW ID.3 uses the ID.3 line drawing, with doors, windows, the boot, and headlights highlighted in place.

## Features

- Configurable top-down plan, with the front at the top
- Doors drawn open when their entity is on or open
- Side windows highlighted red when down, whether the door is open or shut
- Boot highlighted when open
- Optional white background behind the plan, so black lines stay visible
- Headlights turn pale yellow when their entity is on
- Type 2 connector beside the charge port when the cable is connected: green while charging, red when it is not
- Padlock at the top centre: green and open when unlocked, red when locked
- Battery percentage with an icon that changes with the level
- Mileage and range, each with its own source unit, converted into the display unit you choose

## Installation

### HACS

1. Open HACS, then Frontend (also shown as Dashboard).
2. Open the menu and choose **Custom repositories**.
3. Add `https://github.com/davies1995/HA-Car-Card` and select category **Lovelace** (Dashboard).
4. Install **Car Info Card**.
5. Reload the browser.

HACS downloads `car-info-card.js` from the latest GitHub release. Publishing a release runs the included workflow, which builds that file and attaches it.

### Manual

1. Copy `dist/car-info-card.js` to `config/www/community/HA-Car-Card/car-info-card.js`.
2. In **Settings → Dashboards → Resources → Add resource**, use `/local/community/HA-Car-Card/car-info-card.js` as a JavaScript module.
3. Reload the browser.

## Usage

Add **Car Info Card** from the card picker. The editor is grouped into Vehicle, Doors, Windows, Boot, Headlights, Charging, Lock, Battery, and Mileage and range.

```yaml
type: custom:car-info-card
title: My Vehicle
car_model: vw-id3
white_background: true
front_left_door_entity: binary_sensor.my_car_front_left_door
front_right_door_entity: binary_sensor.my_car_front_right_door
rear_left_door_entity: binary_sensor.my_car_rear_left_door
rear_right_door_entity: binary_sensor.my_car_rear_right_door
front_left_window_entity: binary_sensor.my_car_front_left_window
front_right_window_entity: binary_sensor.my_car_front_right_window
rear_left_window_entity: binary_sensor.my_car_rear_left_window
rear_right_window_entity: binary_sensor.my_car_rear_right_window
boot_entity: binary_sensor.my_car_boot
headlights_entity: binary_sensor.my_car_headlights
charge_cable_entity: binary_sensor.my_car_charge_cable
charging_entity: sensor.my_car_charging
lock_entity: sensor.my_car_lock
battery_entity: sensor.my_car_battery
mileage_entity: sensor.my_car_odometer
mileage_unit: mi
range_entity: sensor.my_car_range
range_unit: km
display_unit: mi
```

Left and right are the vehicle's own left and right. On a right-hand-drive car, the front left door is the passenger side.

A door, window, or the boot counts as open when the entity is `on`, `open`, `down`, or any number above 0. `off`, `closed`, `up`, and `0` stay closed. Windows are drawn red in both the open-door and shut-door positions.

The charge connector is shown only while the cable entity is connected. It is green when the charging sensor reports `charging`, and red when that sensor reports `not charging`. The padlock is green and open for `unlocked`, and red for `locked`.

`mileage_unit` and `range_unit` are the units those entities report. `display_unit` is what the card shows. If they differ, the card converts the value. One mile is treated as 1.609344 kilometres.

## Options

| Option | Description |
| --- | --- |
| `title` | Card title. Defaults to `My Vehicle`. |
| `car_model` | Plan to draw. `hatchback` or `vw-id3`. |
| `front_left_door_entity` | Front left door. Also `front_right`, `rear_left`, and `rear_right`. |
| `front_left_window_entity` | Front left window. Also the other three side windows. |
| `boot_entity` | Boot or tailgate. |
| `headlights_entity` | Turns both headlights pale yellow when on. |
| `white_background` | White fill behind the plan. Useful for the VW ID.3 line drawing. |
| `charge_cable_entity` | Shows a Type 2 connector beside the charge port when connected, on, or plugged in. |
| `charging_entity` | Sensor reporting `charging` or `not charging`. The connector is green while charging and red when it is not. |
| `lock_entity` | Sensor reporting `locked` or `unlocked`. Green open padlock when unlocked, red padlock when locked. |
| `battery_entity` | Battery state of charge, usually a percentage. |
| `mileage_entity` | Odometer. |
| `mileage_unit` | `mi` or `km`, the unit that entity reports. |
| `range_entity` | Remaining range. |
| `range_unit` | `mi` or `km`, the unit that entity reports. |
| `display_unit` | `mi` or `km`, the unit shown on the card. |

## Development

Requires Node.js 18 or newer.

```bash
npm install
npm run build
```

The bundle is written to `dist/car-info-card.js`. To add another vehicle, add a renderer next to `src/vehicles/hatchback.js` and register it in `src/vehicles/index.js` and `VEHICLE_OPTIONS`.

## Releasing

Publish a GitHub release. The **Release Custom Card** workflow builds the card and attaches `dist/car-info-card.js`.
