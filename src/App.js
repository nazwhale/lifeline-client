import React, { Component } from "react";
import Login from "./components/Login";
import styled from "styled-components";

const Header = styled.header``;

export default class App extends Component {
  state = {
    loggedIn: false
  };

  setLoggedIn = toSet => {
    console.log("isLog", toSet);
    this.setState({ loggedIn: toSet });
  };

  render() {
    return (
      <Header>
        <h1>Lifeline</h1>
        <Login setLoggedIn={this.setLoggedIn} />
      </Header>
    );
  }
}
