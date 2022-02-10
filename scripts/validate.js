const showInputError = (form, element, errorMessage) => {
  const elementError = form.querySelector(`.${element.id}-error`);

  element.classList.add('popup__text-input_type_error');
  elementError.textContent = errorMessage;
  elementError.classList.add('popup__input-error_active');
};

const hideInputError = (form, element) => {
  const elementError = form.querySelector(`.${element.id}-error`);

  element.classList.remove('popup__text-input_type_error');
  elementError.classList.remove('popup__input-error_active');
  elementError.textContent = '';
};

const isValid = (form, element) => {
  if (!element.validity.valid) {
    showInputError(form, element, element.validationMessage);
  } else {
    hideInputError(form, element);
  }
};

const setEventListener = (form) => {
  const formInputs = Array.from(form.querySelectorAll('.popup__text-input'));

  formInputs.forEach((input) => {
    input.addEventListener('input', () => {
      isValid(form, input);
    });
  });
};

const enableValidation = () => {
  const forms = Array.from(document.querySelectorAll('.popup__form'));

  forms.forEach((form) => {
    setEventListener(form);
  });
};

enableValidation();
