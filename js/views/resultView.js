import View from "./View.js";

class ResultView extends View {
  _parentElement = document.querySelector(".result");

  _generateMarkup() {
    return `
        <div class="info"><span>ip address</span><span></span></div>
        <div class="info"><span>location</span><span></span></div>
        <div class="info"><span>timezone</span><span></span></div>
        <div class="info"><span>isp</span><span></span></div>
    `;
  }
}

export default new ResultView();
