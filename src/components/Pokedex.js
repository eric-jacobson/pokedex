import { useEffect, useState } from "react";
import "./Pokedex.css";

export default function Pokedex() {
  const [index, setIndex] = useState(0);
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/" + (index + 1))
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setPokemon(data);
      });
  }, [index]);

  // need some kind of check here to make sure we don't fall off the end
  function handleNextClick() {
    // if (index < urls.length - 1) {
    setIndex(index + 1);
    console.log("updated index to " + index);
    // }
  }

  function handlePreviousClick() {
    if (index > 0) {
      setIndex(index - 1);
      console.log("updated index to " + index);
    }
  }

  return (
    <>
      <div className="toolbar">
        <button className="button" onClick={handlePreviousClick}>
          Previous
        </button>
        <button className="button" onClick={handleNextClick}>
          Next
        </button>
      </div>
      <div className="pokedex">
        <img
          src={pokemon.sprites.other.home.front_default}
          alt={pokemon.name}
        />
        <div>
          <h1>{pokemon.name}</h1>
          <p>National Dex #: {pokemon.id}</p>
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
          <p>Base experience: {pokemon.base_experience}</p>
        </div>
      </div>
    </>
  );
}
