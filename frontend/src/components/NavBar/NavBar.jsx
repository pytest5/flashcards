import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineHome } from "react-icons/hi2";
import { IoAddCircleOutline } from "react-icons/io5";
import { IoMdAddCircleOutline } from "react-icons/io";

import { CgProfile } from "react-icons/cg";
import styles from "./NavBar.module.css";

export default function NavBar() {
  const iconSize = 24;
  return (
    <div className={styles.mainNavBar}>
      <Link to="/home">
        <HiOutlineHome size={iconSize} />
      </Link>
      <Link to="/decks/new">
        <IoMdAddCircleOutline size={iconSize + 1.5} />
      </Link>
      <Link to="profile">
        <CgProfile size={iconSize} />
      </Link>
    </div>
  );
}
