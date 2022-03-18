import './index.css';
import {initialCards, formParameters} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const profileNameInput = document.querySelector('.popup__text-input_type_username');
const profileDescriptionInput = document.querySelector('.popup__text-input_type_description');
const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');
const imagePopup = new PopupWithImage('.popup_type_picture');
const profilePopup = new PopupWithForm('.popup_type_profile', handleProfileSubmit);
const newCardPopup = new PopupWithForm('.popup_type_card-add', handleNewCardSubmit);
const cardsList = new Section({
  items: initialCards, itemCreator: createCard
}, '.cards__list');
const userInfo = new UserInfo({profileSelector: '.profile__name', descriptionSelector: '.profile__description'});
const formValidators = {};

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
}

function createCard(cardItem) {
  const card = new Card(cardItem, '.template-card', handleCardClick);
  return card.generateCard();
}

function handleCardClick({name, link}) {
  imagePopup.open({name: name, link: link});
}

function handleEditProfileClick() {
  const currentUser = userInfo.getUserInfo();
  profileNameInput.value = currentUser.name;
  profileDescriptionInput.value = currentUser.description;
  formValidators['edit-profile'].resetValidation();
  profilePopup.open();
}

function handleAddNewCardClick() {
  formValidators['add-card'].resetValidation();
  newCardPopup.open();
}

function handleProfileSubmit(inputValues) {
  userInfo.setUserInfo({name: inputValues.username, description: inputValues.description});
  profilePopup.close();
}

function handleNewCardSubmit(inputValues) {
  cardsList.addItem({name: inputValues['card-heading'], link: inputValues['image-link']});
  newCardPopup.close();
}

imagePopup.setEventListeners();
profilePopup.setEventListeners();
newCardPopup.setEventListeners();
profileEditButton.addEventListener('click', handleEditProfileClick);
cardAddButton.addEventListener('click', handleAddNewCardClick);
enableValidation(formParameters);
cardsList.renderItems();


