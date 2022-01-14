const $popup = document.querySelector('.popup');
const $popupForm = $popup.querySelector('.popup__container');
const $profileEditButton = document.querySelector('.profile__edit-button');

function editButtonHandler() {
  const $popupCloseButton = $popup.querySelector('.popup__close-button');
  let $nameInput = $popup.querySelector('.popup__text-input[name="username"]');
  let $descriptionInput = $popup.querySelector('.popup__text-input[name="description"]');
  let $profileName = document.querySelector('.profile__name');
  let $profileDescription = document.querySelector('.profile__description');

  $popup.classList.add('popup_opened');

  function closePopupHandler() {
    $popup.classList.remove('popup_opened');
  }

  $popupCloseButton.addEventListener('click', closePopupHandler);

  $nameInput.value = $profileName.textContent;
  $descriptionInput.value = $profileDescription.textContent;

  function saveButtonHandler(evt) {
    evt.preventDefault();
    $profileName.textContent = $nameInput.value;
    $profileDescription.textContent = $descriptionInput.value;
    $popup.classList.remove('popup_opened');
  }

  $popupForm.addEventListener('submit', saveButtonHandler);
}

$profileEditButton.addEventListener('click', editButtonHandler);
