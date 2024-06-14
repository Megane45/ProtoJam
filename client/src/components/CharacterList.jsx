import { useState, useEffect, useCallback } from "react";
import "./CharacterList.css";
import "./CharacterDetails.css";

function CharacterList() {
  const [genderFilter, setGenderFilter] = useState("");
  const [characters, setCharacters] = useState([]);
  const [currentCharacter, setCurrentCharacter] = useState(null);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [likedCharacters, setLikedCharacters] = useState([]);
  const [hearts, setHearts] = useState([]);

  const handleLikeCharacter = () => {
    const card = document.getElementById("character-card");
    card.classList.add("liked");

    // Ajouter le personnage actuel aux personnages aimés
    setLikedCharacters([...likedCharacters, currentCharacter]);
  };

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
    fetchCharacters();
  }, []);

  // Function to filter and choose random character
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

  // Effect to update character on filter change
  useEffect(() => {
    filterAndChooseRandomCharacter();
  }, [filterAndChooseRandomCharacter]);

  // Function to reset card styles
  const resetCard = () => {
    const card = document.getElementById("character-card");
    card.style.transition = "transform 0.3s ease, opacity 0.3s ease";
    card.style.transform = "";
    card.classList.remove("disliked", "liked");
  };
  setTimeout(() => {
    filterAndChooseRandomCharacter();
    resetCard();
  }, 300);

  // Function to handle liking a character
  const handleLikeCharacter = () => {
    const card = document.getElementById("character-card");
    card.classList.add("liked");

    setLikedCharacters([...likedCharacters, currentCharacter]);

    // Function to generate hearts animation
    const generateHearts = () => {
      const newHearts = Array.from({ length: 20 }, () => ({
        left: `${Math.random() * 100}%`, // Utilisation de template literals
        animationDelay: `${Math.random() * 10}s`, // Augmentation de la durée à 10 secondes
      }));
      setHearts(newHearts);
      setTimeout(() => {
        setHearts([]);
      }, 10000); // 10 secondes en millisecondes
    };

    const isMatch = Math.random() > 0.6;
    if (isMatch) {
      generateHearts();
    }

    setTimeout(() => {
      filterAndChooseRandomCharacter();
      resetCard();
    }, 300);
  };

  // Function to handle disliking a character
  const handleDislikeCharacter = () => {
    const card = document.getElementById("character-card");
    card.classList.add("disliked");
    setTimeout(() => {
      filterAndChooseRandomCharacter();
      resetCard();
    }, 300);
  };

  // Function to handle swipe start
  const handleSwipeStart = (e) => {
    setStartX(e.clientX || e.touches[0].clientX);
    setDragging(true);
    document.body.style.overflow = "hidden";
  };

  // Function to handle swipe move
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

  // Function to handle swipe end
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
      <div className="hearts-container">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="heart"
            style={{
              left: heart.left,
              animationDelay: heart.animationDelay,
            }}
          >
            ❤️
          </div>
        ))}
      </div>
      <div className="buttonUpList">
      <a href="/profile">
        <button type="button" id="goprofile">
        Profile
        </button>
      </a>
      <a href="/form">
        <button type="button" id="goprofile">
        Form
        </button>
      </a>
      <a href="/home">
        <button type="button" id="goprofile">
        Home
        </button>
      </a>
      </div>
      <div className="Dropdowns"> 
        <div>
          <label className="label1">
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
              <p>Size: {currentCharacter.height}</p>
              <p>Weight: {currentCharacter.mass}</p>
              <p>Hair color: {currentCharacter.hairColor}</p>
              <p>Eye color:{currentCharacter.eyeColor}</p>
              <p>Skin color:{currentCharacter.skinColor}</p>
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
      <h2 className="CharacterLiked">Characters You Liked</h2>
      <div className="liked-characters">
        {likedCharacters.map((character) => (
          <div key={character.name} className="liked-character-card">
            <img src={character.image} alt={character.name} />
            <p>{character.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CharacterList;
