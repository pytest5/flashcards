import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import SearchBar from "../../components/SearchBar";
import styles from "./HomePage.module.css";
import { Outlet } from "react-router-dom";

export default function HomePage() {
  return (
    <div className={styles.homePageWrapper}>
      <SearchBar />
      <div className={styles.homePageBody}>
        <Outlet />
      </div>
      <NavBar />
    </div>
  );
}
