import "./Profile.css"; // Assurez-vous d'importer votre fichier CSS ici

function Profile() {
  const playSound = () => {
    const audio = new Audio(
      "https://fr.itunemachine.com/audio/darth-vader-imperial-march-ringtone-645.mp3"
    );
    audio.play();
  };

  return (
    <section className="profileback">
      <div className="profile-card">
        <img
          src="https://pics.craiyon.com/2023-10-13/3206a7b73cf34ec399ea009a3b72be66.webp"
          alt="Kael Varnix"
          className="profile-image"
        />
        <div className="profile-info">
          <h1>Name : Dark Zemmour</h1>
          <p>Species : Zabrak</p>
          <p>Sex : Inconnu</p>
          <p>Age : 1000</p>
          <p>Sexual orientation : Indéfini</p>
        </div>
        <button className="zemmurbutkisskiss" type="button" onClick={playSound}>
          Futur Dark Vador
        </button>
        <a href="/">
          <button className="zemmurbutkisskiss" type="button" id="discover-btn">
            Retour à l'accueil
          </button>
        </a>
      </div>
    </section>
  );
}

export default Profile;
