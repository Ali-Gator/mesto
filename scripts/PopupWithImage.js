import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(props) {
    super(props);
  }

  open({name, link}) {
    const image = document.querySelector('.popup__image');
    const caption = document.querySelector('.popup__image-caption');
    image.src = link;
    image.alt = name;
    caption.textContent = name;
    super.open();
  }
}

export default PopupWithImage;