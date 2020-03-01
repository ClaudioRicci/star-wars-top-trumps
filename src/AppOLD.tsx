import React, { useState, useEffect } from "react";
import axios from "axios";
import { setupCache } from "axios-cache-adapter";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";

export default function App() {
  // Store the characters in a state variable.
  // We are passing an empty array as the default value.
  const [characters, setCharacters] = useState([]);
  const [isLoading, setLoading] = useState(false);

  React.useEffect(() => {
    // We want to cache the data to improve performance. Create `axios-cache-adapter` instance
    const cache = setupCache({
      maxAge: 15 * 60 * 1000
    });
    // Create `axios` instance passing the newly created `cache.adapter`
    const api = axios.create({
      adapter: cache.adapter
    });
    if (!isLoading) {
      api({
        url: "https://swapi.co/api/people/?format=json",
        method: "get"
      })
        .then(response => {
          const characterData = response.data.results;
          setCharacters(characterData);
          setLoading(false);
        })
        .catch(err => console.log(err));
    }
  }, [isLoading]);

  const handleClick = () => setLoading(true);

  return (
    <div className="App">
      <Button
        size="lg"
        variant="success"
        disabled={isLoading}
        onClick={!isLoading ? handleClick : undefined}
      >
        {isLoading ? "Loading Cards…" : "Play Game"}
      </Button>

      <CardDeck>
        <Card>
          <Card.Img variant="top" src="holder.js/100px160" />
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>
              <ul>
                {characters.map(character => (
                  <li key={character[name]}>{character[name]}</li>
                ))}
              </ul>
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Img variant="top" src="holder.js/100px160" />
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>
              This card has supporting text below as a natural lead-in to
              additional content.{" "}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
      </CardDeck>

      <code>{JSON.stringify(characters)}</code>
    </div>
  );
}
