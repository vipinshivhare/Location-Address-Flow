
import React, { useState, useEffect, useRef } from "react";
import './LocationPopupModal.css';
import leaflet from "leaflet"; 

export default function LocationPopupModal({
  onSearchManually, 
  mapRef, 
  setIsConfirmOpen, 
  setSelectedAddress, 
  setRecentSearches,
  setShowLocationPopup
}) {
  const [manualSearchInput, setManualSearchInput] = useState("");
  const [showManualSearchInput, setShowManualSearchInput] = useState(false);
  const userMarkerRef = useRef(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => setIsLocationEnabled(true),
        () => setIsLocationEnabled(false)
      );
    }
  }, []);

  const handleEnableLocation = () => {
    alert("Please enable location services in your browser settings.");
  };

  const handleManualSearch = async () => {
    if (manualSearchInput.trim()) {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${manualSearchInput}&format=json&addressdetails=1&limit=1`
        );
        const data = await response.json();

        if (data && data.length > 0) {
          const { lat, lon, display_name } = data[0];

          if (mapRef.current) {
            if (userMarkerRef.current) {
              mapRef.current.removeLayer(userMarkerRef.current);
            }

            userMarkerRef.current = leaflet
              .marker([lat, lon])
              .addTo(mapRef.current)
              .bindPopup(`Manual Search: ${display_name}`)
              .openPopup();

            mapRef.current.setView([lat, lon], 13);

            setSelectedAddress(display_name);
            setRecentSearches((prevSearches) => [
              display_name,
              ...prevSearches.slice(0, 2),
            ]);

            onSearchManually();

            setIsConfirmOpen(true);
            setManualSearchInput(""); 
            setShowManualSearchInput(false);

            setShowLocationPopup(false); 
          }
        }
        else {
          alert("Location not found. Please try again.");
        }
      } 
        catch (error) {
        console.error("Error during manual search:", error);
        }
     } 
        else {
        alert("Please enter a valid location.");
        }
      };

  return (
    <div className="location-popup-modal">
      <div className="modal-content">
        <h3>Location Permission Off</h3>
        <p>Please enable location services or search manually.</p>
        <div className="modal-actions">
          <button onClick={handleEnableLocation}>Enable Location</button>
          <button onClick={() => setShowManualSearchInput(true)}>Search Manually</button>
          {showManualSearchInput && (
            <>
              <input
                type="text"
                placeholder="Enter city or address"
                value={manualSearchInput}
                onChange={(e) => setManualSearchInput(e.target.value)}
              />
              <button onClick={handleManualSearch}>Search</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
