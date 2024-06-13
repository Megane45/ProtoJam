import { useState, useEffect } from 'react';

import './CharacterList.css'

function CharacterList() {
  const [genderFilter, setGenderFilter] = useState(''); 
  const [characters, setCharacters] = useState([]);


  const fetchCharacters = async () => {
    try {
      const response = await fetch('https://miadil.github.io/starwars-api/api/all.json');
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
    <div className='ALLpageCatalog'>
      {}
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
        </select></label>
      </div>

      </div>
      <div className="image-grid">
        {characters 
          .filter((character) => {
            if (genderFilter && character.gender !== genderFilter) {
              return false;
            }
            return true;
          })
          .map((character) => (
            <img className='imageStarWars' key={character.id} src={character.image} alt={character.name} />
          ))}
      </div>
    </div>
  );
}

export default CharacterList;