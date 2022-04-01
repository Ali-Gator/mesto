class UserInfo {
  constructor({profileSelector, descriptionSelector, avatarSelector}) {
    this._profileNameEl = document.querySelector(profileSelector);
    this._descriptionEl = document.querySelector(descriptionSelector);
    this._imageEl = document.querySelector(avatarSelector);
    this._userInfo = {};
  }

  getUserInfo() {
    this._userInfo.name = this._profileNameEl.textContent;
    this._userInfo.description = this._descriptionEl.textContent;
    this._userInfo.avatar = this._imageEl.src;
    this._userInfo.id = this._ownUserId;
    return this._userInfo;
  }

  setUserInfo({name, description, avatar, ownUserId}) {
    this._profileNameEl.textContent = name;
    this._descriptionEl.textContent = description;
    this._imageEl.src = avatar;
    this._ownUserId = ownUserId;
  }

}

export default UserInfo;