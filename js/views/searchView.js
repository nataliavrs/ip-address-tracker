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
        alert(`Insert a valid IP address.`);
        break;
      // default:
      //   alert(`Insert a valid IP address. No letters.`);
      //   break;
    }
  }

  _validateForm(formEl) {
    const form = new FormData(formEl);
    console.log(form);
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener("submit", (e) => {
      e.preventDefault();
      const searchQuery = this._getQuery();

      this._validateForm(e.target);

      const IPv4 =
        /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]?[0-9])){3}$/;
      const IPv6 =
        /^([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}$|^([0-9a-fA-F]{1,4}:){1,7}:$|^([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}$|^([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}$|^([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}$|^([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}$|^([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}$|^[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})$/;

      if (searchQuery === "") {
        const validationError = 1;
        this._validationError(validationError);
      } else if (!IPv4.test(searchQuery) && !IPv6.test(searchQuery)) {
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
