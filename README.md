# Location-Address-Flow

Location-Address-Flow is a web-based application that allows users to search, select, and save delivery addresses seamlessly. Users can locate their current position, search manually for addresses, mark favorite locations, and manage delivery addresses effectively.

## Features

1. **Locate Me:**

   - Automatically fetch the user's current location using geolocation.
   - This feature works only if the GPS is enabled on the user's device. If GPS is off, users will see a popup prompting them to enable it before using the **Current Location** button.
   - Display the location on the map with a marker and an address popup.

2. **Manual Address Search:**

   - Search for addresses manually by entering location keywords.
   - Display the searched location on the map and update the address details.
   - Use the **Search Manually** button to activate this feature. Users can input city names or specific locations to pinpoint on the map.

3. **Address Form:**

   - Capture delivery details including house/flat/block number, apartment/road/area, and category (Home, Office, or Friends & Family).
   - Validate and save the address data.

4. **Recent Searches:**

   - Show the last three searched addresses for quick reference.

5. **Favorites:**

   - Add addresses to the favorites list for future use.

6. **Responsive Map Interface:**

   - Click anywhere on the map to select a location and fetch its address.
   - Interactive map features like zoom and pan.
   - The map includes **+** and **-** buttons at the upper-left corner for zooming in and out.

7. **Custom Hooks:**

   - `useGeolocation`: Fetch and update the user's geolocation.
   - `useLocalStorage`: Store and retrieve data persistently using local storage.

8. **Popups and Modals:**

   - Confirm address selection before saving.
   - Popup for enabling location services or manually searching for addresses.

## Installation

Follow these steps to set up the project locally:

1. **Clone the Repository:**

   ```bash
   git clone <repository_url>
   cd location-address-flow
   ```

2. **Install Dependencies:**
   Make sure you have Node.js and npm installed. Run:

   ```bash
   npm install
   ```

3. **Start the Application:**

   ```bash
   npm run dev
   ```

4. **Access the Application:**
   Open your browser and navigate to `http://localhost:3000`.

## Folder Structure

```
location-address-flow/
├── src/
│   ├── components/
│   │   ├── Map.jsx
│   │   ├── DeliveryAddressForm.jsx
│   │   ├── ConfirmModal.jsx
│   │   ├── LocationPopupModal.jsx
│   ├── hooks/
│   │   ├── useGeolocation.jsx
│   │   ├── useLocalStorage.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── index.js
├── public/
├── package.json
├── README.md
```

## Components

### 1. `Map.jsx`

- Handles map rendering using Leaflet.
- Fetches addresses based on geolocation or manual input.
- Manages recent searches and favorites.

### 2. `DeliveryAddressForm.jsx`

- A form to collect delivery address details.
- Allows saving data and adding the address to favorites.

### 3. `ConfirmModal.jsx`

- Displays a modal to confirm the selected address.

### 4. `LocationPopupModal.jsx`

- Prompts the user to enable location services or search manually.

## Custom Hooks

### 1. `useGeolocation.jsx`

- Fetches and updates the user's current geolocation.

### 2. `useLocalStorage.jsx`

- Simplifies usage of local storage for persistent state management.

## Usage

- Launch the application.
- Use the **Current Location** button to find your current location. Ensure GPS is enabled on your device.
- Search manually for addresses using the **Search Manually** option.
- Save addresses and mark them as favorites.
- Manage delivery details using the **Delivery Address Form**.
- Zoom in and out of the map using the **+** and **-** buttons at the upper-left corner of the map.

## Dependencies

- **React**: Frontend framework.
- **Leaflet**: Library for interactive maps.
- **Nominatim API**: Fetches address details from latitude and longitude.

## Credits

This project is built using the following technologies and APIs:

- [React.js](https://reactjs.org/)
- [Leaflet](https://leafletjs.com/)
- [OpenStreetMap](https://www.openstreetmap.org/)
- [Nominatim API](https://nominatim.org/)

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

-----------

