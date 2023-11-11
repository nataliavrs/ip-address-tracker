import View from "./View.js";

class SearchView extends View {
  _parentElement = document.querySelector(".search");

  _generateMarkup() {
    return `
        <input type="text" class="search-input" />
        <button class="search-btn">></button>
    `;
  }
}

export default new SearchView();
