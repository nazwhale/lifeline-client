import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import { GoogleLogout } from "react-google-login";

export default class Login extends Component {
  state = {
    userDetails: {},
    loggedIn: false
  };

  loginSuccess = response => {
    console.log("login success ✅", response);
    this.setState({ userDetails: response.profileObj, loggedIn: true });
  };

  loginFailure = response => {
    console.log("login failure 🔴", response);
    this.setState({ loggedIn: false });
  };

  logoutSuccess = r => {
    console.log("logout success ✅", r);
    this.setState({ loggedIn: false });
  };

  logoutFailure = r => {
    console.log("logout failure 🔴", r);
  };

  render() {
    console.log(this.state);
    const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    return (
      <div>
        <GoogleLogin
          clientId={googleClientId}
          buttonText="Sign in with Google"
          onSuccess={this.loginSuccess}
          onFailure={this.loginFailure}
          cookiePolicy={"single_host_origin"}
        />
        <GoogleLogout
          clientId={googleClientId}
          buttonText="Logout"
          onLogoutSuccess={this.logoutSuccess}
          onFailure={this.logoutFailure}
        />
      </div>
    );
  }
}
