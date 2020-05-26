import { fetchFromAPI } from "../helpers/apiHelpers.js";

const TOKEN_KEY = "lifeline_token";

export default class AuthService {
  login = email => {
    return fetchFromAPI("POST", "users/login", {
      body: JSON.stringify({
        email
      })
    }).then(response => {
      this.setToken(response.accessToken);
      return Promise.resolve(response);
    });
  };

  loggedIn() {
    return false;
    // const token = this.getToken();
    // return token !== null && this.isTokenExpired(token) === false;
  }

  setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  // TODO
  isTokenExpired(token) {
    return false;
  }
}
