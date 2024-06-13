import { useState, useEffect } from 'react';

function ImageGallery() {
  const [genderFilter, setGenderFilter] = useState(''); 
  const [speciesFilter, setSpeciesFilter] = useState(''); 
  const [images, setImages] = useState([]);


  const fetchImages = async () => {
    try {
      const response = await fetch('https://miadil.github.io/starwars-api/api/cardGames.json');
      const data = await response.json();
      setImages(data); 
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  useEffect(() => {
    fetchImages();
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
        {images
          .filter((image) => {
            if (genderFilter && image.gender !== genderFilter) {
              return false;
            }
            if (speciesFilter && image.species !== speciesFilter) {
              return false;
            }
            return true;
          })
          .map((image) => (
            <img key={image.id} src={image.image} alt={image.name} />
          ))}
      </div>
    </div>
  );
}

export default ImageGallery;