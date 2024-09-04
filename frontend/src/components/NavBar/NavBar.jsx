import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineHome } from "react-icons/hi2";
import { IoMdAddCircleOutline } from "react-icons/io";
import { LuHome } from "react-icons/lu";

import { CgProfile } from "react-icons/cg";
import styles from "./NavBar.module.css";

export default function NavBar() {
  const iconSize = 24;
  return (
    <div className={styles.mainNavBar}>
      <Link to="/home">
        <LuHome className={styles.navBarIcon} size={iconSize} />
      </Link>
      <Link to="/decks/new">
        <IoMdAddCircleOutline
          className={styles.navBarIcon}
          size={iconSize + 1.5}
        />
      </Link>
      <Link to="profile">
        <CgProfile className={styles.navBarIcon} size={iconSize} />
      </Link>
    </div>
  );
}
