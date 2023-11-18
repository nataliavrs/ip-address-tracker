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
}

export default new ResultView();
