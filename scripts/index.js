// ищем DOM-элементы по классам

const popup = document.querySelector('.popup');
const popupForm = popup.querySelector('.popup__form_edit-profile');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupCloseButton = popupForm.querySelector('.popup__close-button');
const nameInput = popup.querySelector('.popup__text-input_name');
const descriptionInput = popup.querySelector('.popup__text-input_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

function editButtonHandler(evt) {
  evt.preventDefault(); // т.к. элемент сделан ссылкой для правильной семантики и доступности, необходимо отключить поведение по умолчанию (о чем собственно было сказано в эталонной работе на прошлом вебинаре)
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
