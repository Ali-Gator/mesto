class UserInfo {
  constructor({profileSelector, descriptionSelector}) {
    this._profileNameEl = document.querySelector(profileSelector);
    this._descriptionEl = document.querySelector(descriptionSelector);
    this._userInfo = {};
  }

  getUserInfo() {
    this._userInfo.name = this._profileNameEl.textContent;
    this._userInfo.description = this._descriptionEl.textContent;
    return this._userInfo;
  }

  setUserInfo({name, description}){
    this._profileNameEl.textContent = name;
    this._descriptionEl.textContent = description;
  }
}

export default UserInfo;