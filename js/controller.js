import { getResult } from "./model.js";
import resultView from "./views/resultView.js";
import searchView from "./views/searchView.js";

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
    alert(err);
  }
};

const init = function () {
  controlPageLoad();
  searchView.addHandlerSearch(controlSearchResults);
};
init();
