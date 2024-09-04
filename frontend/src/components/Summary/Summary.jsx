import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import styles from "./Summary.module.css";
import DoughnutChart from "../DoughnutChart/DoughnutChart";
import CustomButton from "../CustomButton/CustomButton";

export default function Summary() {
  const { score } = useOutletContext();
  return (
    <div>
      <h1 className={styles.summaryHeader}>You're learning!</h1>
      <div className={styles.summaryInfo}>
        <div className={styles.subHeader}>Your results: </div>
      </div>
      <DoughnutChart chartData={score} />
      <div className={styles.actions}>
        <Link to="/home">
          <CustomButton>Back to home</CustomButton>
        </Link>
        <Link to="../">
          <CustomButton variant="secondary">Try again!!</CustomButton>
        </Link>
      </div>
    </div>
  );
}
