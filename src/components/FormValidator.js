class FormValidator {
  constructor(data, formElement) {
    this._form = formElement;
    this._submitButton = this._form.querySelector(data.submitButtonSelector);
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._inputList = Array.from(this._form.querySelectorAll(data.inputSelector));
  }

  enableValidation() {
    this._toggleButtonState();
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._isValid(input);
        this._toggleButtonState();
      });
    });
  }

  _isValid(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._submitButton.setAttribute('disabled', true);
    } else {
      this._submitButton.removeAttribute('disabled');
    }
  }

  _showInputError(input) {
    const inputErrorElement = this._form.querySelector(`.${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    inputErrorElement.textContent = input.validationMessage;
    inputErrorElement.classList.add(this._errorClass);
  }

  _hideInputError(input) {
    const inputErrorElement = this._form.querySelector(`.${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    inputErrorElement.classList.remove(this._errorClass);
    inputErrorElement.textContent = '';
  }

  _hasInvalidInput(inputs) {
    return inputs.some((input) => {
      return !input.validity.valid;
    });
  }

  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach(input => {
      this._hideInputError(input);
    });
  }
}

export default FormValidator;