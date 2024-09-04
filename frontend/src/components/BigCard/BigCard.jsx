import React from "react";
import styles from "./BigCard.module.css";

export default function BigCard({ ...props }) {
  return <div {...props} className={styles.bigCard} />;
}
