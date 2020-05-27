import React, { Component } from "react";

export default function withAuth(AuthComponent) {
  return class AuthWrapped extends Component {
    signedInUser = {
      id: 33,
      name: "billy",
      birthDate: "1991"
    };

    render() {
      return <AuthComponent signedInUser={this.signedInUser} />;
    }
  };
}
