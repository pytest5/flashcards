import React from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import styles from "./Summary.module.css";
import { Button } from "react-aria-components";
import DoughnutChart from "../DoughnutChart/DoughnutChart";

export default function Summary() {
  const { score } = useOutletContext();
  const navigate = useNavigate();

  return (
    <div>
      <h1 className={styles.summaryHeader}>You're learning!</h1>
      <div className={styles.summaryInfo}>
        <div className={styles.subHeader}>Your results: </div>
      </div>
      <DoughnutChart chartData={score} />
      <div className={styles.actions}>
        <Link to="/home">
          <Button className={styles.summaryBtn}>Back to home</Button>
        </Link>
        <Link to="../">
          <Button className={`${styles.summaryBtn} ${styles.secondary}`}>
            Try again!!
          </Button>
        </Link>
      </div>
    </div>
  );
}

// check if user got correct or wrong

// show summary
