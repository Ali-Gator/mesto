class Section {
  constructor(itemCreator, containerSelector) {
    this._creator = itemCreator;
    this._containerElement = document.querySelector(containerSelector);
  }

  renderItems(items) {
    items.forEach(item => {
      const card = this.createItem(item);
      this._containerElement.append(card);
    });
  }

  renderItem (item) {
    const card = this.createItem(item);
    this._containerElement.prepend(card);
  }

  createItem(item) {
    return this._creator(item);
  }
}

export default Section;