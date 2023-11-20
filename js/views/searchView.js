import View from "./View.js";

class SearchView extends View {
  _parentElement = document.querySelector(".search");

  _getQuery() {
    return this._parentElement.querySelector(".search-input").value;
  }

  _clearInput() {
    this._parentElement.querySelector(".search-input").value = "";
  }

  _validationError(errType) {
    switch (errType) {
      case 1:
        alert(`You didn't insert any value`);
        break;
      case 2:
        alert(`Insert a valid IP address. No letters.`);
        break;
      default:
        alert(`Insert a valid IP address. No letters.`);
        break;
    }
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener("submit", (e) => {
      e.preventDefault();
      const searchQuery = this._getQuery();

      const onlyNumbersRegex = /^[0-9]+$/;

      if (searchQuery === "") {
        const validationError = 1;
        this._validationError(validationError);
      } else if (!onlyNumbersRegex.test(searchQuery)) {
        const validationError = 2;
        this._validationError(validationError);
      } else {
        handler(this._getQuery());
      }
      this._clearInput();
    });
  }
}

export default new SearchView();
