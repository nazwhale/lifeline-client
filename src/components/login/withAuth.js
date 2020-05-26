import React, { Component } from "react";

export default function withAuth(AuthComponent) {
  return class AuthWrapped extends Component {
    render() {
      return <AuthComponent user="billy" />;
    }
  };
}
