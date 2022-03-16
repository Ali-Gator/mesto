class Card {
  constructor(cardItem, cardSelector, handleImageClick) {
    this._name = cardItem.name;
    this._link = cardItem.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._card = this._getTemplate();
    this._setEventListeners();
    const cardImage = this._card.querySelector('.card__image');
    cardImage.src = this._link;
    cardImage.alt = this._name;
    this._card.querySelector('.card__text').textContent = this._name;
    return this._card;
  }

  _setEventListeners() {
    this._card.querySelector('.card__image').addEventListener('click', () => {
      this._handleImageClick(this._name, this._link);
    });
    this._card.querySelector('.card__like-icon').addEventListener('click', this._handleLikeCard);
    this._card.querySelector('.card__delete-icon').addEventListener('click', () => {
      this._handleDeleteCard();
    });
  }

  _handleLikeCard(evt) {
    evt.target.classList.toggle('card__like-icon_pressed');
  }

  _handleDeleteCard() {
    this._card.remove();
  }
}

export default Card;