import View from "./View.js";
import { IPv4Regex, IPv6Regex } from "../helpers.js/";

class SearchView extends View {
  _parentElement = document.querySelector(".search");
  _form = this._parentElement.querySelector(".search-form");
  _formEntries = [...new FormData(this._form).entries()];
  VALIDATE_INPUT_MAP = {
    ip: {
      isValid: (value) => IPv4Regex.test(value) || IPv6Regex.test(value),
      message: "Invalid IP address",
    },
  };

  get _query() {
    return this._parentElement.querySelector(".search-input").value;
  }

  _isFormValid() {
    return [...new FormData(this._form).entries()]
      .map(([key, value]) => this.VALIDATE_INPUT_MAP[key].isValid(value))
      .every((valid) => valid);
  }

  _showErrors() {
    this._formEntries.map(([key, _]) => this._addError(key));
  }

  _addError(key) {
    const inputField = this._parentElement.querySelector(
      `input[name="${key}"]`
    );
    if (!this._form.querySelector(`.error-${key}`)) {
      const errMsg = this.VALIDATE_INPUT_MAP[key].message;
      inputField.insertAdjacentHTML(
        "afterEnd",
        `<span class="error-${key}">${errMsg}</span>`
      );
    }
  }

  _removeErrors() {
    this._formEntries.forEach(([key, _]) => {
      const error = this._form.querySelector(`.error-${key}`);
      error && this._form.removeChild(error);
    });
  }

  _clearInputs() {
    [...this._form.querySelectorAll("input")].map(
      (input) => (input.value = "")
    );
  }

  _resetForm() {
    this._removeErrors();
    this._clearInputs();
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener("submit", (e) => {
      e.preventDefault();

      if (this._isFormValid()) {
        handler(this._query);
        this._resetForm();
      } else {
        this._showErrors();
      }
    });
  }
}

export default new SearchView();
