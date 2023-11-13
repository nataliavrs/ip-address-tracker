import { getResult } from "./model.js";
import resultView from "./views/resultView.js";
import searchView from "./views/searchView.js";

const initRender = function () {
  searchView.render();
  // resultView.render();
};

const controlResult = function () {
  getResult("8.8.8.8")
    // getResult("erorororr")
    .then((res) => {
      console.log(res);
      resultView.render(res);
    })
    .catch((err) => alert(err));
};

controlResult();

const init = function () {
  // Render initial views
  initRender();
};
init();
