import React from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import styles from "./Summary.module.css";
import { Button } from "react-aria-components";

export default function Summary() {
  const { score } = useOutletContext();
  const navigate = useNavigate();

  return (
    <div>
      <h1>Summary</h1>
      <div>Your results: </div>
      <span>Correct: </span> <span>{score.correct}</span>
      <span>Wrong: </span> <span>{score.wrong}</span>
      <div className={styles.actions}>
        <Link to="/home">
          <Button>Back to home</Button>
        </Link>
        <Link to="../">
          <Button>Try again!!</Button>
        </Link>
      </div>
    </div>
  );
}

// check if user got correct or wrong

// show summary
