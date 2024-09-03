import React from "react";
import { RxCross2 } from "react-icons/rx";
import { IoMdArrowBack } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import styles from "./StudyNavBar.module.css";
import { Link, useLocation } from "react-router-dom";
import FlashCardProgressBar from "../FlashCardProgressBar/FlashCardProgressBar";

export default function StudyNavBar({ step, length, resetProgress }) {
  const location = useLocation();
  const currPath = location.pathname.split("/").at(-1);
  const sessionPaths = ["mcq-kids", "summary", "mcq", "front-back"];
  const isAtStagingPath = currPath === "session";
  const isAtSessionPath = sessionPaths.includes(currPath);

  return (
    <nav>
      <div className={styles.studyNavBarTop}>
        {isAtStagingPath ? (
          <Link>
            <IoMdArrowBack color="white" />
          </Link>
        ) : (
          <Link to="./" onClick={resetProgress}>
            <RxCross2 color="white" />
          </Link>
        )}
        {isAtSessionPath && (
          <div>
            {step + 1}/{length}
          </div>
        )}
        <BsThreeDots />
      </div>
      <div>
        {isAtSessionPath && (
          <FlashCardProgressBar step={step} length={length} />
        )}
      </div>
    </nav>
  );
}
