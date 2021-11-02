import "./App.css";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

function App() {
  const [usersGuess, setUsersGuess] = useState("");
  const [shownWord, setShownWord] = useState("");
  const [wrongGuess, setWrongGuess] = useState("");
  const [userWins, setUserWins] = useState("");

  useEffect(() => {
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
    //ADD A PROMISE
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
            setWrongGuess(alert("You guessed an incorrect letter. Try again."));
          }
          if (json.displayedWord === json.generatedWord) {
            setTimeout(function () {
              setUserWins(alert("Congrats 🥳 , You win!"));
            }, 50);
          }
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
          name="usersGuess"
          minLength="1"
          type="text"
          value={usersGuess}
          onChange={(e) => {
            setUsersGuess(e.target.value);
          }}
        />
        <button
          className="enter-button"
          disabled={true && !usersGuess}
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
          onClick={() => {
            newGame();
            usersData();
          }}
        >
          Restart
        </button>
      </header>
    </div>
  );
}

export default App;
