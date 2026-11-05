import { renderHatchback } from "./hatchback.js";
import { renderVwId3 } from "./vw-id3.js";

const VEHICLES = {
  hatchback: {
    id: "hatchback",
    label: "Hatchback",
    render: renderHatchback,
  },
  "vw-id3": {
    id: "vw-id3",
    label: "VW ID.3",
    render: renderVwId3,
  },
};

export function getVehicle(id) {
  return VEHICLES[id] || VEHICLES.hatchback;
}
