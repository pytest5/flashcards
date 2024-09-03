import React from "react";
import styles from "./HomeContent.module.css";
import { Link } from "react-router-dom";

export default function HomeContent() {
  return (
    <div>
      <h2>HomeContent</h2>
      <Link to="dashboard">View more</Link>
    </div>
  );
}
