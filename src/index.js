import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import WebFont from "webfontloader";

import "./theme/index.css";
import App from "./App";
import Login from "./components/login/Login";

import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <Router style={{ height: "inherit" }}>
      <div style={{ height: "inherit" }}>
        <Route exact path="/" component={App} />
        <Route exact path="/login" component={Login} />
      </div>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

/*
  If you want your app to work offline and load faster, you can change
  unregister() to register() below. Note this comes with some pitfalls.
  Learn more about service workers: https://bit.ly/CRA-PWA
*/

serviceWorker.unregister();

/*
  Load fonts
*/

WebFont.load({
  google: {
    families: ["Titillium Web:300,400,700", "sans-serif"]
  }
});
