import { getResult } from "./model.js";
import resultView from "./views/resultView.js";
import searchView from "./views/searchView.js";
import mapView from "./views/mapView.js";

const controlPageLoad = async function () {
  try {
    resultView.loadSpinner();
    const res = await getResult("");
    resultView.render(res);
    mapView.initMap({ lat: res.lat, lng: res.lng });
  } catch (err) {
    resultView.renderError(err.message);
  }
};

const controlSearchResults = async function (searchQuery) {
  try {
    resultView.loadSpinner();
    const res = await getResult(searchQuery);
    resultView.render(res);
    const { lat, lng } = res;
    mapView.updateMap(lat, lng);
  } catch (err) {
    resultView.renderError(err.message);
  }
};

export default function init() {
  controlPageLoad();
  searchView.addHandlerSearch(controlSearchResults);
}
