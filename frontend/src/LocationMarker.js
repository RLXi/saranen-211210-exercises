import { useState } from "react";
import { Marker, Popup } from "react-leaflet";

export default function LocationMarker({ latitude, longitude }) {
  const [markerPosition] = useState({
    lat: latitude,
    lng: longitude,
  });

  return markerPosition === null ? null : (
    <Marker position={markerPosition}>
      <Popup>
        lat: {markerPosition.lat} lng: {markerPosition.lng}
      </Popup>
    </Marker>
  );
}
