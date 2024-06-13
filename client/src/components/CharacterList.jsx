import { useState, useEffect } from 'react';

function CharacterList() {
  const [genderFilter, setGenderFilter] = useState(''); 
  const [speciesFilter, setSpeciesFilter] = useState(''); 
  const [characters, setCharacters] = useState([]);


  const fetchCharacters = async () => {
    try {
      const response = await fetch('https://miadil.github.io/starwars-api/api/cardGames.json');
      const data = await response.json();
      setCharacters(data); 
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  return (
    <div>
      {}
      <div>
        <label>Gender:
        <select
          value={genderFilter}
          onChange={(e) => setGenderFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select></label>
      </div>
      <div>
        <label>Species:
        <select
          value={speciesFilter}
          onChange={(e) => setSpeciesFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="human">Human</option>
          <option value="dathomirian zabrak">Dathomirian zabrak</option>
          <option value="neimoidian">neimoidian</option>
          <option value="yoda's species">yoda's species</option>
          <option value="hutt">hutt</option>
          <option value="rodian">rodian</option>
          <option value="wookiee">wookiee</option>
          <option value="rodian">droid</option>
        </select></label>
      </div>
      <div className="image-grid">
        {characters
          .filter((character) => {
            if (genderFilter && character.gender !== genderFilter) {
              return false;
            }
            if (speciesFilter && character.species !== speciesFilter) {
              return false;
            }
            return true;
          })
          .map((character) => (
            <img key={character.id} src={character.image} alt={character.name} />
          ))}
      </div>
    </div>
  );
}

export default CharacterList;