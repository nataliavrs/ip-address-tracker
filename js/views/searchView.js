import View from "./View.js";
import { IPv4Regex, IPv6Regex } from "../helpers.js/";

class SearchView extends View {
  _parentElement = document.querySelector(".search");
  _isFormValid = false;

  _getQuery() {
    return this._parentElement.querySelector(".search-input").value;
  }

  _clearForm() {
    const form = this._parentElement.querySelector(`.search-form`);
    form.querySelectorAll("input").forEach((input) => (input.value = ""));
  }

  _validateForm(formEl) {
    const form = new FormData(formEl).entries();
    this._isFormValid = [...form]
      .map(([key, value]) => {
        if (this.VALIDATE_FORM_MAP[key].validation(value)) {
          this._clearFieldError(key);

          return true;
        } else {
          const errMsg = this.VALIDATE_FORM_MAP[key].message;
          this._showFieldError(key, errMsg);
        }
      })
      .every((valid) => valid);
  }

  _showFieldError(key, errMsg) {
    const field = this._parentElement.querySelector(`input[name="${key}"]`);
    const form = this._parentElement.querySelector(`.search-form`);
    if (!form.querySelector(`.error-${key}`)) {
      field.insertAdjacentHTML(
        "afterEnd",
        `<span class="error-${key}">${errMsg}</span>`
      );
    }
  }

  _clearFieldError(key) {
    const form = this._parentElement.querySelector(`.search-form`);
    const error = this._parentElement.querySelector(`.error-${key}`);
    console.log(error);
    if (error) {
      form.removeChild(error);
    } else {
      return;
    }
  }

  VALIDATE_FORM_MAP = {
    ip: {
      validation: (value) => IPv4Regex.test(value) || IPv6Regex.test(value),
      message: "Invalid IP address",
    },
    nubi: {
      validation: (value) => value !== "nubi" && value !== "",
      message: "Nubi",
    },
  };

  addHandlerSearch(handler) {
    this._parentElement.addEventListener("submit", (e) => {
      e.preventDefault();
      this._validateForm(e.target);
      if (this._isFormValid) {
        this._clearForm();
        handler(this._getQuery());
      }
    });
  }
}

export default new SearchView();
