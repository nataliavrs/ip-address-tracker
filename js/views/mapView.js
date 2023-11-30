import L from "leaflet";
import View from "./View.js";
import { ZOOM_LEVEL } from "../config.js";
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
        zoomControl: false,
        attributionControl: false,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: ZOOM_LEVEL,
      }).addTo(this._map);

      this.setMarker(lat, lng);
    } catch (error) {
      throw new Error(
        `There was an issue initializing the map: ${error.message}`
      );
    }
  }

  updateMap(lat, lng) {
    try {
      if (lat && lng) {
        this._map.setView([lat, lng], ZOOM_LEVEL);
        this.setMarker(lat, lng);
      }
    } catch (error) {
      throw new Error("There was an issue updating the map");
    }
  }

  setMarker(lat, lng) {
    const icon = L.icon({
      iconUrl: customPinImage,
      iconSize: [32, 40],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });

    L.marker([lat, lng], { icon }).addTo(this._map).bindPopup(this._pinText);
  }
}

export default new MapView();
