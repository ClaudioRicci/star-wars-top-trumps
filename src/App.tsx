import React, { useState } from "react";
import axios from "axios";
import { setupCache } from "axios-cache-adapter";

export default function App() {
  // Store the characters in a state variable.
  // We are passing an empty array as the default value.
  let [characters, setCharacters] = useState([]);

  // The useEffect() hook fires any time that the component is rendered.
  // An empty array is passed as the second argument so that the effect only fires once.
  React.useEffect(() => {
    // We want to cache the data to improve performance. Create `axios-cache-adapter` instance
    const cache = setupCache({
      maxAge: 15 * 60 * 1000
    });
    // Create `axios` instance passing the newly created `cache.adapter`
    const api = axios.create({
      adapter: cache.adapter
    });
    api({
      url: "https://swapi.co/api/people/",
      method: "get"
    }).then(response => setCharacters(response.data));
  }, []);

  return (
    <div className="App">
      <h2>The JSON below is loaded from an external API!</h2>
      <code>{JSON.stringify(characters)}</code>
    </div>
  );
}
