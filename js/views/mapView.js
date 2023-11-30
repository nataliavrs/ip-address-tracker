import View from "./View.js";
import { ZOOM_LEVEL } from "../config.js";
const customPinImage =
  '<svg xmlns="http://www.w3.org/2000/svg" width="46" height="56"><path fill-rule="evenodd" d="M39.263 7.673c8.897 8.812 8.966 23.168.153 32.065l-.153.153L23 56 6.737 39.89C-2.16 31.079-2.23 16.723 6.584 7.826l.153-.152c9.007-8.922 23.52-8.922 32.526 0zM23 14.435c-5.211 0-9.436 4.185-9.436 9.347S17.79 33.128 23 33.128s9.436-4.184 9.436-9.346S28.21 14.435 23 14.435z"/></svg>';
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
      iconUrl: `data:image/svg+xml;utf8,${encodeURIComponent(customPinImage)}`,
      iconSize: [32, 40],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });

    L.marker([lat, lng], { icon }).addTo(this._map).bindPopup(this._pinText);
  }
}

export default new MapView();
