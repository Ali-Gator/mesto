const popup = document.querySelector('.popup');
const popupContainer = popup.querySelectorAll('.popup__container');

const popupEditProfileForm = popup.querySelector('.popup__form_edit-profile');
const EditProfileNameInput = popupEditProfileForm.querySelector('#name-field');
const EditProfileDescriptionInput = popupEditProfileForm.querySelector('#description-field');

const popupAddCardForm = popup.querySelector('.popup__form_add-card');
const AddCardHeadingInput = popupAddCardForm.querySelector('#card-heading-field');
const AddCardImageLinkInput = popupAddCardForm.querySelector('#image-link-field');

const popupCloseButtons = popup.querySelectorAll('.popup__close-button');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const cardsList = document.querySelector('.cards__list');
const initialCards = [
  {
    name: 'Бангкок',
    link: './images/bangkok.jpg',
    alt: 'Небоскребы Бангкока',
  },
  {
    name: 'Хургада',
    link: './images/hurghada.jpg',
    alt: 'Верблюд на фоне пирамиды',
  },
  {
    name: 'Москва',
    link: './images/moscow.jpg',
    alt: 'Храм Василия Блаженного',
  },
  {
    name: 'Нью-Йорк',
    link: './images/newyork.jpg',
    alt: 'Бруклинский мост',
  },
  {
    name: 'Рио-де-Жанейро',
    link: './images/rio.jpg',
    alt: 'Вид на закате статуи Иисуса Христа в Рио-де-Жанейро',
  },
  {
    name: 'Зеленоградск',
    link: './images/zelenogradsk.jpg',
    alt: 'Водонапорная башня в Зеленоградске',
  },
];

// create card from html template

function createCard(link = '', alt = '', text = '') {
  const cardTemplate = document.querySelector('#card').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardElementImage = cardElement.querySelector('.card__image');
  const cardElementHeading = cardElement.querySelector('.card__text');

  cardElementImage.src = link;
  cardElementImage.alt = alt;
  cardElementHeading.textContent = text;

  return cardElement;
}

// render card or cards

function renderCard(cardValues) {
  if (Array.isArray(cardValues)) {
    cardValues.forEach((elem) => {
      cardsList.append(createCard(elem.link, elem.alt, elem.name));
    });
  } else {
    cardsList.prepend(createCard(cardValues.link, cardValues.alt, cardValues.name));
  }
}

// open popups

function openPopup(container) {
  popup.classList.add('popup_opened');
  container.classList.add('popup__container_opened');
}

// close popups

function closePopup(evt) {
  popup.classList.remove('popup_opened', 'popup_dark');
  evt.target.closest('.popup__container').classList.remove('popup__container_opened');
}

// profile edit-button

function editButtonHandler() {
  openPopup(popupEditProfileForm.parentElement);
  EditProfileNameInput.value = profileName.textContent;
  EditProfileDescriptionInput.value = profileDescription.textContent;
}

// popup edit-profile save-button

function saveButtonEditProfileHandler(evt) {
  evt.preventDefault();
  profileName.textContent = EditProfileNameInput.value;
  profileDescription.textContent = EditProfileDescriptionInput.value;
  closePopup(evt);
}

// add-card button

function addButtonHandler() {
  openPopup(popupAddCardForm.parentElement);
  AddCardHeadingInput.value = '';
  AddCardImageLinkInput.value = '';
}

// popup add-card save-button

function saveButtonAddCardHandler(evt) {
  evt.preventDefault();
  const userCard = {
    name: '',
    link: '',
  };

  userCard.name = AddCardHeadingInput.value;
  userCard.link = AddCardImageLinkInput.value;

  renderCard(userCard);
  closePopup(evt);
}

// card's image

function viewImageHandler(evt) {
  const popupImageContainer = popup.querySelector('.popup__image-container');
  const popupImage = popupImageContainer.querySelector('.popup__image');
  const popupCaption = popupImageContainer.querySelector('.popup__image-caption');

  popupImage.src = '';
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  console.log(evt.target.parentElement.querySelector('.card__text').textContent);
  popupCaption.textContent = evt.target.parentElement.querySelector('.card__text').textContent;

  popup.classList.add('popup_opened', 'popup_theme_dark');
  popupImageContainer.closest('.popup__container').classList.add('popup__container_opened');
}

// card's like-button

function buttonLikeHandler(evt) {
  evt.target.classList.toggle('card__like-icon_pressed');
}

// card's delete-button

function buttonDeleteHandler(evt) {
  evt.target.closest('.card').remove();
}

// switcher of card's handlers

function cardListHandler(evt) {
  if (evt.target.classList.contains('card__image')) {
    viewImageHandler(evt);
  }

  if (evt.target.classList.contains('card__like-icon')) {
    buttonLikeHandler(evt);
  }

  if (evt.target.classList.contains('card__delete-icon')) {
    buttonDeleteHandler(evt);
  }
}

renderCard(initialCards);

profileEditButton.addEventListener('click', editButtonHandler);
popupEditProfileForm.addEventListener('submit', saveButtonEditProfileHandler);
profileAddButton.addEventListener('click', addButtonHandler);
popupAddCardForm.addEventListener('submit', saveButtonAddCardHandler);
popupCloseButtons.forEach((elem) => {
  elem.addEventListener('click', closePopup);
});
cardsList.addEventListener('click', cardListHandler);
