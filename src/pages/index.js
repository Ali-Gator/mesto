import './index.css';
import {initialCards, formParameters} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

const profileNameInput = document.querySelector('.popup__text-input_type_username');
const profileDescriptionInput = document.querySelector('.popup__text-input_type_description');
const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');
const imagePopup = new PopupWithImage('.popup_type_picture');
const profilePopup = new PopupWithForm('.popup_type_profile', handleProfileSubmit);
const newCardPopup = new PopupWithForm('.popup_type_card-add', handleNewCardSubmit);
const confirmPopup = new PopupWithForm('.popup_type_confirm', handleConfirmSubmit);
const cardsList = new Section(createCard, '.cards__list');
const userInfo = new UserInfo({
  profileSelector: '.profile__name',
  descriptionSelector: '.profile__description',
  avatarSelector: '.profile__image'
});
const formValidators = {};
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
  headers: {
    authorization: '914b7268-7449-4876-82b7-f51aacf67523',
    'Content-Type': 'application/json'
  }
});

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
}

function handleDeleteCard(card) {
  confirmPopup.open();
  confirmPopup.cardToDelete = card;
}

function handleConfirmSubmit(cardToDelete) {
  cardToDelete.remove();
  api.deleteCard(cardToDelete.id);
  confirmPopup.close();
}
function handleCardClick({name, link}) {
  imagePopup.open({name: name, link: link});
}

function createCard(cardItem) {
  const card = new Card(cardItem, '.template-card', handleCardClick, handleDeleteCard);
  return card.generateCard();
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
  api.patchProfile({name: inputValues.username, about: inputValues.description})
    .then(user => userInfo.setUserInfo({name: user.name, description: user.about, avatar: user.avatar}))
    .catch(err => console.log(err));
  profilePopup.close();
}

function handleNewCardSubmit(inputValues) {
  api.postCard({name: inputValues['card-heading'], link: inputValues['image-link']})
    .then(card => cardsList.addItem(card, true))
    .catch(err => console.log(err));
  newCardPopup.close();
}

imagePopup.setEventListeners();
profilePopup.setEventListeners();
newCardPopup.setEventListeners();
confirmPopup.setEventListeners();
profileEditButton.addEventListener('click', handleEditProfileClick);
cardAddButton.addEventListener('click', handleAddNewCardClick);
enableValidation(formParameters);
api.getInitialUser()
  .then(user => userInfo.setUserInfo({name: user.name, description: user.about, avatar: user.avatar}))
  .catch(err => console.log(err));
api.getInitialCards()
  .then(cards => cardsList.renderItems(cards, false))
  .catch(err => console.log(err));



