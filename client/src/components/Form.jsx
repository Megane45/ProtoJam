import { useState } from "react";
import "./Form.css"; // Importer le fichier CSS

function Form() {
  // State variables to store form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    birthDate: "",
    species: "",
    planet: "",
  });

  // State variable to control modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Show modal thanking the user for registration
    setIsModalOpen(true);
    // Here you can handle form submission logic, e.g., sending data to backend
    // Reset form fields after submission if needed
    setFormData({
      name: "",
      email: "",
      birthDate: "",
      species: "",
      planet: "",
    });
  };

  // Function to close the modal
  return (
    <div className="bgZemmour">
      <div className="buttonDating">
        <a href="/">
          <button type="button" className="BUTTTTON">
            Start Dating Again
          </button>
        </a>
      </div>
      <div className="cardForm">
        <div className="card-title">Registration Form</div>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            📬
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            🎁
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            👽
            <select
              name="species"
              value={formData.species}
              onChange={handleChange}
              required
            >
              <option value="">Species</option>
              <option value="Human">Human</option>
              <option value="Droid">Droid</option>
              <option value="Wookie">Wookie</option>
              <option value="Rodian">Rodian</option>
              <option value="Hutt">Hutt</option>
              <option value="Trandoshan">Trandoshan</option>
              <option value="Mon calamari">Mon calamari</option>
              <option value="Ewok">Ewok</option>
              <option value="Neimoidian">Neimoidian</option>
              <option value="Gungan">Gungan</option>
              <option value="Toydarian">Toydarian</option>
            </select>
          </label>
          <label>
            🌌
            <select
              name="planet"
              value={formData.planet}
              onChange={handleChange}
              required
            >
              <option value="">Planet</option>
              <option value="Alderaan">Alderaan</option>
              <option value="Naboo">Naboo</option>
              <option value="Coruscant">Coruscant</option>
              <option value="Kamino">Kamino</option>
              <option value="Kashyyy">Kashyyy</option>
              <option value="Neimoidia">Neimoidia</option>
              <option value="Rodia">Rodia</option>
              <option value="Tatooine">Tatooine</option>
            </select>
          </label>
          <button type="submit">Submit</button>
        </form>
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>Merci de vous être inscrit sur le site !</h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Form;
