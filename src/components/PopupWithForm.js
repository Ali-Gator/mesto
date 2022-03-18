import Popup from './Popup.js';

class PopupWithForm extends Popup {
  constructor(props, handleSubmit) {
    super(props);
    this._handleSubmit = handleSubmit;
    this._inputList = this._element.querySelectorAll('.popup__text-input');
    this._formElement = this._element.querySelector('.popup__form');
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}

export default PopupWithForm;