class Section {
  constructor(itemCreator, containerSelector) {
    this._creator = itemCreator;
    this._containerElement = document.querySelector(containerSelector);
  }

  renderItems(items, ownUserId) {
    items.forEach(item => {
      this.addItem(item, ownUserId);
    });
  }

  addItem(item, ownUserId) {
    const card = this._creator(item, ownUserId);
    this._containerElement.prepend(card);
  }
}

export default Section;