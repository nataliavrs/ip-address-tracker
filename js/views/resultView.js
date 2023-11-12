import View from "./View.js";

class ResultView extends View {
  _parentElement = document.querySelector(".result");

  _generateMarkup() {
    return `
         <div class="result-info">
          <span class="result-title">ip address</span
          ><span class="result-data">${this._data?.ip}</span>
        </div>
        <div class="result-info">
          <span class="result-title">Location</span
          ><span class="result-data">${this._data?.location?.region}</span>
        </div>
        <div class="result-info">
          <span class="result-title">timezone</span
          ><span class="result-data">UTC ${this._data?.location?.timezone}</span>
        </div>
        <div class="result-info">
          <span class="result-title">ISP</span
          ><span class="result-data">${this._data?.isp}</span>
        </div>
    `;
  }
}

export default new ResultView();
