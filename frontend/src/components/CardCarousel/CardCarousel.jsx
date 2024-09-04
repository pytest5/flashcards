import React from "react";
import { ListBox, ListBoxItem } from "react-aria-components";
import styles from "./CardCarousel.module.css";
import BigCard from "../BigCard/BigCard";

export default function CardCarousel({ items, bigCardContents = () => {} }) {
  return (
    <ListBox items={items} className={styles.container} aria-label="Deck list">
      {(item) => (
        <ListBoxItem
          id={item._id}
          className={styles.rowBox}
          textValue="Deck details"
        >
          <BigCard>{bigCardContents(item) || item.answer}</BigCard>
        </ListBoxItem>
      )}
    </ListBox>
  );
}
