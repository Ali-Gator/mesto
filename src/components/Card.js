class Card {
  constructor(cardItem, cardSelector, handleCardClick, handleDeleteCard, handleLikeCard, ownUserId) {
    this._name = cardItem.name;
    this._link = cardItem.link;
    this._likes = cardItem.likes;
    this.cardId = cardItem._id;
    this._ownerId = cardItem.owner._id;
    this._ownUserId = ownUserId;
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

  generateCard() {
    this._card = this._getTemplate();
    this._likeButton = this._card.querySelector('.card__like-icon');
    this._likeCounter = this._card.querySelector('.card__like-counter');
    this._setEventListeners();
    const cardImage = this._card.querySelector('.card__image');
    cardImage.src = this._link;
    cardImage.alt = this._name;
    if (this._ownerId === this._ownUserId) {
      this._card.querySelector('.card__delete-icon').classList.add('card__delete-icon_active');
    }
    this._card.querySelector('.card__text').textContent = this._name;
    this._countLikes(this._likes);
    if (this._likes.some(user => user._id === this._ownUserId)) {
      this._card.querySelector('.card__like-icon').classList.add('card__like-icon_pressed');
    }
    return this._card;
  }

  _setEventListeners() {
    this._card.querySelector('.card__image').addEventListener('click', () => {
      this._handleCardClick({name: this._name, link: this._link});
    });
    this._likeButton.addEventListener('click', () => {
      if (this._likeButton.classList.contains('card__like-icon_pressed')) {
        this._handleLikeCard(this, true)
      } else {
        this._handleLikeCard(this, false)
      }
    });
    this._card.querySelector('.card__delete-icon').addEventListener('click', () => {
      this._handleDeleteCard(this);
    });
  }

  dislikeCard(obj) {
    this._likeButton.classList.remove('card__like-icon_pressed');
    this._countLikes(obj.likes);
  }

  likeCard(obj) {
    this._countLikes(obj.likes);
    this._likeButton.classList.add('card__like-icon_pressed');
  }

  _countLikes(arr) {
    this._likeCounter.textContent = arr.length > 0 ? arr.length : '';
  }

  deleteCard() {
    this._card.remove();
    this._card = null;
  }
}

export default Card;