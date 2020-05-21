import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";
import GoogleLogin from "react-google-login";
import { GoogleLogout } from "react-google-login";
import { theme } from "../theme";
import gIcon from "../assets/gIcon.svg";

import Experiences from "./Experiences";

const Container = styled.div`
  height: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoginButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoggedInContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const GoogleIcon = styled.img`
  border-radius: 100%;
  margin-left: 0.5rem;
`;

const LoginButton = styled.button`
  position: relative;
  background-color: ${theme.color.primary};
  color: ${theme.color.white};

  &:hover {
    background-color: ${theme.color.primaryHover};
  }

  font-size: 16px;
  letter-spacing: 0.05rem;
  font-weight: 700;
  border-radius: 0.2rem;
  padding: 1rem 2rem;
  padding-left: 3.5rem;
  border: none;
  cursor: pointer;

  margin-top: 1rem;
`;

const LoginIcon = styled.img`
  position: absolute;
  height: 1rem;
  top: 17px;
  left: 30px;
`;

export default class Login extends Component {
  state = {
    googleUserDetails: {},
    getUserRsp: null,
    token: "",
    loggedIn: false
  };

  loginSuccess = async googleResponse => {
    console.log("✅ Google login success", googleResponse);
    const email = googleResponse.profileObj.email;
    const token = googleResponse.tokenId;

    await this.postLoginSuccess(token, email, googleResponse.googleId);

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

    const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    // {loggedIn && getUserRsp != null && (
    const imgUrl = googleUserDetails.imageUrl;

    return (
      <Container>
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
            <LoginButtonContainer>
              <h2 style={{ fontWeight: "normal" }}>Hello stranger</h2>
              <GoogleLogin
                clientId={googleClientId}
                buttonText="Sign in with Google"
                onSuccess={this.loginSuccess}
                onFailure={this.loginFailure}
                cookiePolicy={"single_host_origin"}
                render={renderProps => (
                  <LoginButton
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    <LoginIcon src={gIcon} alt="g icon " />
                    Sign in with Google
                  </LoginButton>
                )}
              />
            </LoginButtonContainer>
          </>
        )}
      </Container>
    );
  }
}
