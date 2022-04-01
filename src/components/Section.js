class Section {
  constructor(itemCreator, containerSelector) {
    this._creator = itemCreator;
    this._containerElement = document.querySelector(containerSelector);
  }

  renderItems(items, isOwn) {
    items.forEach(item => {
      this.addItem(item, isOwn);
    });
  }

  addItem(item, isOwn) {
    const card = this._creator(item);
    if (isOwn) {
      card.querySelector('.card__delete-icon').classList.add('card__delete-icon_active');
    }
    this._containerElement.prepend(card);
  }
}

export default Section;