import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div style={{ display: "flex", gap: "30px" }}>
      <Link to="/home">Home</Link>
      <Link to="/decks/new">Add</Link>
      <Link to="/profile">Profile</Link>
    </div>
  );
}
