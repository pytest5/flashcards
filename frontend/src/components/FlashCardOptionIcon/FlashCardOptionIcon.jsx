import React from "react";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import styles from "./FlashCardOptionIcon.module.css";
export default function FlashCardOptionIcon({ isCorrect }) {
  if (isCorrect === null) {
    return <div className={styles.wrapper}></div>;
  } else if (isCorrect) {
    return (
      <div className={styles.wrapper}>
        <TiTick color="green" />
      </div>
    );
  } else {
    return (
      <div className={styles.wrapper}>
        <RxCross2 color="red" />
      </div>
    );
  }
}
