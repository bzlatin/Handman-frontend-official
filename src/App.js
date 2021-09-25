import "./App.css";
import React, { useState } from "react";

function App() {
  const [usersGuess, setUsersGuess] = useState("");
  const [shownWord, setShownWord] = useState("");
  const [wrongGuess, setWrongGuess] = useState("");

  const guessLetter = () => {
    fetch(`http://localhost:8080/usersGuess/${usersGuess}`)
      .then((res) => {
        res.json().then((json) => {
          console.log(json);
          setShownWord(json.currentWord);
          if (json.correctGuess === false) {
            setWrongGuess(alert("You guessed an incorrect letter. Try again."));
          }
        });
      })
      .catch((err) => {
        console.log("error!", err);
      });
  };

  // Reset Input Field handler
  const resetInputField = () => {
    setUsersGuess("");
  };

  return (
    <div>
      <div>{wrongGuess}</div>
      <div>{shownWord}</div>
      <label>Guess a letter!</label>
      <input
        id="input-field"
        name="usersGuess"
        maxLength="1"
        type="text"
        value={usersGuess}
        onChange={(e) => {
          setUsersGuess(e.target.value);
        }}
      />
      <button
        className="btn"
        onClick={() => {
          guessLetter();
          resetInputField();
        }}
      >
        <span>Enter</span>
      </button>
    </div>
  );
}

export default App;
