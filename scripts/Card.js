class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
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

    this._card.querySelector('.card__image').src = this._link;
    this._card.querySelector('.card__image').alt = this._name;
    this._card.querySelector('.card__text').textContent = this._name;

    return this._card;
  }

  _setEventListeners() {
    this._card.querySelector('.card__image').addEventListener('click', () => {
      this._handleImageClick();
    });
    this._card.querySelector('.card__like-icon').addEventListener('click', this._handleLikeCard);
    this._card.querySelector('.card__delete-icon').addEventListener('click', this._handleDeleteCard);
  }

  _handleImageClick() {
    const popupTypePicture = document.querySelector('.popup_type_picture');
    popupTypePicture.querySelector('.popup__image').src = this._link;
    popupTypePicture.querySelector('.popup__image').alt = this._name;
    popupTypePicture.querySelector('.popup__image-caption').textContent = this._name;

    this._openPopup(popupTypePicture);
  }

  _handleLikeCard(evt) {
    evt.target.classList.toggle('card__like-icon_pressed');
  }

  _handleDeleteCard(evt) {
    evt.target.closest('.card').remove();
  }

  _openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._closeByEsc);
  }

  _closeByEsc(evt) {
    if (evt.key === 'Escape') {
      document.querySelector('.popup_type_picture').classList.remove('popup_opened');
      document.removeEventListener('keydown', this._closeByEsc);
    }
  }
}

export default Card;