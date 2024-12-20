
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
// Fix default marker icon issue in Leaflet
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [12, 41], // Adjust icon position on map
  });

  L.Marker.prototype.options.icon = DefaultIcon;
const Maps = () => {
    const [position, setPosition] = useState([0, 0]);

  // Function to update the map view dynamically
  const UpdateMapView = ({ coords }) => {
    const map = useMap();
    useEffect(() => {
      map.setView(coords, 13); // Set the map view to the new position
    }, [coords, map]);

    return null;
  };

  useEffect(() => {
    // Watch user's position
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
      },
      (err) => {
        console.error("Error getting location:", err);
      },
      { enableHighAccuracy: true }
    );

    // Cleanup on component unmount
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);



  return (
    <MapContainer
    center={position}
    zoom={13}
    style={{ height: "100vh", width: "100%" }}
  >
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    />
    <Marker position={position}></Marker>
    <UpdateMapView coords={position} />
  </MapContainer>
  )
}

export default Maps;
