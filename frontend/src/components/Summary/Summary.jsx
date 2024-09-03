import React from "react";
import { useOutletContext } from "react-router-dom";
import styles from "./Summary.module.css";

export default function Summary() {
  const { score } = useOutletContext();

  return (
    <div>
      <h1>Summary</h1>
      <div>Your results: </div>
      <span>Correct: </span> <span>{score.correct}</span>
      <span>Wrong: </span> <span>{score.wrong}</span>
      <div className={styles.actions}>
        <button>Back to home</button>
        <button>Try again</button>
      </div>
    </div>
  );
}

// check if user got correct or wrong

// show summary
