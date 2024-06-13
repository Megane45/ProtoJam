import "./Profile.css";

function Profile() {
  return (
    <section>
      <div className="profile-card">
        <img
          src="https://pics.craiyon.com/2023-10-13/3206a7b73cf34ec399ea009a3b72be66.webp"
          alt="Kael Varnix"
          className="profile-image"
        />
        <div className="profile-info">
          <h1>Name : Dark Zemmour</h1>
          <p>Spieces : Zabrak</p>
          <p>Sex : Inconnu</p>
          <p>Age : 1000</p>
          <p>Sexual orientation : Indéfini</p>
        </div>
      </div>
    </section>
  );
}

export default Profile;
