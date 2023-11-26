import { getResult } from "./model.js";
import resultView from "./views/resultView.js";
import searchView from "./views/searchView.js";
import { ZOOM_LEVEL } from "./config.js";
import L from "leaflet";

let map;

const controlPageLoad = function () {
  resultView.loadSpinner();
  getResult("")
    .then((res) => {
      resultView.render(res);
      initMap(res);
    })
    .catch((err) => resultView.renderError(err.message));
};

const initMap = function (res) {
  try {
    map = L.map("map", {
      center: [res.lat, res.lng],
      zoom: ZOOM_LEVEL,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: ZOOM_LEVEL,
    }).addTo(map);
  } catch (error) {
    throw new Error(
      `There was an issue initializing the map: ${error.message}`
    );
  }
};

const updateMap = function (coords) {
  try {
    if (coords?.lat && coords?.lng) {
      const { lat, lng } = coords;
      map.setView([lat, lng], map.getZoom());
    }
  } catch (error) {
    throw new Error("There was an issue updating the map");
  }
};

const controlSearchResults = async function (searchQuery) {
  try {
    resultView.loadSpinner();
    const res = await getResult(searchQuery);
    resultView.render(res);
    updateMap({ lat: res.lat, lng: res.lng });
  } catch (err) {
    resultView.renderError(err.message);
  }
};

const init = function () {
  controlPageLoad();
  searchView.addHandlerSearch(controlSearchResults);
};

export default {
  init,
  initMap,
};
