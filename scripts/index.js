import initialCards from './initialCards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

const popups = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_type_profile');
const popupEditProfileForm = popupEditProfile.querySelector('.popup__form_edit-profile');
const profileNameInput = popupEditProfileForm.querySelector('.popup__text-input_type_username');
const profileDescriptionInput = popupEditProfileForm.querySelector('.popup__text-input_type_description');
const popupAddCard = document.querySelector('.popup_type_card-add');
const popupAddCardForm = popupAddCard.querySelector('.popup__form_add-card');
const inputCardHeading = popupAddCardForm.querySelector('.popup__text-input_type_card-heading');
const inputCardImageLink = popupAddCardForm.querySelector('.popup__text-input_type_image-link');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
// const profileName = document.querySelector('.profile__name');
// const profileDescription = document.querySelector('.profile__description');
const formParameters = {
  inputSelector: '.popup__text-input',
  submitButtonSelector: '.popup__save-button',
  inputErrorClass: 'popup__text-input_type_error',
  errorClass: 'popup__input-error_active',
};
const validationFormProfile = new FormValidator(formParameters, popupEditProfile);
const validationFormAddCard = new FormValidator(formParameters, popupAddCard);
const imagePopup = new PopupWithImage('.popup_type_picture');

const userInfo = new UserInfo({profileSelector: '.profile__name', descriptionSelector: '.profile__description'});

function handleProfileSubmit(inputValues) {
  userInfo.setUserInfo({name: inputValues.username, description: inputValues.description});
  profilePopup.close();
}

const profilePopup = new PopupWithForm('.popup_type_profile', handleProfileSubmit);
imagePopup.setEventListeners();
profilePopup.setEventListeners();

function handleCardClick({name, link}) {
  imagePopup.open({name: name, link: link});
}
function handleEditProfileClick() {
  const currentUser = userInfo.getUserInfo();
  profileNameInput.value = currentUser.name;
  profileDescriptionInput.value = currentUser.description;
  validationFormProfile.resetInputsErrors();
  validationFormProfile.toggleButtonState();
  profilePopup.open();
}

profileEditButton.addEventListener('click', handleEditProfileClick);

const cardsList = new Section({
    items: initialCards,
    renderer: (cardItem) => {
      const card = new Card(cardItem, '.template-card', handleCardClick);
      const cardElement = card.generateCard();
      cardsList.addItem(cardElement);
    }
  },
  '.cards__list');
cardsList.renderItems();




// add-card button
function handleAddButton() {
  openPopup(popupAddCard);
}

// add-card save-button
function openNewCardPopup(evt) {
  evt.preventDefault();
  const userCard = new Card({
    name: inputCardHeading.value,
    link: inputCardImageLink.value,
  }, '.template-card', handleCardClick);
  const userCardEl = userCard.generateCard();
  cardsList.addItem(userCardEl);
  popupAddCardForm.reset();
  validationFormAddCard.toggleButtonState();
  closePopup(popupAddCard);
}

// renderCard(initialCards);
validationFormProfile.enableValidation();
validationFormAddCard.enableValidation();
// popups.forEach((popup) => {
//   popup.addEventListener('click', (evt) => {
//     if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
//       closePopup(popup);
//     }
//   });
// });
// popupEditProfileForm.addEventListener('submit', handleProfileSubmit);
profileAddButton.addEventListener('click', handleAddButton);
popupAddCardForm.addEventListener('submit', openNewCardPopup);

