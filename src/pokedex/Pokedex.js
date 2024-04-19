import { useState } from "react";
import { urls } from "./data";
import "./Pokedex.css";

export default function Pokedex() {
  const [index, setIndex] = useState(0);

  function handleNextClick() {
    if (index < urls.length - 1) {
      setIndex(index + 1);
      console.log("updated index to " + index);
    }
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
        <h2>{urls[index].name}</h2>
        <img src={urls[index].url} alt={urls[index].name} />
      </div>
    </>
  );
}
