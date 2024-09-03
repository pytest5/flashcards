import React from "react";
import styles from "./McqKidsCardOption.module.css";
import FlashCardOptionIcon from "../FlashCardOptionIcon/FlashCardOptionIcon";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function McqKidsCardOption({
  answer,
  children,
  step,
  length,
  resultTracker,
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
    tallyScore(answer === children);
    const isAnswerCorrect = answer === children;
    setIsCorrect(isAnswerCorrect);
    navToSummaryIfDone(step, length);
    evaluateChoice(children);
  };

  return (
    <div
      onClick={handleClick(children)}
      className={`${styles.mcqOptionWrapper} ${resultTracker[children] === "disabled" && styles.disabled} ${resultTracker[children] === "answer" && styles.answer} ${resultTracker[children] === "wrong" && styles.wrong}`}
      key={step}
    >
      <FlashCardOptionIcon word={children} isCorrect={isCorrect} />
      {children}
    </div>
  );
}
