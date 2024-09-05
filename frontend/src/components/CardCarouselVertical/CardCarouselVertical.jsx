import React from "react";
import styles from "./CardCarouselVertical.module.css";
import { ListBox, ListBoxItem } from "react-aria-components";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import SmallCard from "../SmallCard/SmallCard";
import { Link } from "react-router-dom";

export default function CardCarouselVertical({ cards }) {
  return (
    <ListBox items={cards} className={`${styles.container} ${styles.column}`}>
      {(item) => (
        <ListBoxItem id={item._id} className={styles.columnBox}>
          <SmallCard
            item={item}
            renderIcon={(props) => <HiOutlineSpeakerWave {...props} />}
          />
        </ListBoxItem>
      )}
    </ListBox>
  );
}
