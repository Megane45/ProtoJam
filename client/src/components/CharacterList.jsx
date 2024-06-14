import { useState, useEffect, useCallback } from 'react';
import './CharacterList.css';

function CharacterList() {
  const [genderFilter, setGenderFilter] = useState(''); 
  const [characters, setCharacters] = useState([]);
  const [currentCharacter, setCurrentCharacter] = useState(null);

  const fetchCharacters = async () => {
    try {
      const response = await fetch('https://miadil.github.io/starwars-api/api/all.json');
      const data = await response.json();
      setCharacters(data); 
      setCurrentCharacter(data[Math.floor(Math.random() * data.length)]);
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  const filterAndChooseRandomCharacter = useCallback(() => {
    const filteredCharacters = characters.filter(character => {
      if (genderFilter && character.gender !== genderFilter) {
        return false;
      }
      return true;
    });

    if (filteredCharacters.length > 0) {
      const randomCharacter = filteredCharacters[Math.floor(Math.random() * filteredCharacters.length)];
      setCurrentCharacter(randomCharacter);
    } else {
      setCurrentCharacter(null);
    }
  }, [genderFilter, characters]);

  useEffect(() => {
    filterAndChooseRandomCharacter();
  }, [filterAndChooseRandomCharacter]);

  return (
    <div className='ALLpageCatalog'>
      <div className='Dropdowns'>
        <div>
          <label>Gender
            <select
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
            >
              <option value="">All</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>
        </div>
      </div>

      <div className="character-display">
        {currentCharacter ? (
          <div className="card">
            <div className="card-left">
              <img className='imageStarWars' src={currentCharacter.image} alt={currentCharacter.name} />
              <h2>{currentCharacter.name}</h2>
            </div>
            <div className="card-right">
              <p>Taille : {currentCharacter.height}</p>
              <p>Poids : {currentCharacter.mass}</p>
              <p>Couleur des cheveux : {currentCharacter.hairColor}</p>
              <p>Couleur des yeux : {currentCharacter.eyeColor}</p>
              <p>Couleur de peau : {currentCharacter.skinColor}</p>
            </div>
          </div>
        ) : (
          <p>No character found</p>
        )}
      </div>
      
      <div className="buttons">
        <button 
          type='button' 
          onClick={() => filterAndChooseRandomCharacter()} 
          className="btn-dislike" 
          aria-label="Next character"
        >
          Next Character
        </button>
      </div>
    </div>
  );
}

export default CharacterList;
