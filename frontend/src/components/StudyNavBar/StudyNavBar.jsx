import React from "react";
import { RxCross2 } from "react-icons/rx";
import { IoMdArrowBack } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import styles from "./StudyNavBar.module.css";
import { Link, useLocation } from "react-router-dom";
import FlashCardProgressBar from "../FlashCardProgressBar/FlashCardProgressBar";

export default function StudyNavBar({ step, length }) {
  const location = useLocation();
  const sessionPaths = ["mcq-kids", "summary", "mcq", "front-back"];
  const isAtStagingPath = location.pathname.split("/").at(-1) === "session";
  const isAtSessionPath = sessionPaths.includes(
    location.pathname.split("/").at(-1)
  );

  return (
    <nav>
      <div className={styles.studyNavBarTop}>
        {isAtStagingPath ? (
          <Link>
            <IoMdArrowBack color="white" />
          </Link>
        ) : (
          <Link to="./">
            <RxCross2 color="white" />
          </Link>
        )}
        {isAtSessionPath && (
          <>
            <div>
              {step + 1}/{length}
            </div>
          </>
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

/* 
export default function FlashCardProgressBar({ step, length }) {
  return (
    <div>
      {step + 1}/{length}
    </div>
  );
}
 */
