import React from "react";
import { useOutletContext } from "react-router-dom";

export default function Summary() {
  const { score } = useOutletContext();
  console.log("score", score);
  return (
    <div>
      <h1>Summary</h1>
      <div>Your results: </div>
      <span>Correct: </span> <span>{score.correct}</span>
      <span>Wrong: </span> <span>{score.wrong}</span>
    </div>
  );
}

// check if user got correct or wrong

// show summary
