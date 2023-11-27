import View from "./View.js";
import { ZOOM_LEVEL } from "../config.js";
import L, { tileLayer } from "leaflet";
import customPinImage from "../../images/icon-location.svg";
class MapView extends View {
  _parentElement = document.querySelector("#map");
  _pinText = "IP address location";
  _map;

  async initMap({ lat, lng }) {
    try {
      this._map = L.map("map", {
        center: [lat, lng],
        zoom: ZOOM_LEVEL,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: ZOOM_LEVEL,
      }).addTo(this._map);

      const icon = L.icon({
        iconUrl: customPinImage,
        iconSize: [32, 40],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });

      L.marker([lat, lng], { icon }).addTo(this._map).bindPopup(this._pinText);
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
