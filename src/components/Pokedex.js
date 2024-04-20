import { useEffect, useState } from "react";
import "./Pokedex.css";

export default function Pokedex() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({});
  const [render, setRender] = useState(false);
  const [dexNumber, setDexNumber] = useState(null);

  useEffect(() => {
    if (dexNumber) {
      fetchPokemonById(dexNumber);
    }
  }, [dexNumber]);

  const fetchPokemonById = async (id) => {
    console.log("fetching pokemon by id");
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    setResults(data);
    setRender(true);
  };

  const search = async (e) => {
    console.log("searching...");
    e.preventDefault();
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
    const data = await response.json();
    console.log(data);
    setResults(data);
    setDexNumber(data.id);
    setRender(true);
  };

  function handleNextClick() {
    if (dexNumber < 1025) {
      setDexNumber(dexNumber + 1);
    }
  }

  function handlePreviousClick() {
    if (dexNumber > 1) {
      setDexNumber(dexNumber - 1);
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
      <PokedexItem pokemon={results} render={render} />
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
