import React, { Component } from "react";
import Login from "./components/Login";
import Header from "./components/Header";

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
    //
    // Pass auth into Header component so it can decide whether to render the
    // "sign out" button
    return (
      <div style={{ height: "inherit" }}>
        <Header />
        <Login setLoggedIn={this.setLoggedIn} />
      </div>
    );
  }
}
