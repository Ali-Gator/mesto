const showInputError = (form, input, { inputErrorClass, errorClass }) => {
  const inputError = form.querySelector(`.${input.id}-error`);

  input.classList.add(inputErrorClass);
  inputError.textContent = input.validationMessage;
  inputError.classList.add(errorClass);
};

const hideInputError = (form, input, { inputErrorClass, errorClass }) => {
  const inputError = form.querySelector(`.${input.id}-error`);

  input.classList.remove(inputErrorClass);
  inputError.classList.remove(errorClass);
  inputError.textContent = '';
};

const isValid = (form, input, rest) => {
  if (!input.validity.valid) {
    showInputError(form, input, rest);
  } else {
    hideInputError(form, input, rest);
  }
};

const hasInvalidInput = (inputs) => {
  return inputs.some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputs, button) => {
  if (hasInvalidInput(inputs)) {
    button.setAttribute('disabled', true);
  } else {
    button.removeAttribute('disabled');
  }
};

const setEventListener = (form, inputs, saveButton, rest) => {
  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      isValid(form, input, rest);
      toggleButtonState(inputs, saveButton);
    });
  });
};

const enableValidation = ({ formSelector, inputSelector, submitButtonSelector, ...rest }) => {
  const forms = Array.from(document.querySelectorAll(formSelector));

  forms.forEach((form) => {
    const saveButton = form.querySelector(submitButtonSelector);
    const inputs = Array.from(form.querySelectorAll(inputSelector));

    setEventListener(form, inputs, saveButton, rest);
    // toggleButtonState(inputs, saveButton);
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__text-input',
  submitButtonSelector: '.popup__save-button',
  inputErrorClass: 'popup__text-input_type_error',
  errorClass: 'popup__input-error_active',
});


// Добавть карточку:
//
// Кнопка активна сразу при запуске
//
// Профайл:
//
// удалив поле и закрыв, а потом снова открыв: поле появляется, но кнопка все равно не авктивнаVa