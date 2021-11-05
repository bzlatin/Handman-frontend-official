import "./App.css";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

function App() {
  const [usersGuess, setUsersGuess] = useState("");
  const [shownWord, setShownWord] = useState("");
  const [wrongGuess, setWrongGuess] = useState("");
  const [userWins, setUserWins] = useState("");
  const [shownNumOfLives, setShownNumOfLives] = useState("");

  useEffect(() => {
    usersData();

    const socket = io("http://localhost:8080", {
      transports: ["websocket"],
    });

    socket.on("new-guess", (data) => {
      usersData();
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const guessLetter = () => {
    //ADD A PROMISE??
    fetch(`http://localhost:8080/usersGuess/${usersGuess}`)
      .then((res) => {
        res.json().then((text) => {
          console.log(text);
        });
      })
      .catch((err) => {
        console.log("error!", err);
      });
  };

  const usersData = () => {
    fetch(`http://localhost:8080/usersData`)
      .then((res) => {
        res.json().then((json) => {
          setShownWord(json.displayedWord);
          if (json.correctGuess === false) {
            setWrongGuess(
              console.log("You guessed an incorrect letter. Try again.")
            );
          }
          if (json.displayedWord === json.generatedWord) {
            setTimeout(function () {
              setUserWins(console.log("Congrats 🥳 , You win!"));
            }, 50);
          }
          if (json.guessCount % 2 === 0) {
            // Make user 1 only be able to guess
          } else {
            // Make user 2 only be able to guess
          }
          setShownNumOfLives(json.numberOfLives);
        });
      })
      .catch((err) => {
        console.log("error!", err);
      });
  };

  const newGame = () => {
    fetch(`http://localhost:8080/usersData/newGame`)
      .then((res) => {
        res.json().then((text) => {
          console.log(text);
        });
      })
      .catch((err) => {
        console.log("error!", err);
      });
  };
  console.log(shownNumOfLives);

  // Reset Input Field handler
  const resetInputField = () => {
    setUsersGuess("");
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>{userWins}</div>
        <div>{wrongGuess}</div>
        <div className="shown-word">{shownWord}</div>
        <label className="label">Guess a letter!</label>
        <input
          className="input"
          name="usersGuess"
          minLength="1"
          maxLength="1"
          type="text"
          value={usersGuess}
          onChange={(e) => {
            setUsersGuess(e.target.value);
          }}
        />
        <button
          className="enter-button"
          disabled={(true && !usersGuess) || shownNumOfLives === 0}
          type="submit"
          onClick={() => {
            guessLetter();
            usersData();
            resetInputField();
          }}
        >
          <span>Enter</span>
        </button>
        <button
          className="restart-button"
          onClick={() => {
            newGame();
            usersData();
          }}
        >
          Restart Game
        </button>
        <h2 className="lives-left"> Lives left: {shownNumOfLives}</h2>
      </header>
    </div>
  );
}

export default App;
