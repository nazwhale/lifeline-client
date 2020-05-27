import React, { Component } from "react";
import { Link } from "react-router-dom";

import Header from "./components/Header";
import Experiences from "./components/experiences";

import { fetchFromAPI } from "./components/helpers/apiHelpers.js";
import queryString from "query-string";
import withAuth from "./components/login/withAuth";

export const UserContext = React.createContext({
  name: "Guest"
});

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
    const { signedInUser } = this.props;

    if (isLoading) {
      return <h2>loading...</h2>;
    }

    // Pass auth into Header component so it can decide whether to render the
    // "sign out" button
    //
    // consider Context.Provider
    // https://reactjs.org/docs/context.html#when-to-use-context
    return (
      <UserContext.Provider value={signedInUser}>
        <div style={{ height: "inherit" }}>
          <Header loggedIn={loggedIn} />
          {loggedIn ? (
            <>
              <p>Oh hey you logged in person you</p>
              <Experiences />
            </>
          ) : (
            <Link to="/login" style={{ textDecoration: "none" }}>
              <p>login</p>
            </Link>
          )}
        </div>
      </UserContext.Provider>
    );
  }
}

export default withAuth(App);
