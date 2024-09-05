import React from "react";
import styles from "./FormNavBar.module.css";
import CloseIcon from "../CloseIcon/CloseIcon";
import { toDate } from "date-fns/toDate";

export default function FormNavBar({ to, ...props }) {
  return (
    <nav {...props}>
      <div className={styles.formNavBar}>
        <CloseIcon to={to} />
      </div>
    </nav>
  );
}
