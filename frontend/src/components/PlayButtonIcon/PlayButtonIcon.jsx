import React from "react";
import { FaRegCirclePlay } from "react-icons/fa6";
import styles from "./PlayButtonIcon.module.css";

export default function PlayButtonIcon() {
  return (
    <div className={styles.playButtonWrapper}>
      <FaRegCirclePlay size={32} strokeWidth={0.1} />
    </div>
  );
}
