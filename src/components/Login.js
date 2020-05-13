import React, { Component } from "react";
import styled from "styled-components";
import GoogleLogin from "react-google-login";
import { GoogleLogout } from "react-google-login";

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

  loginSuccess = response => {
    console.log("✅login success", response);
    this.setState({ userDetails: response.profileObj, loggedIn: true });
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
