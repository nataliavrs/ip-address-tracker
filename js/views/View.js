export default class View {
  _data;

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._parentElement.innerHTML = markup;
  }

  updateSimple(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    this._parentElement.innerHTML = newMarkup;
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newDOMArray = Array.from(newDOM.querySelectorAll("*"));
    const oldDOMArray = Array.from(this._parentElement.querySelectorAll("*"));
    newDOMArray.forEach((newNode, index) => {
      const oldNode = oldDOMArray[index];
      if (
        !newNode.isEqualNode(oldNode) &&
        newNode.firstChild?.nodeValue.trim() !== ""
      ) {
        oldNode.textContent = newNode.textContent;
      }
    });
  }
}
