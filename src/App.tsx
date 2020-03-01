import React, { useState, useEffect } from "react";
import axios from "axios";
import { setupCache } from "axios-cache-adapter";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import ProgressBar from "react-bootstrap/ProgressBar";

export default function App() {
  const [loading, isLoading] = useState(true);
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [people, setPeople] = useState([]);
  const [player1Won, setPlayer1Won] = useState(false);
  const [player2Won, setPlayer2Won] = useState(false);

  useEffect(() => {
    getCharacters();
  }, []);

  function replayGame() {
    getCharacters();
  }

  function getCharacters() {
    isLoading(true);
    return fetch("https://swapi.co/api/people/?format=json")
      .then(response => response.json())
      .then(json => {
        const newResults = json.results;

        const newPlayers = newResults.map(element => [
          element.name,
          element.mass
        ]);
        const newPlayer1 = newResults.map(element => [
          element.name,
          element.mass
        ]);
        const newPlayer2 = newResults.map(element => [
          element.name,
          element.mass
        ]);

        newPlayers.forEach((index, array) => {
          const randomPlayer1 =
            newPlayer1[Math.floor(Math.random() * newPlayer1.length)][0];
          const randomPlayer2 =
            newPlayer2[Math.floor(Math.random() * newPlayer2.length)][0];

          if (randomPlayer1 > randomPlayer2) {
            if (randomPlayer1 !== randomPlayer2) {
              console.log("Player 1 win");
              setPlayer1Won(true);
              setPlayer2Won(false);
            }
          }

          if (randomPlayer1 < randomPlayer2) {
            if (randomPlayer2 !== randomPlayer1) {
              console.log("Player 2 win");
              setPlayer1Won(false);
              setPlayer2Won(true);
            }
          } else {
            console.log("Reload game");
          }

          setPeople([]);
          isLoading(false);
          setPlayer1(randomPlayer1);
          setPlayer2(randomPlayer2);
        });
      })
      .catch(error => {
        // Error handling
        isLoading(false);
      });
  }

  // const { isLoading, player1, player2, player1Won, player2Won } = this.state;

  // if (isLoading) {
  //   return <h1>Currently loading...</h1>;
  // }

  return (
    <section className="App">
      <h1>Star Wars Top Trumps</h1>
      {isLoading ? (
        <ProgressBar striped variant="success" now={40} />
      ) : (
        <Card
          title={`Player 1: ${player1}`}
          bg="primary"
          text="white"
          style={{ width: "18rem" }}
        >
          <Card.Header>{player1}</Card.Header>
          <Card.Body>
            <Card.Title>Primary Card Title</Card.Title>
            <Card.Text>{player1Won === true ? "Player 1 Won" : null}</Card.Text>
          </Card.Body>
        </Card>
      )}
      <Card
        title={`Player 2: ${player2}`}
        bg="primary"
        text="white"
        style={{ width: "18rem" }}
      >
        <Card.Header>{player2}</Card.Header>
        <Card.Body>
          <Card.Title>Primary Card Title</Card.Title>
          <Card.Text>{player2Won === true ? "Player 2 Won" : null}</Card.Text>
        </Card.Body>
      </Card>

      <Button onClick={() => replayGame()}>Replay Game</Button>
    </section>
  );
}
