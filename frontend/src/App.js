import React from "react";
import LeafletMap from "./LeafletMap";
import "./App.css";

function App() {
  console.log(process.env.REACT_APP_URL);
  return (
    <div>
      <h1>Locations</h1>
      <LeafletMap />
    </div>
  );
}

export default App;
