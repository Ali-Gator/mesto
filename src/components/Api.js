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
      .catch(err => console.log(err));
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'GET',
      headers: this.headers
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`))
      .catch(err => console.log(err));
  }

  editProfile({name, about}) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({name, about})
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`))
      .catch(err => console.log(err));
  }
}

export default Api;