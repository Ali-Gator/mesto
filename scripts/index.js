import initialCards from './initialCards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

const popups = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_type_profile');
const popupEditProfileForm = popupEditProfile.querySelector('.popup__form_edit-profile');
const popupEditProfileInputs = Array.from(popupEditProfileForm.querySelectorAll('.popup__text-input'));
const inputProfileName = popupEditProfileForm.querySelector('.popup__text-input_type_username');
const inputProfileDescription = popupEditProfileForm.querySelector('.popup__text-input_type_description');
const editProfileSaveButton = popupEditProfileForm.querySelector('.popup__save-button');
const popupAddCard = document.querySelector('.popup_type_card-add');
const popupAddCardForm = popupAddCard.querySelector('.popup__form_add-card');
const popupAddCardInputs = Array.from(popupAddCardForm.querySelectorAll('.popup__text-input'));
const inputCardHeading = popupAddCardForm.querySelector('.popup__text-input_type_card-heading');
const inputCardImageLink = popupAddCardForm.querySelector('.popup__text-input_type_image-link');
const addCardSaveButton = popupAddCardForm.querySelector('.popup__save-button');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const formParameters = {
  inputSelector: '.popup__text-input',
  submitButtonSelector: '.popup__save-button',
  inputErrorClass: 'popup__text-input_type_error',
  errorClass: 'popup__input-error_active',
};
const forms = Array.from(document.querySelectorAll('.popup__form'));

function renderCard(cardValues) {
  const cardsList = document.querySelector('.cards__list');
  if (Array.isArray(cardValues)) {
    cardValues.forEach((data) => {
      const card = new Card(data, '.template-card');
      cardsList.append(card.generateCard());
    });
  } else {
    const card = new Card(cardValues, '.template-card');
    cardsList.prepend(card.generateCard());
  }
}

// close popup by Esc
function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

// open popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}

// close popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
}

// profile edit-button
function openProfilePopup() {
  openPopup(popupEditProfile);
  inputProfileName.value = profileName.textContent;
  inputProfileDescription.value = profileDescription.textContent;
  toggleButtonState(popupEditProfileInputs, editProfileSaveButton);
}

// edit-profile save-button
function handleProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileDescription.textContent = inputProfileDescription.value;
  closePopup(popupEditProfile);
}

// add-card button
function handleAddButton() {
  openPopup(popupAddCard);
  toggleButtonState(popupAddCardInputs, addCardSaveButton);
}

// add-card save-button
function openNewCardPopup(evt) {
  evt.preventDefault();
  const userCard = {
    name: inputCardHeading.value, link: inputCardImageLink.value,
  };
  renderCard(userCard);
  popupAddCardForm.reset();
  closePopup(popupAddCard);
}

renderCard(initialCards);
forms.forEach((form) => {
  const validator = new FormValidator(formParameters, form);
  validator.enableValidation();
});
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    }
  });
});
profileEditButton.addEventListener('click', openProfilePopup);
popupEditProfileForm.addEventListener('submit', handleProfileSubmit);
profileAddButton.addEventListener('click', handleAddButton);
popupAddCardForm.addEventListener('submit', openNewCardPopup);


