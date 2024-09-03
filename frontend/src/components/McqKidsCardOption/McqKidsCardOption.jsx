import React from "react";
import styles from "./McqKidsCardOption.module.css";
import FlashCardOptionIcon from "../FlashCardOptionIcon/FlashCardOptionIcon";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function McqKidsCardOption({
  answer,
  children,
  step,
  length,
  disabledTracker,
  evaluateChoice,
}) {
  const [isCorrect, setIsCorrect] = React.useState(null);
  const { tallyScore } = useOutletContext();
  const navigate = useNavigate();

  function navToSummaryIfDone(step, length) {
    if (step + 1 === length) {
      setTimeout(() => navigate("../summary"), 1500);
    }
  }

  const handleClick = (children) => () => {
    const checkAnswer = answer === children;
    setIsCorrect(checkAnswer);
    tallyScore(isCorrect);
    navToSummaryIfDone(step, length);
    evaluateChoice(children);
  };

  return (
    <div
      onClick={handleClick(children)}
      className={`${styles.mcqOptionWrapper} ${disabledTracker[children] === "disabled" && styles.disabled} ${disabledTracker[children] === "answer" && styles.answer} ${disabledTracker[children] === "wrong" && styles.wrong}`}
      key={step}
    >
      <FlashCardOptionIcon word={children} isCorrect={isCorrect} />
      {children}
    </div>
  );
}
