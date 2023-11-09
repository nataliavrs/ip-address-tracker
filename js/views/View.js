export class View {
  _data;

  render() {
    const markup = this._generateMarkup();
    this._parentElement.insertAdjecentHTML("beforeend", markup);
  }
}
