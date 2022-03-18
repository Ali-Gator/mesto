import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(props) {
    super(props);
    this._image = this._element.querySelector('.popup__image');
    this._caption = this._element.querySelector('.popup__image-caption');
  }

  open({name, link}) {
    this._image.src = link;
    this._image.alt = name;
    this._caption.textContent = name;
    super.open();
  }
}

export default PopupWithImage;