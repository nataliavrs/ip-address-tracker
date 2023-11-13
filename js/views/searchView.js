import View from "./View.js";

class SearchView extends View {
  _parentElement = document.querySelector(".search");

  _getQuery() {
    return this._parentElement.querySelector(".search-input").value;
  }

  _clearInput() {
    this._parentElement.querySelector(".search-input").value = "";
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener("submit", (e) => {
      e.preventDefault();
      handler(this._getQuery());
      this._clearInput();
    });
  }

  addHandlerSearchMock(handler) {
    document.querySelector(".mock").addEventListener("click", function () {
      handler("176.201.53.78");
    });
  }
}

export default new SearchView();
