import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import { IInitialPlayerState } from "./interfaces";

export default function App() {
  const [player1] = useState<IInitialPlayerState>({
    name: "???",
    mass: 0,
    won: false,
    score: 0
  });
  const [player2] = useState<IInitialPlayerState>({
    name: "???",
    mass: 0,
    won: false,
    score: 0
  });
  const [loading, isLoading] = useState<boolean>(true);

  useEffect(() => {
    getCharacters();
  }, []);

  function newGame(): void {
    getCharacters();
  }

  function getCharacters(): Promise<void> {
    isLoading(true);
    return fetch("https://swapi.co/api/people/?format=json")
      .then(response => response.json())
      .then(json => {
        isLoading(false);
        const players = json.results;
        const newPlayer = players.map(player => [player.name, player.mass]);
        const randomPlayer1 =
          newPlayer[Math.floor(Math.random() * players.length)];
        const randomPlayer2 =
          newPlayer[Math.floor(Math.random() * players.length)];

        player1.name = randomPlayer1[0];
        player2.name = randomPlayer2[0];
        player1.mass = parseInt(randomPlayer1[1]);
        player2.mass = parseInt(randomPlayer2[1]);

        if (player1.mass > player2.mass) {
          player1.won = true;
          player2.won = false;
          player1.score++;
        }
        if (player2.mass > player1.mass) {
          player1.won = false;
          player2.won = true;
          player2.score++;
        }
        if (player1.mass === player2.mass) {
          player1.won = false;
          player2.won = false;
        }
      })
      .catch(error => {
        // Error handling
        isLoading(false);
        console.log(error);
      });
  }

  if (loading) {
    return (
      <Button variant="primary" disabled data-testid="loading">
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        LOADING...
      </Button>
    );
  }
  return (
    <section className="App">
      <h1>Star Wars Top Trumps</h1>
      <Button variant="success" type="submit" onClick={() => newGame()}>
        NEW GAME
      </Button>
      <h2>
        <Badge variant="success" pill>
          {player1.mass === player2.mass
            ? "DRAW"
            : player1.mass > player2.mass
            ? "PLAYER 1 WON"
            : "PLAYER 2 WON"}
        </Badge>
      </h2>
      <Card
        title={`Player 1: ${player1.name}`}
        bg="primary"
        text="white"
        style={{ width: "18rem" }}
      >
        <Card.Header>BIO: {player1.name}</Card.Header>
        <Card.Body>
          <Card.Text>MASS: {player1.mass}</Card.Text>
        </Card.Body>
      </Card>
      <Card
        title={`Player 2: ${player2.name}`}
        bg="primary"
        text="white"
        style={{ width: "18rem" }}
      >
        <Card.Header>BIO: {player2.name}</Card.Header>
        <Card.Body>
          <Card.Text>MASS: {player2.mass}</Card.Text>
        </Card.Body>
      </Card>
      <Card
        title="SCORECARD"
        bg="secondary"
        text="white"
        style={{ width: "18rem" }}
      >
        <Card.Body>
          <h3>
            <Badge variant="danger" pill>
              PLAYER 1 SCORE: {player1.score}
            </Badge>
            <Badge variant="success" pill>
              PLAYER 2 SCORE: {player2.score}
            </Badge>
          </h3>
        </Card.Body>
      </Card>
    </section>
  );
}
