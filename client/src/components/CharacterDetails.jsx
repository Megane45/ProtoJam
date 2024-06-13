import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./CharacterDetails.css";

function Details() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    fetch("https://miadil.github.io/starwars-api/api/cardGames.json")
      .then((res) => res.json())
      .then((data) => {
        const foundCharacter = data.find(
          (elem) => elem.id === parseInt(id, 10)
        );
        setCharacter(foundCharacter || null);
      })
      .catch(() => setCharacter(null));
  }, [id]);

  return (
    <div className="character-details">
      {character ? (
        <div className="card">
          <img src={character.image} alt={character.name} />
          <div className="card-details">
            <h2>{character.name}</h2>
            <p>Age: {character.age}</p>
            <p>Height: {character.height}</p>
            <p>Mass: {character.mass}</p>
            <p>Gender: {character.gender}</p>
            <p>Species: {character.species}</p>
          </div>
        </div>
      ) : (
        <div>No character details available</div>
      )}
    </div>
  );
}

export default Details;
