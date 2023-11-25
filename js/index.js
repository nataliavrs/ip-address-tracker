import "leaflet/dist/leaflet.css";
import controller from "./controller.js";

controller.init();
window.addEventListener("load", () => {
  controller.initMap();
});
