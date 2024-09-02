import React from "react";
import styles from "./McqKidsCardOption.module.css";
import FlashCardOptionIcon from "../FlashCardOptionIcon/FlashCardOptionIcon";

export default function McqKidsCardOption({ answer, children, step }) {
  const [isCorrect, setIsCorrect] = React.useState(null);
  const handleClick = (children) => () => {
    setIsCorrect(answer === children);
  };
  return (
    <div onClick={handleClick(children)} className={styles.wrapper} key={step}>
      <FlashCardOptionIcon word={children} isCorrect={isCorrect} />
      {children}
    </div>
  );
}
