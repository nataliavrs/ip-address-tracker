import { state, getResult } from "./model.js";
import resultView from "./views/resultView.js";
import searchView from "./views/searchView.js";
import L from "leaflet";

const controlPageLoad = function () {
  resultView.loadSpinner();
  getResult("")
    .then((res) => resultView.render(res))
    .catch((err) => alert(err));
};

const controlSearchResults = async function (searchQuery) {
  try {
    resultView.loadSpinner();
    const res = await getResult(searchQuery);
    resultView.render(res);
  } catch (err) {
    resultView.renderError(err.message);
  }
};

const initMap = async function () {
  const { lat, lng } = state.searchedIp;
  const map = L.map("map", {
    center: [45.46427, 9.18951], // Initial map center
    zoom: 10, // Initial zoom level
    zoomControl: false, // Disable the zoom control
    scrollWheelZoom: false,
  });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
};

const init = function () {
  // controlPageLoad();
  searchView.addHandlerSearch(controlSearchResults);
};

export default {
  init,
  initMap,
};
