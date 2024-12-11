 import React, { useState } from "react";
import './DeliveryAddressForm.css';

export default function DeliveryAddressForm({address, recentSearches,onClose,onSave,onAddToFavorites}){
  const [formData, setFormData] = useState({
    house: "",
    apartment: "",
    category: "Home", 
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSave = () => {
    if (validateAddress(formData)) {
      onSave(formData);
      onClose();
    } else {
      alert("Please fill in all required fields.");
    }
  };

  const validateAddress = (data) => {
    return data.house.trim() !== "" && data.apartment.trim() !== "";
  };



  return (
    <div className="delivery-form-container">
      <div className="delivery-form">
        <h3>Delivery Address</h3>
        <p>
          <strong>Current Address:</strong> {address}</p>

        <label>
          House/Flat/Block No.:
          <input
            type="text"
            name="house"
            value={formData.house}
            onChange={handleChange}
            required
            placeholder="Type Here..."
          />
        </label>

        <label>
          Apartment/Road/Area:
          <input
            type="text"
            name="apartment"
            value={formData.apartment}
            onChange={handleChange}
            required
            placeholder="Type Here..."
          />
        </label>

        <div className="category-selection">
          <p>Save as:</p>
          <button
            className={formData.category === "Home" ? "selected" : ""}
            onClick={() => setFormData({ ...formData, category: "Home" })}
          >
            🏠 Home
          </button>
          <button
            className={formData.category === "Office" ? "selected" : ""}
            onClick={() => setFormData({ ...formData, category: "Office" })}
          >
            🏢 Office
          </button>
          <button
            className={formData.category === "Friends" ? "selected" : ""}
            onClick={() => setFormData({ ...formData, category: "Friends" })}
          >
            👨‍👩‍👧‍👦 Friends & Family
          </button>
        </div>

        <div className="recent-searches">
          <h3>Recent Searches:</h3>
          <ul>
            {recentSearches.slice(-3).map((search, index) => (
              <li key={index}>{search}</li>
            ))}
          </ul>
        </div>

        <div className="form-actions">
          <button onClick={handleSave}>Save</button>
          <button onClick={() => onAddToFavorites(address)}>Save as Favorite</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

