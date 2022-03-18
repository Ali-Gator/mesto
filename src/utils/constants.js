const initialCards = [
  {
    name: 'Бангкок',
    link: new URL('../images/bangkok.jpg', import.meta.url)
  },
  {
    name: 'Хургада',
    link: new URL('../images/hurghada.jpg', import.meta.url)
  },
  {
    name: 'Москва',
    link: new URL('../images/moscow.jpg', import.meta.url)
  },
  {
    name: 'Нью-Йорк',
    link: new URL('../images/newyork.jpg', import.meta.url)
  },
  {
    name: 'Рио-де-Жанейро',
    link: new URL('../images/rio.jpg', import.meta.url)
  },
  {
    name: 'Зеленоградск',
    link: new URL('../images/zelenogradsk.jpg', import.meta.url)
  },
];
const formParameters = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text-input',
  submitButtonSelector: '.popup__save-button',
  inputErrorClass: 'popup__text-input_type_error',
  errorClass: 'popup__input-error_active',
};
export {initialCards, formParameters};