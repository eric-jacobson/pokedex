import { useState } from "react";
import "./Pokedex.css";

export default function Pokedex() {
  const [index, setIndex] = useState(0);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({});
  const [render, setRender] = useState(false);

  const search = async (e) => {
    e.preventDefault();
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
    const data = await response.json();
    console.log(data);
    setResults(data);
    setRender(true);
  };

  // need some kind of check here to make sure we don't fall off the end
  function handleNextClick() {
    // if (index < urls.length - 1) {
    // setIndex(index + 1);
    console.log("updated index to " + index);
    // }
  }

  function handlePreviousClick() {
    if (index > 0) {
      // setIndex(index - 1);
      console.log("updated index to " + index);
    }
  }

  return (
    <>
      <div className="pokedex">
        <form onSubmit={search}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="toolbar">
        <button className="button" onClick={handlePreviousClick}>
          Previous
        </button>
        <button className="button" onClick={handleNextClick}>
          Next
        </button>
      </div>
      {render && <PokedexItem pokemon={results} render={render} />}
    </>
  );
}

function PokedexItem({ pokemon, render }) {
  console.log(pokemon);
  if (!render) {
    return null;
  } else {
    return (
      <div className="pokedex">
        <img
          src={pokemon.sprites.other.home.front_default}
          alt={pokemon.name}
        />
        <div>
          <h1>
            {pokemon.id}: {pokemon.name}
          </h1>
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
          <p>Base experience: {pokemon.base_experience}</p>
        </div>
      </div>
    );
  }
}
