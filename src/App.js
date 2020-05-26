import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Header from "./components/Header";
import { fetchFromAPI } from "./components/helpers/apiHelpers.js";
import queryString from "query-string";
import { theme } from "./theme";
import gIcon from "./assets/gIcon.svg";
import Button from "./components/atoms/Button";
import withAuth from "./components/login/withAuth";
import AuthService from "./components/login/AuthService";

const Auth = new AuthService();

class App extends Component {
  state = {
    loggedIn: false,
    res: null,
    codeRes: null,
    isLoading: false
  };

  setLoggedIn = toSet => {
    this.setState({ loggedIn: toSet });
  };

  componentDidMount() {
    this.getUser();

    fetchFromAPI("GET", "google-url", {}, "")
      .then(res => this.setState({ res: res.data.googleLoginUrl }))
      .catch(function(error) {
        error = error.response;
      });
  }

  getUser() {
    const { code } = queryString.parse(window.location.search);
    const { loggedIn } = this.state;

    if (code == null || loggedIn) {
      return;
    }

    this.setState({ isLoading: true });

    fetchFromAPI("POST", "login", { code, login_type: "google" }, "")
      .then(res => this.setState({ codeRes: res.data, loggedIn: true }))
      .catch(function(error) {
        error = error.response;
      })
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    const { isLoading, loggedIn } = this.state;

    if (isLoading) {
      return <h2>loading...</h2>;
    }

    // Pass auth into Header component so it can decide whether to render the
    // "sign out" button
    return (
      <div style={{ height: "inherit" }}>
        <Header loggedIn={loggedIn} />
        {loggedIn ? (
          <p>Oh hey you logged in person you</p>
        ) : (
          <Link to="/login" style={{ textDecoration: "none" }}>
            <p>login</p>
          </Link>
        )}
      </div>
    );
  }
}

export default withAuth(App);
