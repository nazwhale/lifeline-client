import React, { Component } from "react";
import styled from "styled-components";

export default class Data extends Component {
  state = {
    apiResponse: "not yet"
  };

  componentDidMount() {
    this.callAPI();
  }

  callAPI() {
    fetch("http://localhost:9000/testAPI")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }));
  }

  render() {
    const { apiResponse } = this.state;
    return <h3>{apiResponse}</h3>;
  }
}
