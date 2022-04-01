class Section {
  constructor(itemCreator, containerSelector) {
    this._creator = itemCreator;
    this._containerElement = document.querySelector(containerSelector);
  }

  renderItems(items, isOwn, ownUserId) {
    items.forEach(item => {
      this.addItem(item, isOwn, ownUserId);
    });
  }

  addItem(item, isOwn, ownUserId) {
    const card = this._creator(item, isOwn, ownUserId);
    this._containerElement.prepend(card);
  }
}

export default Section;