class Section {
  constructor(itemCreator, containerSelector) {
    this._creator = itemCreator;
    this._containerElement = document.querySelector(containerSelector);
  }

  renderItems(items) {
    items.forEach(item => {
      this.addItem(item);
    });
  }

  addItem(item) {
    const card = this._creator(item);
    this._containerElement.prepend(card);
  }
}

export default Section;