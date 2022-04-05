class Card {
  constructor(cardItem, cardSelector, handleCardClick, handleDeleteCard, handleLikeCard) {
    this._name = cardItem.name;
    this._link = cardItem.link;
    this._likes = cardItem.likes;
    this._cardId = cardItem._id;
    this._ownerId = cardItem.owner._id;
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

  generateCard(ownUserId) {
    this._card = this._getTemplate();
    this._likeButton = this._card.querySelector('.card__like-icon');
    this._likeCounter = this._card.querySelector('.card__like-counter');
    this._setEventListeners();
    this._card.id = this._cardId;
    const cardImage = this._card.querySelector('.card__image');
    cardImage.src = this._link;
    cardImage.alt = this._name;
    if (this._ownerId === ownUserId) {
      this._card.querySelector('.card__delete-icon').classList.add('card__delete-icon_active');
    }
    this._card.querySelector('.card__text').textContent = this._name;
    this._countLikes(this._likes);
    if (this._likes.some(user => user._id === ownUserId)) {
      this._card.querySelector('.card__like-icon').classList.add('card__like-icon_pressed');
    }
    return this._card;
  }

  _setEventListeners() {
    this._card.querySelector('.card__image').addEventListener('click', () => {
      this._handleCardClick({name: this._name, link: this._link});
    });
    this._likeButton.addEventListener('click', () => {
      this._toggleLike(this._card);
    });
    this._card.querySelector('.card__delete-icon').addEventListener('click', () => {
      this._handleDeleteCard(this._card);
    });
  }

  _toggleLike(card) {
    if (this._likeButton.classList.contains('card__like-icon_pressed')) {
      this._handleLikeCard(card, true)
        .then(obj => {
          this._likeButton.classList.remove('card__like-icon_pressed');
          this._countLikes(obj.likes);
        })
        .catch(err => alert(`${err}. Попробуйте ещё раз`));
    } else {
      this._handleLikeCard(card, false)
        .then(obj => {
          this._countLikes(obj.likes);
          this._likeButton.classList.add('card__like-icon_pressed');
        })
        .catch(err => alert(`${err}. Попробуйте ещё раз`));
    }
  }

  _countLikes(arr) {
    this._likeCounter.textContent = arr.length > 0 ? arr.length : '';
  }

  deleteCard() {
    this._card.remove();
  }
}

export default Card;