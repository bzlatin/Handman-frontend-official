import "./App.css";
import React, { useState } from "react";

function App() {
  const [usersGuess, setUsersGuess] = useState("");

  const guess = () => {
    fetch(`http://localhost:8080/usersGuess/${usersGuess}`)
      .then((res) => {
        res.text().then((text) => {
          console.log(text);
        });
      })
      .catch((err) => {
        console.log("error!", err);
      });
  };

  return (
    <div>
      <label>Guess a letter!</label>
      <input
        name="usersGuess"
        type="text"
        value={usersGuess}
        onChange={(e) => {
          setUsersGuess(e.target.value);
        }}
      />
      <button
        className="btn"
        onClick={() => {
          guess();
        }}
      >
        <span>Enter</span>
      </button>
    </div>
  );
}

export default App;
