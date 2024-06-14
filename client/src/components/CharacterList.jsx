import { useState, useEffect, useCallback } from "react";
import "./CharacterList.css";

function CharacterList() {
  const [genderFilter, setGenderFilter] = useState("");
  const [characters, setCharacters] = useState([]);
  const [currentCharacter, setCurrentCharacter] = useState(null);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [dragging, setDragging] = useState(false);

  const fetchCharacters = async () => {
    try {
      const response = await fetch(
        "https://miadil.github.io/starwars-api/api/all.json"
      );
      const data = await response.json();
      setCharacters(data);
      setCurrentCharacter(data[Math.floor(Math.random() * data.length)]);
    } catch (error) {
      console.error("Error fetching characters:", error);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  const filterAndChooseRandomCharacter = useCallback(() => {
    const filteredCharacters = characters.filter((character) => {
      if (genderFilter && character.gender !== genderFilter) {
        return false;
      }
      return true;
    });

    if (filteredCharacters.length > 0) {
      const randomCharacter =
        filteredCharacters[
          Math.floor(Math.random() * filteredCharacters.length)
        ];
      setCurrentCharacter(randomCharacter);
    } else {
      setCurrentCharacter(null);
    }
  }, [genderFilter, characters]);

  useEffect(() => {
    filterAndChooseRandomCharacter();
  }, [filterAndChooseRandomCharacter]);

  const resetCard = () => {
    const card = document.getElementById("character-card");
    card.style.transition = "transform 0.3s ease, opacity 0.3s ease";
    card.style.transform = "";
    card.classList.remove("disliked", "liked");
  };

  const handleLikeCharacter = () => {
    const card = document.getElementById("character-card");
    card.classList.add("liked");
    setTimeout(() => {
      filterAndChooseRandomCharacter();
      resetCard();
    }, 300);
  };

  const handleDislikeCharacter = () => {
    const card = document.getElementById("character-card");
    card.classList.add("disliked");
    setTimeout(() => {
      filterAndChooseRandomCharacter();
      resetCard();
    }, 300);
  };

  const handleSwipeStart = (e) => {
    setStartX(e.clientX || e.touches[0].clientX);
    setDragging(true);
    document.body.style.overflow = "hidden";
  };

  const handleSwipeMove = (e) => {
    if (!dragging) return;
    setCurrentX(e.clientX || e.touches[0].clientX);
    const translateX = currentX - startX;
    const card = document.getElementById("character-card");

    card.style.transform = `translateX(${translateX}px)`;

    if (translateX < -150) {
      card.classList.add("disliked");
    } else if (translateX > 150) {
      card.classList.add("liked");
    } else {
      card.classList.remove("disliked", "liked");
    }
  };

  const handleSwipeEnd = () => {
    if (!dragging) return;
    setDragging(false);
    document.body.style.overflow = "";

    const translateX = currentX - startX;

    if (translateX > 150) {
      handleLikeCharacter();
    } else if (translateX < -150) {
      handleDislikeCharacter();
    } else {
      resetCard();
    }
  };

  return (
    <div className="ALLpageCatalog">
      <a href="/profile">
        <button type="button" id="goprofile">
          Go to Profile
        </button>
      </a>
      <div className="Dropdowns">
        <div>
          <label>
            Gender
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
          <div
            className="card"
            id="character-card"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleSwipeStart(e);
              }
            }}
            onMouseDown={handleSwipeStart}
            onMouseMove={handleSwipeMove}
            onMouseUp={handleSwipeEnd}
            onTouchStart={handleSwipeStart}
            onTouchMove={handleSwipeMove}
            onTouchEnd={handleSwipeEnd}
          >
            <div className="card-left">
              <img
                className="imageStarWars"
                src={currentCharacter.image}
                alt={currentCharacter.name}
              />
              <h2>{currentCharacter.name}</h2>
            </div>
            <div className="card-right">
              <p>Taille : {currentCharacter.height}</p>
              <p>Poids : {currentCharacter.mass}</p>
              <p>Couleur des cheveux : {currentCharacter.hairColor}</p>
              <p>Couleur des yeux : {currentCharacter.eyeColor}</p>
              <p>Couleur de peau : {currentCharacter.skinColor}</p>
            </div>
            <div className="like-dislike-buttons">
              <button
                type="button"
                className="like-button"
                onClick={handleLikeCharacter}
              >
                <img src="./src/assets/images/like.png" alt="Like" />
              </button>
              <button
                type="button"
                className="dislike-button"
                onClick={handleDislikeCharacter}
              >
                <img src="./src/assets/images/deslike.png" alt="Dislike" />
              </button>
            </div>
          </div>
        ) : (
          <p>No character found</p>
        )}
      </div>
    </div>
  );
}

export default CharacterList;
