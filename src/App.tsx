import React, { useState, useEffect } from "react";
import axios from "axios";
import { setupCache } from "axios-cache-adapter";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";

export default function App() {
  const [loading, isLoading] = useState(true);
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");
  const [player1Mass, setPlayer1Mass] = useState(0);
  const [player2Mass, setPlayer2Mass] = useState(0);
  const [player1Won, setPlayer1Won] = useState(false);
  const [player2Won, setPlayer2Won] = useState(false);
  let [player1Score, setPlayer1Score]: any = useState(0);
  let [player2Score, setPlayer2Score]: any = useState(0);

  useEffect(() => {
    getCharacters();
  }, []);

  function newGame() {
    getCharacters();
  }

  function getCharacters() {
    isLoading(true);
    return fetch("https://swapi.co/api/people/?format=json")
      .then(response => response.json())
      .then(json => {
        isLoading(false);
        const players = json.results;
        const newPlayer1 = players.map(player => [player.name, player.mass]);
        const newPlayer2 = players.map(player => [player.name, player.mass]);
        const randomPlayer1 =
          newPlayer1[Math.floor(Math.random() * players.length)];
        const randomPlayer2 =
          newPlayer2[Math.floor(Math.random() * players.length)];
        const randomPlayer1Name = randomPlayer1[0];
        const randomPlayer2Name = randomPlayer2[0];
        const randomPlayer1Mass = randomPlayer1[1];
        const randomPlayer2Mass = randomPlayer2[1];

        setPlayer1Name(randomPlayer1Name);
        setPlayer2Name(randomPlayer2Name);
        setPlayer1Mass(randomPlayer1Mass);
        setPlayer2Mass(randomPlayer2Mass);

        if (randomPlayer1Mass > randomPlayer2Mass) {
          console.log("Player 1 mass wins");
          setPlayer1Won(true);
          setPlayer2Won(false);
          setPlayer1Score(player1Score++);
        }
        if (randomPlayer2Mass > randomPlayer1Mass) {
          console.log("Player 2 mass wins");
          setPlayer1Won(false);
          setPlayer2Won(true);
          setPlayer2Score(player2Score++);
        }
        if (randomPlayer2Mass === randomPlayer1Mass) {
          console.log("Draw");
          setPlayer1Won(false);
          setPlayer2Won(false);
        }
      })
      .catch(error => {
        // Error handling
        isLoading(false);
      });
  }

  return (
    <section className="App">
      <h1>Star Wars Top Trumps</h1>
      <>
        <Card
          title={`Player 1: ${player1Name}`}
          bg="primary"
          text="white"
          style={{ width: "18rem" }}
        >
          <Card.Header>{player1Name}</Card.Header>
          <Card.Body>
            <Card.Title>{player1Won ? "Player 1 Won" : null}</Card.Title>
            <Card.Text>Player 1 Mass: {player1Mass}</Card.Text>
            <h2>
              <Badge variant="light" pill>
                PLAYER 1 SCORE: {player1Score}
              </Badge>
            </h2>
          </Card.Body>
        </Card>
        <Card
          title={`Player 2: ${player2Name}`}
          bg="primary"
          text="white"
          style={{ width: "18rem" }}
        >
          <Card.Header>{player2Name}</Card.Header>
          <Card.Body>
            <Card.Title>{player2Won ? "Player 2 Won" : null}</Card.Title>
            <Card.Text>Player 2 Mass: {player2Mass}</Card.Text>
            <h2>
              <Badge variant="light" pill>
                PLAYER 2 SCORE: {player2Score}
              </Badge>
            </h2>
          </Card.Body>
        </Card>
      </>

      <Button variant="success" onClick={() => newGame()}>
        New Game
      </Button>
    </section>
  );
}
