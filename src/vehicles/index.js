import { renderBmw3Series } from "./bmw-3-series.js";
import { BMW_3_SERIES_PLAN } from "./bmw-3-series-plan.js";
import { renderTeslaModel3 } from "./tesla-model-3.js";
import { TESLA_MODEL_3_PLAN } from "./tesla-model-3-plan.js";
import { renderVwId3 } from "./vw-id3.js";
import { VW_ID3_PLAN } from "./vw-id3-plan.js";

const VEHICLES = {
  "vw-id3": {
    id: "vw-id3",
    label: "VW ID.3",
    art: VW_ID3_PLAN,
    render: renderVwId3,
  },
  "tesla-model-3": {
    id: "tesla-model-3",
    label: "Tesla Model 3",
    art: TESLA_MODEL_3_PLAN,
    render: renderTeslaModel3,
  },
  "bmw-3-series": {
    id: "bmw-3-series",
    label: "BMW 3 Series",
    art: BMW_3_SERIES_PLAN,
    render: renderBmw3Series,
  },
};

export function getVehicle(id) {
  return VEHICLES[id] || VEHICLES["vw-id3"];
}
