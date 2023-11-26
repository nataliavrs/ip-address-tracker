import View from "./View.js";
import { ZOOM_LEVEL } from "../config.js";
import L from "leaflet";
class MapView extends View {
  _parentElement = document.querySelector("#map");
  _map;

  initMap(coords) {
    try {
      this._map = L.map("map", {
        center: [coords.lat, coords.lng],
        zoom: ZOOM_LEVEL,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: ZOOM_LEVEL,
      }).addTo(this._map);
    } catch (error) {
      throw new Error(
        `There was an issue initializing the map: ${error.message}`
      );
    }
  }

  updateMap(coords) {
    try {
      if (coords?.lat && coords?.lng) {
        const { lat, lng } = coords;
        this._map.setView([lat, lng], this._map.getZoom());
      }
    } catch (error) {
      throw new Error("There was an issue updating the map");
    }
  }
}

export default new MapView();
