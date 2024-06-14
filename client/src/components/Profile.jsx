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
          <p>Sex : unknown</p>
          <p>Age : 1000</p>
          <p>Sexual orientation : undefined</p>
        </div>
        <button className="zemmurbutkisskiss" type="button" onClick={playSound}>
          Future Darth Vader
        </button>
        <a href="/">
          <button className="zemmurbutkisskiss" type="button" id="discover-btn">
            Homepage
          </button>
        </a>
      </div>
    </section>
  );
}

export default Profile;
