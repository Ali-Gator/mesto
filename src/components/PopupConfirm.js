import Popup from './Popup.js';

class PopupConfirm extends Popup {
  constructor(popupSelector, handleConfirmClick) {
    super(popupSelector);
    this._handleSubmit = handleConfirmClick;
    this._confirmButton = this._element.querySelector('.popup__save-button');
  }

  set cardToDelete(card) {
    return this._cardToDelete = card;
  }

  get cardToDelete() {
    return this._cardToDelete;
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener('click', () => {
      this._handleSubmit(this.cardToDelete);
    });
  }
}
    export default PopupConfirm;