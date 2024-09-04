import React from "react";
import { SearchField, Label, Input, Button } from "react-aria-components";
import styles from "./SearchBar.module.css";
import { BiSearchAlt } from "react-icons/bi";

export default function SearchBar() {
  return (
    <SearchField className={styles["react-aria-SearchField"]}>
      <Label className={styles["react-aria-Label"]}>⌕</Label>
      <Input className={styles["react-aria-Input"]} />
      <Button className={styles["react-aria-Button"]}>✕</Button>
    </SearchField>
  );
}
