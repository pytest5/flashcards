import React from "react";
import { ListBox, ListBoxItem } from "react-aria-components";
import styles from "./StagingArea.module.css";
import { FaRegCirclePlay } from "react-icons/fa6";

const mockDecks = [
  { id: 1, answer: "花", audioSrc: "www.test.com" },
  { id: 2, answer: "草", audioSrc: "www.test.com" },
  { id: 3, answer: "树", audioSrc: "www.test.com" },
];

export default function StagingArea() {
  return (
    <div className={styles.wrapper}>
      <ListBox items={mockDecks} className={styles.container}>
        {(item) => (
          <ListBoxItem key={item.id} className={styles.rowBox}>
            <div className={styles.bigCard}>{item.answer}</div>
          </ListBoxItem>
        )}
      </ListBox>
      <FaRegCirclePlay size={32} />
      <section className={styles.deckInfo}>
        <h2>Deck name</h2>
        <span>UserAvatar </span>
        <span>2 terms</span>
        <div>deck description</div>
      </section>
      <ListBox
        items={mockDecks}
        className={`${styles.container} ${styles.column}`}
      >
        {(item) => (
          <ListBoxItem key={item.id} className={styles.columnBox}>
            <div className={styles.smallCard}>{item.answer}</div>
          </ListBoxItem>
        )}
      </ListBox>
    </div>
  );
}
