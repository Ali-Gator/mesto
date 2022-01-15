const popup = document.querySelector('.popup');
const popupForm = popup.querySelector('.popup__container');
const profileEditButton = document.querySelector('.profile__edit-button');

function editButtonHandler(evt) {
  const popupCloseButton = popup.querySelector('.popup__close-button');
  const nameInput = popup.querySelector('.popup__text-input[name="username"]');
  const descriptionInput = popup.querySelector('.popup__text-input[name="description"]');
  const profileName = document.querySelector('.profile__name');
  const profileDescription = document.querySelector('.profile__description');

  evt.preventDefault();
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;

  function closePopupHandler(evt) {
    if (evt.target === evt.currentTarget || evt.target === popupCloseButton) {
      popup.classList.remove('popup_opened');
    }
  }

  popup.addEventListener('click', closePopupHandler);

  function saveButtonHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    popup.classList.remove('popup_opened');
  }

  popupForm.addEventListener('submit', saveButtonHandler);
}

profileEditButton.addEventListener('click', editButtonHandler);
