class Api {
  constructor({baseUrl, headers}) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  getInitialUser() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: this.headers
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`))
     // .then(user => user)
      .catch(err => console.log(err));
  }

  getInitialCards() {
  }
}

export default Api;