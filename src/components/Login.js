import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";
import GoogleLogin from "react-google-login";
import { GoogleLogout } from "react-google-login";

import Experiences from "./Experiences";

const LoginButtonContainer = styled.div`
  margin-top: 1rem;
`;

const LoggedInContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const GoogleIcon = styled.img`
  height: 3rem;
  border-radius: 100%;
  margin-left: 1rem;
`;

export default class Login extends Component {
  state = {
    googleUserDetails: {},
    getUserRsp: null,
    token: "",
    loggedIn: false
  };

  loginSuccess = async googleResponse => {
    const { setLoggedIn } = this.props;

    console.log("✅ Google login success", googleResponse);
    const email = googleResponse.Qt.zu;
    const token = googleResponse.tokenId;

    await this.postLoginSuccess(token, email, googleResponse.googleId);

    // setLoggedIn(true);

    this.setState({
      googleUserDetails: googleResponse.profileObj,
      token,
      loggedIn: true
    });
  };

  async postLoginSuccess(token, email, googleId) {
    let getUserRsp = {};
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/users/login`,
        {
          profile: { email },
          login_info: { login_type: "google", external_login_id: googleId }
        },
        {
          headers: { Authorization: token }
        }
      )
      .then(function(rsp) {
        getUserRsp = rsp.data;
      })
      .catch(function(error) {
        getUserRsp = error.response;
      })
      .then(res => this.setState({ getUserRsp }));
  }

  loginFailure = response => {
    console.log("🔴Google login failure", response);
    this.setState({ loggedIn: false });
  };

  logoutSuccess = r => {
    console.log("✅Google logout success", r);
    this.setState({ loggedIn: false });
  };

  logoutFailure = r => {
    console.log("🔴Google logout failure", r);
  };

  render() {
    const { loggedIn, googleUserDetails, getUserRsp, token } = this.state;

    console.log(getUserRsp);
    const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    // {loggedIn && getUserRsp != null && (
    const imgUrl = googleUserDetails.imageUrl;

    return (
      <>
        {loggedIn === true && getUserRsp != null ? (
          <>
            <LoggedInContainer>
              <GoogleLogout
                clientId={googleClientId}
                buttonText="Sign out"
                onLogoutSuccess={this.logoutSuccess}
                onFailure={this.logoutFailure}
              />
              <GoogleIcon src={imgUrl} />
            </LoggedInContainer>
            <Experiences
              token={token}
              userId={getUserRsp.id}
              birthDate="1992-01-01"
            />
          </>
        ) : (
          <>
            <h2>Login</h2>
            <LoginButtonContainer>
              <GoogleLogin
                clientId={googleClientId}
                buttonText="Sign in with Google"
                onSuccess={this.loginSuccess}
                onFailure={this.loginFailure}
                cookiePolicy={"single_host_origin"}
              />
            </LoginButtonContainer>

            <h3>Response</h3>
            <pre>{JSON.stringify(getUserRsp, null, 2)}</pre>
          </>
        )}
      </>
    );
  }
}
