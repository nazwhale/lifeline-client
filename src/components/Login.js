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

// TODO: add auth headers to all requests
// perhaps abstract this into an api.js util
export default class Login extends Component {
  state = {
    userDetails: {},
    getUserRsp: {},
    loggedIn: false
  };

  loginSuccess = async googleResponse => {
    console.log("✅ Google login success", googleResponse);
    const email = googleResponse.Qt.zu;
    const token = googleResponse.tokenId;

    const handleNewUserFunc = this.handleNewUser;
    const handleExistingUserFunc = this.handleExistingUser;

    await this.getUser(email, token, handleExistingUserFunc, handleNewUserFunc);

    this.setState({
      userDetails: googleResponse.profileObj,
      loggedIn: true
    });
  };

  async getUser(email, token, handleExistingUserFunc, handleNewUserFunc) {
    let getUserRsp;
    axios
      .get(`${process.env.REACT_APP_API_URL}/user`, {
        params: { email },
        headers: { Authorization: token }
      })
      .then(function(rsp) {
        // if successful, write data to state
        console.log("get rsp:", rsp);
        getUserRsp = rsp.data[0];
        handleExistingUserFunc(rsp.data[0].email);
      })
      .catch(function(error) {
        if (error.response.data.code === "user_not_found") {
          console.log("🤷‍♂️", error.response.data.name);
          getUserRsp = error.response;
          handleNewUserFunc(email);
        } else {
          console.log(error.response);
          getUserRsp = error.response;
        }
      })
      .then(res => this.setState({ getUserRsp }));
  }

  handleNewUser = email => {
    const lastLogin = getISOTimestamp();

    // create a user in db
    console.log("💥 about to create new user for:", email, "at", lastLogin);
    axios
      .post(`${process.env.REACT_APP_API_URL}/user`, {
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
      .put(`${process.env.REACT_APP_API_URL}/user`, {
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
    const { loggedIn, userDetails, getUserRsp } = this.state;
    const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

    return (
      <>
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
        <h3>get user response</h3>
        <pre>{JSON.stringify(getUserRsp, null, 2)}</pre>
      </>
    );
  }
}
