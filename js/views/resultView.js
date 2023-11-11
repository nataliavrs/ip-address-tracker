import View from "./View.js";

class ResultView extends View {
  _parentElement = document.querySelector(".result");

  _generateMarkup() {
    return `
         <div class="result-info">
          <span class="result-title">ip address</span
          ><span class="result-data">1929292</span>
        </div>
        <div class="result-info">
          <span class="result-title">location</span
          ><span class="result-data">brooklyn</span>
        </div>
        <div class="result-info">
          <span class="result-title">timezone</span
          ><span class="result-data">utc-05:00</span>
        </div>
        <div class="result-info">
          <span class="result-title">isp</span
          ><span class="result-data">spacex starlink</span>
        </div>
    `;
  }
}

export default new ResultView();
