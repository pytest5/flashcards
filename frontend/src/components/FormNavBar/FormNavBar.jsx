import React from "react";
import styles from "./FormNavBar.module.css";
import CloseIcon from "../CloseIcon/CloseIcon";

export default function FormNavBar() {
  return (
    <nav>
      <div className={styles.formNavBar}>
        <CloseIcon />
      </div>
    </nav>
  );
}
