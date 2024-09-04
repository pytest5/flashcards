import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import SearchBar from "../../components/SearchBar/SearchBar";
import styles from "./HomeLayout.module.css";
import { Outlet, useLocation } from "react-router-dom";

export default function HomePage() {
  const { pathname } = useLocation();
  const isAtProfile = pathname.split("/").at(-1) === "profile";
  return (
    <div className={styles.homePageWrapper}>
      {!isAtProfile ? <SearchBar /> : <div></div>}
      <div className={styles.homePageBody}>
        <Outlet />
      </div>
      <NavBar />
    </div>
  );
}
