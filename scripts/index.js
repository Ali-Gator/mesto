const popupEditProfile = document.querySelector('.popup_type_profile');
const popupEditProfileForm = popupEditProfile.querySelector('.popup__form_edit-profile');
const popupEditProfileInputs = Array.from(popupEditProfile.querySelectorAll('.popup__text-input'));
const inputProfileName = popupEditProfileForm.querySelector('.popup__text-input_type_username');
const inputProfileDescription = popupEditProfileForm.querySelector(
  '.popup__text-input_type_description'
);
const editProfileSaveButton = popupEditProfileForm.querySelector('.popup__save-button');

const popupAddCard = document.querySelector('.popup_type_card-add');
const popupAddCardForm = popupAddCard.querySelector('.popup__form_add-card');
const inputCardHeading = popupAddCardForm.querySelector('.popup__text-input_type_card-heading');
const inputCardImageLink = popupAddCardForm.querySelector('.popup__text-input_type_image-link');

const popupViewPicture = document.querySelector('.popup_type_picture');
const popupImageContainer = popupViewPicture.querySelector('.popup__image-container');
const popupImage = popupImageContainer.querySelector('.popup__image');
const popupImageCaption = popupImageContainer.querySelector('.popup__image-caption');

const popupCloseButtons = document.querySelectorAll('.popup__close-button');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const cardsList = document.querySelector('.cards__list');

// create card from html template

function createCard({ link, name }) {
  const cardTemplate = document.querySelector('.template-card').content;
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardHeading = card.querySelector('.card__text');
  const cardLikeButton = card.querySelector('.card__like-icon');
  const cardDeleteButton = card.querySelector('.card__delete-icon');

  cardImage.src = link;
  cardImage.alt = name;
  cardHeading.textContent = name;

  cardImage.addEventListener('click', () => {
    viewImageHandler({ link, name });
  });
  cardLikeButton.addEventListener('click', handleLikeCard);
  cardDeleteButton.addEventListener('click', handleDeleteCard);

  return card;
}

// render card or cards

function renderCard(cardValues) {
  if (Array.isArray(cardValues)) {
    cardValues.forEach((elem) => {
      cardsList.append(createCard(elem));
    });
  } else {
    cardsList.prepend(createCard(cardValues));
  }
}

// open popup

function openPopup(popup) {
  popup.classList.add('popup_opened');

  popup.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    }
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closePopup(popup);
    }
  });
}

// close popup

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// profile edit-button

function openProfilePopup() {
  openPopup(popupEditProfile);
  inputProfileName.value = profileName.textContent;
  inputProfileDescription.value = profileDescription.textContent;
  toggleButtonState(popupEditProfileInputs, editProfileSaveButton);
}

// popup edit-profile save-button

function handleProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileDescription.textContent = inputProfileDescription.value;
  closePopup(popupEditProfile);
}

// add-card button

function addButtonHandler() {
  openPopup(popupAddCard);
}

// popup add-card save-button

function openNewCardPopup(evt) {
  evt.preventDefault();
  const userCard = {
    name: inputCardHeading.value,
    link: inputCardImageLink.value,
  };

  renderCard(userCard);
  popupAddCardForm.reset();
  closePopup(popupAddCard);
}

// card's image

function viewImageHandler({ link, name }) {
  popupImage.src = link;
  popupImage.alt = name;
  popupImageCaption.textContent = name;

  openPopup(popupViewPicture);
}

// card's like-button

function handleLikeCard(evt) {
  evt.target.classList.toggle('card__like-icon_pressed');
}

// card's delete-button

function handleDeleteCard(evt) {
  evt.target.closest('.card').remove();
}

renderCard(initialCards);

profileEditButton.addEventListener('click', openProfilePopup);
popupEditProfileForm.addEventListener('submit', handleProfileSubmit);
profileAddButton.addEventListener('click', addButtonHandler);
popupAddCardForm.addEventListener('submit', openNewCardPopup);
popupCloseButtons.forEach((elem) => {
  elem.addEventListener('click', (evt) => {
    closePopup(evt.target.closest('.popup'));
  });
});
