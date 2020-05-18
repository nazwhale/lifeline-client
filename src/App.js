import React from "react";
import Login from "./components/Login";
import Experiences from "./components/Experiences";

function App() {
  return (
    <div>
      <header>
        <h1>Lifeline</h1>
        <Login />
        <Experiences />
      </header>
    </div>
  );
}

export default App;
