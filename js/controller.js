import { getResult, state } from "./model.js";
import resultView from "./views/resultView.js";
import searchView from "./views/searchView.js";

const initRender = function () {
  searchView.render();
  // resultView.render();
};

const controlResult = async function () {
  const data = await getResult();
  console.log(data);
  resultView.render(data);
};

controlResult();

const init = function () {
  // Render initial views
  initRender();
};
init();
