import { renderHatchback } from "./hatchback.js";

const VEHICLES = {
  hatchback: {
    id: "hatchback",
    label: "Hatchback",
    render: renderHatchback,
  },
};

export function getVehicle(id) {
  return VEHICLES[id] || VEHICLES.hatchback;
}
