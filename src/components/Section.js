class Section {
  constructor({items, itemCreator}, containerSelector) {
    this._items = items;
    this._creator = itemCreator;
    this._containerElement = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach(item => {
      this.addItem(item);
    });
  }

  addItem(item) {
    const card = this._creator(item);
    this._containerElement.prepend(card);
  }
}

export default Section;