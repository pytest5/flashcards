import React from "react";
import { ProgressBar } from "react-aria-components";
import styles from "./FlashCardProgressBar.module.css";

export default function FlashCardProgressBar({ step, length }) {
  const value = ((step + 1) / length) * 100;
  return (
    <ProgressBar className={styles["react-aria-ProgressBar"]} value={value}>
      {({ percentage }) => (
        <>
          <div className={styles.bar}>
            <div className={styles.fill} style={{ width: percentage + "%" }} />
          </div>
        </>
      )}
    </ProgressBar>
  );
}
