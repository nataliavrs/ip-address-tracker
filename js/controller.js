import { getResult } from "./model.js";
import resultView from "./views/resultView.js";
import searchView from "./views/searchView.js";

const controlsSearchResults = function (searchQuery) {
  getResult(searchQuery)
    .then((res) => {
      resultView.render(res);
    })
    .catch((err) => alert(err));
};

const init = function () {
  searchView.addHandlerSearch(controlsSearchResults);
  searchView.addHandlerSearchMock(controlsSearchResults);
};
init();
