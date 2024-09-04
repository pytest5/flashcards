import React from "react";
import styles from "./SmallCard.module.css";

export default function SmallCard({ item, renderIcon, ...rest }) {
  const defaultStyles = {
    strokeWidth: 1.8,
    color: "var(--primary-color)",
    ...rest,
  };
  return (
    <div className={styles.smallCard}>
      <span className={styles.smallCardAnswer}>{item.answer}</span>
      {renderIcon(defaultStyles)}
      {/* <FaRegStar color={"var(--primary-color)"} /> */}
    </div>
  );
}
