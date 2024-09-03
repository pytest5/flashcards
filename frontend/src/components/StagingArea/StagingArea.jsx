import React from "react";
import { ListBox, ListBoxItem } from "react-aria-components";
import styles from "./StagingArea.module.css";
import { FaRegCirclePlay } from "react-icons/fa6";
import PlayButtonIcon from "../PlayButtonIcon/PlayButtonIcon";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { FaRegStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const mockDecks = [
  { id: 1, answer: "花", audioSrc: "www.test.com" },
  { id: 2, answer: "草", audioSrc: "www.test.com" },
  { id: 3, answer: "树", audioSrc: "www.test.com" },
];

const mockFrontBackDecks = [
  { id: 1, front: "React", back: "react is a framework" },
  { id: 2, front: "Javascript", back: "javascript is a lauguage" },
  { id: 3, front: "array.filter", back: "array.filter is non-mutating" },
];

export default function StagingArea() {
  return (
    <div className={styles.stagingAreaWrapper}>
      <ListBox items={mockDecks} className={styles.container}>
        {(item) => (
          <ListBoxItem key={item.id} className={styles.rowBox}>
            <div className={styles.bigCard}>{item.answer}</div>
          </ListBoxItem>
        )}
      </ListBox>
      <PlayButtonIcon />
      <Link to="front-back">Test front back</Link>
      <section className={styles.deckInfo}>
        <h2>Deck name</h2>
        <span>3 terms</span>
        <div>deck description</div>
      </section>
      <ListBox
        items={mockDecks}
        className={`${styles.container} ${styles.column}`}
      >
        {(item) => (
          <ListBoxItem key={item.id} className={styles.columnBox}>
            <div className={styles.smallCard}>
              <span className={styles.smallCardAnswer}>{item.answer}</span>{" "}
              <HiOutlineSpeakerWave /> <FaRegStar />
            </div>
          </ListBoxItem>
        )}
      </ListBox>
    </div>
  );
}
