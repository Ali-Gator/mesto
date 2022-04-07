import './index.css';
import {formParameters} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupConfirm from '../components/PopupConfirm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

const profileNameInput = document.querySelector('.popup__text-input_type_username');
const profileDescriptionInput = document.querySelector('.popup__text-input_type_description');
const changeAvatarButton = document.querySelector('.profile__image-button');
const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');
const imagePopup = new PopupWithImage('.popup_type_picture');
const avatarPopup = new PopupWithForm('.popup_type_avatar', handleAvatarSubmit);
const profilePopup = new PopupWithForm('.popup_type_profile', handleProfileSubmit);
const newCardPopup = new PopupWithForm('.popup_type_card-add', handleNewCardSubmit);
const confirmPopup = new PopupConfirm('.popup_type_confirm', handleConfirmClick);
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
  confirmPopup.open(card);
}

function handleCardClick({name, link}) {
  imagePopup.open({name: name, link: link});
}

function handleLikeCard(card, isLiked) {
  if (isLiked) {
    return api.deleteLike(card.cardId)
      .then(obj => {
        card.dislikeCard(obj);
      })
      .catch(err => alert(`${err}. Попробуйте ещё раз`));
  } else {
    return api.putLike(card.cardId)
      .then(obj => {
        card.likeCard(obj);
      })
      .catch(err => alert(`${err}. Попробуйте ещё раз`));
  }
}

function createCard(cardItem) {
  const card = new Card(cardItem, '.template-card', handleCardClick, handleDeleteCard, handleLikeCard, userInfo.getUserInfo().ownUserId);
  return card.generateCard();
}

function handleChangeAvatarClick() {
  formValidators['avatar'].resetValidation();
  avatarPopup.open();
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

function handleAvatarSubmit(inputValue) {
  avatarPopup.changeButtonText('Сохранение...');
  return api.patchAvatar(inputValue['avatar-link'])
    .then(user => {
      userInfo.setUserInfo({avatar: user.avatar});
      avatarPopup.close();
    })
    .catch(err => {
      alert(`${err}. Не удается отправить. Попробуйте ещё раз`);
    })
    .finally(() => avatarPopup.changeButtonText('Сохранить'));
}

function handleProfileSubmit(inputValues) {
  profilePopup.changeButtonText('Сохранение...');
  return api.patchProfile({name: inputValues.username, about: inputValues.description})
    .then(user => {
      userInfo.setUserInfo({name: user.name, description: user.about});
      profilePopup.close();
    })
    .catch(err => {
      alert(`${err}. Не удается отправить. Попробуйте ещё раз`);
    })
    .finally(() => avatarPopup.changeButtonText('Сохранить'));
}

function handleNewCardSubmit(inputValues) {
  newCardPopup.changeButtonText('Сохранение...');
  return api.postCard({name: inputValues['card-heading'], link: inputValues['image-link']})
    .then(card => {
      cardsList.renderItem(card);
      newCardPopup.close();
    })
    .catch(err => {
      alert(`${err}. Не удается отправить. Попробуйте ещё раз`);
    })
    .finally(() => avatarPopup.changeButtonText('Сохранить'));
}

function handleConfirmClick(cardToDelete) {
  return api.deleteCard(cardToDelete.cardId)
    .then(() => {
      cardToDelete.deleteCard();
      confirmPopup.close();
    })
    .catch(err => alert(`${err}. Попробуйте ещё раз`));
}

avatarPopup.setEventListeners();
imagePopup.setEventListeners();
profilePopup.setEventListeners();
newCardPopup.setEventListeners();
confirmPopup.setEventListeners();
changeAvatarButton.addEventListener('click', handleChangeAvatarClick);
profileEditButton.addEventListener('click', handleEditProfileClick);
cardAddButton.addEventListener('click', handleAddNewCardClick);
enableValidation(formParameters);
Promise.all([api.getInitialUser(), api.getInitialCards()])
  .then(([user, cards]) => {
    userInfo.setUserInfo({
      name: user.name,
      description: user.about,
      avatar: user.avatar,
      ownUserId: user._id
    });
    cardsList.renderItems(cards)
  })
  .catch(err => console.log(err));



