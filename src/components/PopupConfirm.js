import Popup from './Popup.js';

class PopupConfirm extends Popup {
  constructor(popupSelector, handleConfirmClick) {
    super(popupSelector);
    this._handleConfirmClick = handleConfirmClick;
    this._confirmButton = this._element.querySelector('.popup__save-button');
  }

  open(card) {
    super.open();
    this._cardToDelete = card;
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener('click', () => {
      this._handleConfirmClick(this._cardToDelete);
    });
  }
}
    export default PopupConfirm;