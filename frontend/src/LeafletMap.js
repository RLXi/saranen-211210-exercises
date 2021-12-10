import { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer } from "react-leaflet";
import LocationMarker from "./LocationMarker";

export default function LeafletMap() {
  const [locations, setLocations] = useState([]);
  const [lastId, setLastId] = useState(1);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_URL)
      .then((res) => {
        setLocations(res.data);
        setLastId(res.data[res.data.length - 1].id);
      })
      .catch((err) => {
        console.log("Error:", err);
        console.warn(err);
      });
  }, [locations]);

  function newMarker({ lat, lng }) {
    console.table({ lat, lng });
    axios.post(process.env.REACT_APP_URL, {
      latitude: lat,
      longitude: lng,
    });
    const newId = lastId + 1;
    setLastId(newId);
    setLocations([...locations, { id: newId, latitude: lat, longitude: lng }]);
  }

  if (locations.length === 0) return <div>Loading...</div>;
  //coordinates [62.237460596740405, 25.746931191533807] point approximately to Jyväskylä, Finland
  return (
    <MapContainer
      center={[62.237460596740405, 25.746931191533807]}
      zoom={8}
      scrollWheelZoom={false}
      whenCreated={(map) => {
        map.on("dblclick", (e) => newMarker(e.latlng));
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map((location) => (
        <LocationMarker
          key={location.id}
          latitude={location.latitude}
          longitude={location.longitude}
        />
      ))}
    </MapContainer>
  );
}
