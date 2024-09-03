import React from "react";
import { FaRegCirclePlay } from "react-icons/fa6";
import styles from "./PlayButtonIcon.module.css";
import { Link } from "react-router-dom";

export default function PlayButtonIcon({ ...props }) {
  return (
    <div className={styles.playButtonWrapper}>
      <Link to="mcq-kids">
        <FaRegCirclePlay size={32} color="white" {...props} />
      </Link>
    </div>
  );
}
