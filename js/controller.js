import { getResult } from "./model.js";
import resultView from "./views/resultView.js";
import searchView from "./views/searchView.js";

const render = function () {
  searchView.render();
  resultView.render();
};

const controlResult = function () {
  getResult();
};

controlResult();

const init = function () {
  // Render initial views
  render();
};
init();
