import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import gIcon from "../../assets/gIcon.svg";
import { fetchFromAPI } from "../helpers/apiHelpers.js";
import AuthService from "./AuthService";
import Button from "../atoms/Button";

const Auth = new AuthService();

const Container = styled.div`
  height: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoginIcon = styled.img`
  position: absolute;
  height: 1rem;
  top: 17px;
  left: 30px;
`;

export default class Login extends Component {
  state = {
    res: null
  };

  componentWillMount() {
    if (Auth.loggedIn()) this.props.history.replace("/");
  }

  componentDidMount() {
    fetchFromAPI("GET", "google-url", {}, "")
      .then(res => this.setState({ res: res.data.googleLoginUrl }))
      .catch(function(error) {
        error = error.response;
      });
  }

  render() {
    return (
      <Container>
        <h1>Log in to lifeline</h1>{" "}
        <a href={this.state.res} onClick={this.login}>
          <Button hasIcon={true} marginTop="1rem">
            <LoginIcon src={gIcon} alt="g icon " />
            Log in with Google
          </Button>
        </a>
        <Link to="/" style={{ textDecoration: "none" }}>
          <p>I'm new here</p>
        </Link>
      </Container>
    );
  }
}
