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

/* Questions:

  Is an AuthService class and withAuth HOC the way to go?
  Should I be using the Context API to store logged in status / user id /
  token?


  Which token to store?
    - is one of them a JWT?
    - could probably ignore the refresh_token for now
    - but could eventually reset their expiry

  Where to store the token?
    - local storage
      - encrypted + decrypted in frontend via JWT library (but would have to keep keys in sync)
      - encrypted + decrypted in backend via JWT library
      - https://dev.to/rdegges/please-stop-using-local-storage-1i04

    - first party cookies
      - not accessible through JSON
      - state of auth lives on server
      - cookie sent from server to frontend in response to login request in set cookie http header
      - further requests will then have the cookie in the headers
      - cookie could just have the session id
      - table in backend for sessions, user_id, expiry, invlaidated, max age
      - send with creditials (so gets cookies from domain)
      - can turn off document.cookie by using httpOnly flag when you set the cookie in the backend
      -
      - can act a bit weird on localhost
      -
      - github example?
      - articles?
          - MDN cookies
          - https://web.dev/samesite-cookies-explained/
          - https://adzerk.com/blog/chrome-samesite/
          - https://dev.to/rtfeldman/defense-against-the-dark-arts-csrf-attacks



    -

  What am I storing in local storage?
    - the access_token?
    - the refresh_token?
    - the id_token?

  Do I keep pinging the backend for the expires_in value? (and store it?)
  Or does /login return it along with the user data, and I set a timeout?
  Once that timeout is over, do I use the refresh_token somehow?
*/
