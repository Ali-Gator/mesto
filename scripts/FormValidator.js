class FormValidator {
  constructor(data, formElement) {
    this._form = formElement;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
  }

  enableValidation() {
    this._inputs = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._inputs.forEach((input) => {
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
    this._saveButton = this._form.querySelector(this._submitButtonSelector);
    if (this._hasInvalidInput(this._inputs)) {
      this._saveButton.setAttribute('disabled', true);
    } else {
      this._saveButton.removeAttribute('disabled');
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
}

export default FormValidator;