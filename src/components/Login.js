import React, { Component } from "react";
import styled from "styled-components";
import GoogleLogin from "react-google-login";
import { GoogleLogout } from "react-google-login";
import { getISOTimestamp } from "../utils/helpers";

import axios from "axios";

const LoginButtonContainer = styled.div`
  margin-top: 1rem;
`;

const LoggedInContainer = styled.div`
  display: flex;
`;

export default class Login extends Component {
  state = {
    userDetails: {},
    loggedIn: false
  };

  loginSuccess = googleResponse => {
    console.log("✅ Google login success", googleResponse);
    const email = googleResponse.Qt.zu;

    const handleNewUserFunc = this.handleNewUser;
    const handleExistingUserFunc = this.handleExistingUser;

    // check if user in db
    axios
      .get("http://localhost:9000/api/get/user", {
        params: { email }
      })
      .then(function(rsp) {
        if (rsp.data.length === 0) {
          handleNewUserFunc(email);
        } else {
          handleExistingUserFunc(rsp.data[0].email);
        }
      });

    this.setState({ userDetails: googleResponse.profileObj, loggedIn: true });
  };

  handleNewUser = email => {
    const lastLogin = getISOTimestamp();

    // create a user in db
    console.log("💥 about to create new user for:", email, "at", lastLogin);
    axios
      .post("http://localhost:9000/api/post/user", {
        profile: { email, lastLogin }
      })
      .then(function(rsp) {
        console.log("✉️ post rsp", rsp);
      });
  };

  handleExistingUser = email => {
    console.log("👋 existing user:", email);

    const lastLogin = getISOTimestamp();
    console.log("updating db with lastLogin", email, lastLogin);

    axios
      .put("http://localhost:9000/api/put/user", {
        email,
        lastLogin
      })
      .then(function(rsp) {
        console.log("✉️ put rsp", rsp);
      });
  };

  loginFailure = response => {
    console.log("🔴login failure", response);
    this.setState({ loggedIn: false });
  };

  logoutSuccess = r => {
    console.log("✅logout success", r);
    this.setState({ loggedIn: false });
  };

  logoutFailure = r => {
    console.log("🔴logout failure", r);
  };

  render() {
    const { loggedIn, userDetails } = this.state;
    const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    return (
      <LoginButtonContainer>
        {loggedIn ? (
          <LoggedInContainer>
            <GoogleLogout
              clientId={googleClientId}
              buttonText="Sign out"
              onLogoutSuccess={this.logoutSuccess}
              onFailure={this.logoutFailure}
            />
            <p style={{ marginLeft: "1rem" }}>
              <span role="img" aria-label="wave">
                👋
              </span>
              Hi {userDetails.givenName}
            </p>
          </LoggedInContainer>
        ) : (
          <GoogleLogin
            clientId={googleClientId}
            buttonText="Sign in with Google"
            onSuccess={this.loginSuccess}
            onFailure={this.loginFailure}
            cookiePolicy={"single_host_origin"}
          />
        )}
      </LoginButtonContainer>
    );
  }
}
