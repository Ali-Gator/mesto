const popup = document.querySelector('.popup');
const popupEditProfileForm = popup.querySelector('.popup__form_edit-profile');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupEditProfileCloseButton = popupEditProfileForm.querySelector('.popup__close-button');
const EditProfileNameInput = popupEditProfileForm.querySelector('#name-field');
const EditProfileDescriptionInput = popupEditProfileForm.querySelector('#description-field');
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

function openPopup() {
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function editButtonHandler() {
  openPopup();
  EditProfileNameInput.value = profileName.textContent;
  EditProfileDescriptionInput.value = profileDescription.textContent;
}

function saveButtonHandler(evt) {
  evt.preventDefault();
  profileName.textContent = EditProfileNameInput.value;
  profileDescription.textContent = EditProfileDescriptionInput.value;
  closePopup();
}

profileEditButton.addEventListener('click', editButtonHandler);
popupEditProfileForm.addEventListener('submit', saveButtonHandler);
popupEditProfileCloseButton.addEventListener('click', closePopup);
