import React from "react";
import { RxCross2 } from "react-icons/rx";
import { IoMdArrowBack } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import styles from "./StudyNavBar.module.css";
import { Link, useLocation } from "react-router-dom";

export default function StudyNavBar() {
  const location = useLocation();

  const isAtStaging = location.pathname.split("/").at(-1) === "session";

  return (
    <nav className={styles.studyNavBar}>
      {isAtStaging ? (
        <Link>
          <IoMdArrowBack color="white" />
        </Link>
      ) : (
        <Link>
          <RxCross2 />
        </Link>
      )}
      <BsThreeDots />
    </nav>
  );
}
