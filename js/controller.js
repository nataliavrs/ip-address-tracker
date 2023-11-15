import { getResult } from "./model.js";
import resultView from "./views/resultView.js";
import searchView from "./views/searchView.js";

const controlPageLoad = function () {
  getResult("")
    .then((res) => resultView.render(res))
    .catch((err) => alert(err));
};

const controlSearchResults = async function (searchQuery) {
  try {
    const res = await getResult(searchQuery);
    resultView.update(res);
  } catch (err) {
    alert(err);
  }
};

const init = function () {
  controlPageLoad();
  searchView.addHandlerSearch(controlSearchResults);
};
init();
