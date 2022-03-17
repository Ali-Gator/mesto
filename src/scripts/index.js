import '../pages/index.css';
import initialCards from './initialCards.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');
const formParameters = {
  inputSelector: '.popup__text-input',
  submitButtonSelector: '.popup__save-button',
  inputErrorClass: 'popup__text-input_type_error',
  errorClass: 'popup__input-error_active',
};
const imagePopup = new PopupWithImage('.popup_type_picture');
const profilePopup = new PopupWithForm('.popup_type_profile', handleProfileSubmit);
const newCardPopup = new PopupWithForm('.popup_type_card-add', handleNewCardSubmit);
const cardsList = new Section({
  items: initialCards, renderer: cardRenderer
}, '.cards__list');
const userInfo = new UserInfo({profileSelector: '.profile__name', descriptionSelector: '.profile__description'});
const validationFormProfile = new FormValidator(formParameters, '.popup_type_profile');
const validationFormAddCard = new FormValidator(formParameters, '.popup_type_card-add');

function handleCardClick({name, link}) {
  imagePopup.open({name: name, link: link});
}

function cardRenderer(cardItem) {
  const card = new Card(cardItem, '.template-card', handleCardClick);
  const cardElement = card.generateCard();
  cardsList.addItem(cardElement);
}

function handleEditProfileClick() {
  const profileNameInput = document.querySelector('.popup__text-input_type_username');
  const profileDescriptionInput = document.querySelector('.popup__text-input_type_description');
  const currentUser = userInfo.getUserInfo();
  profileNameInput.value = currentUser.name;
  profileDescriptionInput.value = currentUser.description;
  validationFormProfile.resetInputsErrors();
  validationFormProfile.toggleButtonState();
  profilePopup.open();
}

function handleAddNewCardClick() {
  validationFormAddCard.toggleButtonState();
  newCardPopup.open();
}

function handleProfileSubmit(inputValues) {
  userInfo.setUserInfo({name: inputValues.username, description: inputValues.description});
  profilePopup.close();
}

function handleNewCardSubmit(inputValues) {
  cardRenderer({name: inputValues['card-heading'], link: inputValues['image-link']});
  newCardPopup.close();
}

imagePopup.setEventListeners();
profilePopup.setEventListeners();
newCardPopup.setEventListeners();
profileEditButton.addEventListener('click', handleEditProfileClick);
cardAddButton.addEventListener('click', handleAddNewCardClick);
validationFormProfile.enableValidation();
validationFormAddCard.enableValidation();
cardsList.renderItems();


