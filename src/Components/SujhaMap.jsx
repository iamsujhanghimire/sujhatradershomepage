import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
library.add(faPaperPlane);

// Create custom icon
const customIcon = new L.Icon({
  iconUrl: markerIconPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: markerShadowPng,
  shadowSize: [41, 41],
});

function SujhaMap() {
  const position = [27.738017, 85.320076];

  return (
    <div className="map-container h-80 w-full flex flex-col">
      <MapContainer
        center={position}
        zoom={17}
        scrollWheelZoom={false}
        className="h-full w-full mb-2"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position} icon={customIcon}>
          <Popup>
            Sujha Traders and Exports <br /> Tokha Road, Kathmandu, Nepal <br />
          </Popup>
        </Marker>
      </MapContainer>
      <a
        href={`https://www.google.com/maps/dir/?api=1&destination=${position[0]},${position[1]}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-Primary text-White py-2 px-4 rounded-3xl w-fit mx-auto"
      >
        Get Directions
        <span>
          <FontAwesomeIcon icon={faPaperPlane} className="px-2" />
        </span>
      </a>
    </div>
  );
}

export default SujhaMap;
