import React from "react";
import styles from "./CardCarouselVertical.module.css";
import { ListBox, ListBoxItem } from "react-aria-components";
import { HiOutlineSpeakerWave } from "react-icons/hi2";

export default function CardCarouselVertical({ cards }) {
  return (
    <ListBox items={cards} className={`${styles.container} ${styles.column}`}>
      {(item) => (
        <ListBoxItem id={item._id} className={styles.columnBox}>
          <div className={styles.smallCard}>
            <span className={styles.smallCardAnswer}>{item.answer}</span>{" "}
            <HiOutlineSpeakerWave
              strokeWidth={1.8}
              color={"var(--primary-color)"}
            />
            {/* <FaRegStar color={"var(--primary-color)"} /> */}
          </div>
        </ListBoxItem>
      )}
    </ListBox>
  );
}
