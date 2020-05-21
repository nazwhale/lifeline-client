import React, { Component } from "react";
import Login from "./components/Login";

export default class App extends Component {
  state = {
    loggedIn: false
  };

  setLoggedIn = toSet => {
    console.log("isLog", toSet);
    this.setState({ loggedIn: toSet });
  };

  render() {
    // Consider a withAuth higher order component instead of state here
    return (
      <>
        <Login setLoggedIn={this.setLoggedIn} />
      </>
    );
  }
}
