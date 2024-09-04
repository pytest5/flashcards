import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import SearchBar from "../../components/SearchBar/SearchBar";
import styles from "./HomeLayout.module.css";
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
