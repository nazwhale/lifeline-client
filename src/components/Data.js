import React, { Component } from "react";

export default class Data extends Component {
  state = {
    apiResponse: "not yet"
  };

  componentDidMount() {
    this.callAPI();
  }

  callAPI() {
    fetch(`${process.env.REACT_APP_API_URL}`)
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }));
  }

  render() {
    const { apiResponse } = this.state;
    return <h3>{apiResponse}</h3>;
  }
}
