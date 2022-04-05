class Section {
  constructor(itemCreator, containerSelector) {
    this._creator = itemCreator;
    this._containerElement = document.querySelector(containerSelector);
  }

  renderItems(items, ownUserId) {
    items.forEach(item => {
      const card = this.createItem(item, ownUserId);
      this._containerElement.append(card);
    });
  }

  renderItem (item, ownUserId) {
    const card = this.createItem(item, ownUserId);
    this._containerElement.prepend(card);
  }

  createItem(item, ownUserId) {
    return this._creator(item, ownUserId);
  }
}

export default Section;