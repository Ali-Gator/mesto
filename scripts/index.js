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

function renderCards(arrCards) {
  const cardTemplate = document.querySelector('#card').content;

  arrCards.forEach((elem) => {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardElementImage = cardElement.querySelector('.card__image');
    const cardElementHeading = cardElement.querySelector('.card__text');

    cardElementImage.src = elem.link;
    cardElementImage.alt = elem.alt;
    cardElementHeading.textContent = elem.name;

    cardsList.append(cardElement);
  });
}

renderCards(initialCards);

function openPopup(container) {
  popup.classList.add('popup_opened');
  container.classList.add('popup__container_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
  popupContainer.forEach((elem) => {
    elem.classList.remove('popup__container_opened');
  });
}

function editButtonHandler() {
  openPopup(popupEditProfileForm.parentElement);
  EditProfileNameInput.value = profileName.textContent;
  EditProfileDescriptionInput.value = profileDescription.textContent;
}

function saveButtonHandler(evt) {
  evt.preventDefault();
  profileName.textContent = EditProfileNameInput.value;
  profileDescription.textContent = EditProfileDescriptionInput.value;
  closePopup();
}

function addButtonHandler () {
  openPopup(popupAddCardForm.parentElement);
}

profileEditButton.addEventListener('click', editButtonHandler);
popupEditProfileForm.addEventListener('submit', saveButtonHandler);

profileAddButton.addEventListener('click', addButtonHandler);

popupCloseButtons.forEach((elem) => {
  elem.addEventListener('click', closePopup);
});
