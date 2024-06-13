import { useLoaderData } from "react-router-dom";

import Character from "../components/Character";

function CharacterList() {
  const characters = useLoaderData();

  return (
    <>
    <h1>Voici les personnes qui sont sur ta planète !</h1>
    <ul className="character-list" id="character-list">
      {characters.map((character) => (
        <li className="character-item" key={character.id}>
          <Character data={character} />
        </li>
      ))}

    </ul>
    </>
  )
}

export default CharacterList
