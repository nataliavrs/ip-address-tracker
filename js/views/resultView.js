import View from "./View.js";

class ResultView extends View {
  _parentElement = document.querySelector(".result");

  _generateMarkup() {
    return `
        <div class="result-info">
          <span class="result-title">IP ADDRESS</span
          ><span class="result-data">${this._data?.ip || "---"}</span>
        </div>
        <div class="result-info">
          <span class="result-title">LOCATION</span>                           
          <span class="result-data">${this._data?.fullLocation || "---"}</span>
        </div>
        <div class="result-info">
          <span class="result-title">TIMEZONE</span
          ><span class="result-data">UTC ${this._data?.timezone || "---"}</span>
        </div>
        <div class="result-info">
          <span class="result-title">ISP</span
          ><span class="result-data">${this._data?.isp || "---"}</span>
        </div>
    `;
  }

  _generateErrorMarkup() {
    return `
      <div class="error">
        <span class="error-message">
          Oops! It seems there's an issue searching for the IP: ${this._data}
        </span>
      </div>`;
  }
}

export default new ResultView();
