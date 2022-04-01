class Card {
  constructor(cardItem, cardSelector, handleCardClick, handleDeleteCard, handleLikeCard) {
    this._name = cardItem.name;
    this._link = cardItem.link;
    this._likes = cardItem.likes;
    this._cardId = cardItem._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeCard = handleLikeCard;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
    return cardElement;
  }

  generateCard(isOwn, ownUserId) {
    this._card = this._getTemplate();
    this._setEventListeners();
    this._card.id = this._cardId;
    const cardImage = this._card.querySelector('.card__image');
    cardImage.src = this._link;
    cardImage.alt = this._name;
    if (isOwn) {
      this._card.querySelector('.card__delete-icon').classList.add('card__delete-icon_active');
    }
    this._card.querySelector('.card__text').textContent = this._name;
    this._card.querySelector('.card__like-counter').textContent = this._likes.length > 0 ? this._likes.length : '';
    if (this._likes.some(user => user._id === ownUserId)) {
      this._card.querySelector('.card__like-icon').classList.add('card__like-icon_pressed');
    }
    return this._card;
  }

  _setEventListeners() {
    this._card.querySelector('.card__image').addEventListener('click', () => {
      this._handleCardClick({name: this._name, link: this._link});
    });
    this._card.querySelector('.card__like-icon').addEventListener('click', () => {
      this._handleLikeCard(this._card);
    });
    this._card.querySelector('.card__delete-icon').addEventListener('click', () => {
      this._handleDeleteCard(this._card);
    });
  }
}

export default Card;