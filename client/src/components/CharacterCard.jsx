import { Link } from "react-router-dom";

function CharacterCard({ character }) {
  return (
    <Link to={`/details/${character.id}`}>
      <img src={character.image} alt={character.name} />
    </Link>
  );
}

export default CharacterCard;
