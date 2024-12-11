import React, { useEffect, useRef, useState } from "react";
import leaflet from "leaflet";
import "leaflet/dist/leaflet.css";
import DeliveryAddressForm from "./DeliveryAddressForm";
import ConfirmModal from "./ConfirmModal";
import LocationPopupModal from "./LocationPopupModal";
import useLocalStorage from "../hooks/useLocalStorage";
import useGeolocation from "../hooks/useGeolocation";

export default function Map() {
  const mapRef = useRef(null);
  const userMarkerRef = useRef(null);
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);
  const [showLocationPopup, setShowLocationPopup] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [manualSearchInput, setManualSearchInput] = useState("");
  const [isManualSearch, setIsManualSearch] = useState(false);
  const [favorites, setFavorites] = useLocalStorage("FAVORITE_ADDRESSES", []);

  const [userPosition] = useLocalStorage("USER_MARKER", { latitude: 0, longitude: 0 });
  const location = useGeolocation();

  const fetchAddress = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );
      const data = await response.json();
      return data.display_name || "Address not found";
    } catch (error) {
      console.error("Error fetching address:", error);
      return "Error fetching address";
    }
  };

  const handleAddToFavorites = (address) => {
    if (!favorites.includes(address)) {
      setFavorites([...favorites, address]);
      alert("Address added to favorites!");
    } else {
      alert("Address is already in favorites.");
    }
  };

  const handleSaveFormData = (data) => {
    console.log("Saved address data:", data);
  };



  const handleLocateMe = async () => {
    if (!location.latitude || !location.longitude) {
      alert("Unable to fetch current location.");
      return;
    }

    setShowLocationPopup(false); 

    const address = await fetchAddress(location.latitude, location.longitude);
    setSelectedAddress(address);

    if (userMarkerRef.current) {
      mapRef.current.removeLayer(userMarkerRef.current);
    }

    userMarkerRef.current = leaflet
      .marker([location.latitude, location.longitude])
      .addTo(mapRef.current)
      .bindPopup("Your Location: " + address)
      .openPopup();

    mapRef.current.setView([location.latitude, location.longitude], 13);

    setRecentSearches((prevSearches) => [address, ...prevSearches.slice(0, 2)]);

    setTimeout(() => {
      setIsConfirmOpen(true);
    }, 2000);
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

          setIsConfirmOpen(true);
          setManualSearchInput("");
          setIsManualSearch(false);

          setPopupPosition("bottom-left");
        } else {
          console.log("Location not found.");
        }
      } catch (error) {
        console.error("Error during manual search:", error);
      }
    }
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => setIsLocationEnabled(true), 
        () => setIsLocationEnabled(false) 
      );
    } else {
      setIsLocationEnabled(false);
    }

    if (mapRef.current) return;

    const indiaCenter = [20.5937, 78.9629];
    mapRef.current = leaflet.map("map").setView(indiaCenter, 5);

    leaflet.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(mapRef.current);

    mapRef.current.on("click", async (e) => {
      const { lat: latitude, lng: longitude } = e.latlng;

      const address = await fetchAddress(latitude, longitude);
      setSelectedAddress(address);

      if (userMarkerRef.current) {
        mapRef.current.removeLayer(userMarkerRef.current);
      }

      userMarkerRef.current = leaflet
        .marker([latitude, longitude])
        .addTo(mapRef.current)
        .bindPopup(address)
        .openPopup();

      setRecentSearches((prevSearches) => [address, ...prevSearches.slice(0, 2)]);

      setIsConfirmOpen(true);
    });
  }, [userPosition]);

  return (
    <>
      {showLocationPopup && !isLocationEnabled && (
        <LocationPopupModal
          mapRef={mapRef}
          onSearchManually={() => {
            setShowLocationPopup(false); 
            setIsManualSearch(true); 
          }}
          isLocationEnabled={isLocationEnabled}
          setShowLocationPopup={setShowLocationPopup}
        />
      )}

      <div id="map" style={{ height: "100vh", width: "100%" }}></div>

      {isFormOpen && (
        <DeliveryAddressForm
          address={selectedAddress}
          recentSearches={recentSearches}
          onClose={() => setIsFormOpen(false)}
          onSave={handleSaveFormData}
          onAddToFavorites={handleAddToFavorites}
        />
      )}

      {isConfirmOpen && (
        <ConfirmModal
          address={selectedAddress}
          onConfirm={() => {
            setIsFormOpen(true);
            setIsConfirmOpen(false);
          }}
          onCancel={() => setIsConfirmOpen(false)}
        />
      )}

      {isFormOpen && (
        <DeliveryAddressForm
          address={selectedAddress}
          recentSearches={recentSearches}
          onClose={() => setIsFormOpen(false)}
        />
      )}

      {!isFormOpen && !isConfirmOpen && (
        <button
          onClick={handleLocateMe}
          style={{
            position: "absolute",
            bottom: "80px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: "1000",
            backgroundColor: "#FF0000",
            color: "black",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
          }}
        >
          Current Location
        </button>
      )}

      {isManualSearch && (
        <div className="manual-search-container">
          <input
            type="text"
            placeholder="Enter city or address"
            value={manualSearchInput}
            onChange={(e) => setManualSearchInput(e.target.value)}
          />
          <button onClick={handleManualSearch}>Search</button>
        </div>
      )}
    </>
  );
}
