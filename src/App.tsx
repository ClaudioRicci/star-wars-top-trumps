import React, { useState, useEffect } from "react";
import { setupCache } from "axios-cache-adapter";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";

export default function App() {
  const [player1, setPlayer1] = useState({
    player1Name: "",
    player1Mass: 0,
    player1Won: false,
    player1Score: 0
  });
  const [player2, setPlayer2] = useState({
    player2Name: "",
    player2Mass: 0,
    player2Won: false,
    player2Score: 0
  });
  const [loading, isLoading] = useState(true);

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
        const randomPlayer1Mass = parseInt(randomPlayer1[1]);
        const randomPlayer2Mass = parseInt(randomPlayer2[1]);

        player1.player1Name = randomPlayer1Name;
        player2.player2Name = randomPlayer2Name;
        player1.player1Mass = randomPlayer1Mass;
        player2.player2Mass = randomPlayer2Mass;

        if (randomPlayer1Mass > randomPlayer2Mass) {
          player1.player1Won = true;
          player2.player2Won = false;
          player1.player1Score++;
        }
        if (randomPlayer2Mass > randomPlayer1Mass) {
          player1.player1Won = false;
          player2.player2Won = true;
          player2.player2Score++;
        }
        if (randomPlayer2Mass === randomPlayer1Mass) {
          player1.player1Won = false;
          player2.player2Won = false;
        }
      })
      .catch(error => {
        // Error handling
        isLoading(false);
      });
  }

  return (
    <section className="App">
      <>
        <h1>Star Wars Top Trumps</h1>
        <Button variant="success" onClick={() => newGame()}>
          NEW GAME
        </Button>
        <h2>
          <Badge variant="success" pill>
            {player1.player1Mass === player2.player2Mass
              ? "DRAW"
              : player1.player1Mass > player2.player2Mass
              ? "PLAYER 1 WON"
              : "PLAYER 2 WON"}
          </Badge>
        </h2>
        <Card
          title={`Player 1: ${player1.player1Name}`}
          bg="primary"
          text="white"
          style={{ width: "18rem" }}
        >
          <Card.Header>CHARACTER BIO: {player1.player1Name}</Card.Header>
          <Card.Body>
            <Card.Text>MASS: {player1.player1Mass}</Card.Text>
          </Card.Body>
        </Card>
        <Card
          title={`Player 2: ${player2.player2Name}`}
          bg="primary"
          text="white"
          style={{ width: "18rem" }}
        >
          <Card.Header>CHARACTER BIO: {player2.player2Name}</Card.Header>
          <Card.Body>
            <Card.Text>MASS: {player2.player2Mass}</Card.Text>
          </Card.Body>
        </Card>
        <h3>
          SCORE CARD:
          <Badge variant="light" pill>
            PLAYER 1 SCORE: {player1.player1Score}
          </Badge>
          <Badge variant="light" pill>
            PLAYER 2 SCORE: {player2.player2Score}
          </Badge>
        </h3>
      </>
    </section>
  );
}
