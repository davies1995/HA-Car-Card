# Car Info Card

A Home Assistant Lovelace card that shows a top-down plan of a vehicle. VW ID.3, Tesla Model 3, and BMW 3 Series use those line drawings, with doors, windows, the boot, and headlights highlighted in place. Windows turn red when they are down, and the boot is highlighted when it is open. The card also shows battery state of charge, mileage, and range, and can convert mileage and range between miles and kilometres.

Choose the plan in the card settings. The Model 3 charge port is on the left rear. The 3 Series charge port is on the front left.

## Features

- Configurable top-down plan, with the front at the top
- Doors, windows, the boot, and headlights highlighted on the line drawing
- Side windows highlighted red when down, whether the door is open or shut
- Boot highlighted when open
- Line colour and background colour for the car plan
- Headlights turn pale yellow when their entity is on
- Type 2 connector beside the charge port when the cable is connected: green while charging, red when it is not
- Padlock at the top centre: red and open when unlocked, green and closed when locked
- British number plate in the top right, using the car registration from the card settings
- Vehicle type: ICE shows fuel tank level, EV shows battery and charging, Hybrid shows both
- Battery or fuel percentage with a level bar
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

Add **Car Info Card** from the card picker. Choose ICE, EV, or Hybrid under Vehicle type. ICE shows the fuel tank and hides charging. EV shows the battery and charging. Hybrid shows both. Line colour and background colour are under Vehicle. The other sections are Doors, Windows, Boot, Headlights, Lock, and Mileage and range.

```yaml
type: custom:car-info-card
title: My Vehicle
car_registration: AB12 CDE
car_model: vw-id3
vehicle_type: ev
line_color: [20, 40, 80]
background_color: [255, 255, 255]
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

A door, window, or the boot counts as open when the entity is `on`, `open`, `down`, or any number above 0. `off`, `closed`, `up`, and `0` stay closed. Windows are highlighted red whether the door is open or shut.

The charge connector is shown for an EV or hybrid while the cable entity is connected. It is green when the charging sensor reports `charging`, and red when that sensor reports `not charging`. An ICE vehicle hides charging and shows fuel level instead of battery state of charge. The padlock is red and open when the car is unlocked, and green and closed when it is locked. Matching ignores case, so `Locked` and `UNLOCKED` both work. A binary sensor that is `on` counts as locked. A lock entity, or a binary sensor with the lock device class, follows Home Assistant: `on` is unlocked and `off` is locked.

`mileage_unit` and `range_unit` are the units those entities report. `display_unit` is what the card shows. If they differ, the card converts the value. One mile is treated as 1.609344 kilometres.

## Options

| Option | Description |
| --- | --- |
| `title` | Card title. Defaults to `My Vehicle`. |
| `car_registration` | Registration shown on a British number plate in the top right. |
| `vehicle_type` | `ice`, `ev`, or `hybrid`. Defaults to `ev`. |
| `car_model` | Plan to draw. `vw-id3`, `tesla-model-3`, or `bmw-3-series`. Defaults to `vw-id3`. |
| `front_left_door_entity` | Front left door. Also `front_right`, `rear_left`, and `rear_right`. |
| `front_left_window_entity` | Front left window. Also the other three side windows. |
| `boot_entity` | Boot or tailgate. |
| `headlights_entity` | Turns both headlights pale yellow when on. |
| `line_color` | Colour of the car outline, as `[red, green, blue]` from 0 to 255, or a `#rrggbb` colour. Empty keeps the original black lines. |
| `background_color` | Fill behind the car, in the same form as `line_color`. Empty, `transparent`, or `none` leaves the card background showing. |
| `background_transparent` | No fill behind the car, even when a background colour or the older white background is set. |
| `white_background` | Older switch for a white plan fill. Still used when no background colour is set and the background is not transparent. |
| `charge_cable_entity` | EV and hybrid only. Shows a Type 2 connector beside the charge port when connected, on, or plugged in. |
| `charging_entity` | EV and hybrid only. Sensor reporting `charging` or `not charging`. The connector is green while charging and red when it is not. |
| `fuel_entity` | ICE and hybrid only. Fuel tank level as a percentage. |
| `lock_entity` | Lock, binary sensor, or sensor. `locked` and `unlocked` match in any case. Red open padlock when unlocked, green closed padlock when locked. |
| `battery_entity` | EV and hybrid only. Battery state of charge, usually a percentage. |
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

The bundle is written to `dist/car-info-card.js`. To add another vehicle, add a renderer next to `src/vehicles/vw-id3.js` and register it in `src/vehicles/index.js` and `VEHICLE_OPTIONS`.

## Releasing

Publish a GitHub release. The **Release Custom Card** workflow builds the card and attaches `dist/car-info-card.js`.
