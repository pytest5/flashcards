import React from "react";
import styles from "./McqKidsCardOption.module.css";
import FlashCardOptionIcon from "../FlashCardOptionIcon/FlashCardOptionIcon";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function McqKidsCardOption({ answer, children, step, length }) {
  const [isCorrect, setIsCorrect] = React.useState(null);
  const { tallyScore } = useOutletContext();
  const navigate = useNavigate();

  function navToSummaryIfDone(step, length) {
    if (step + 1 === length) {
      setTimeout(() => navigate("../summary"), 1500);
    }
  }

  const handleClick = (children) => () => {
    const isCorrect = answer === children;
    setIsCorrect(isCorrect);
    tallyScore(isCorrect);
    navToSummaryIfDone(step, length);
  };

  return (
    <div onClick={handleClick(children)} className={styles.wrapper} key={step}>
      <FlashCardOptionIcon word={children} isCorrect={isCorrect} />
      {children}
    </div>
  );
}
