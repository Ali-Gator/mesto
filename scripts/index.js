const popup = document.querySelector('.popup');
const popupForm = popup.querySelector('.popup__form_edit-profile');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupCloseButton = popupForm.querySelector('.popup__close-button');
const nameInput = popup.querySelector('#name-field');
const descriptionInput = popup.querySelector('#description-field');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

function editButtonHandler() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function saveButtonHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup();
}

profileEditButton.addEventListener('click', editButtonHandler);
popupCloseButton.addEventListener('click', closePopup);
popupForm.addEventListener('submit', saveButtonHandler);
