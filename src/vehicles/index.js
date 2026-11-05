import { renderBmw3Series } from "./bmw-3-series.js";
import { renderHatchback } from "./hatchback.js";
import { renderTeslaModel3 } from "./tesla-model-3.js";
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
  "tesla-model-3": {
    id: "tesla-model-3",
    label: "Tesla Model 3",
    render: renderTeslaModel3,
  },
  "bmw-3-series": {
    id: "bmw-3-series",
    label: "BMW 3 Series",
    render: renderBmw3Series,
  },
};

export function getVehicle(id) {
  return VEHICLES[id] || VEHICLES.hatchback;
}
