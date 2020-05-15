import React from "react";
import Login from "./components/Login";
import Data from "./components/Data";

function App() {
  return (
    <div>
      <header>
        <h1>Lifeline</h1>
        <Data />
        <Login />
      </header>
    </div>
  );
}

export default App;
