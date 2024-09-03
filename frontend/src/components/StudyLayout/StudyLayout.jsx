import React from "react";
import { Outlet } from "react-router-dom";
import StudyNavBar from "../StudyNavBar/StudyNavBar";
import styles from "./StudyLayout.module.css";

export default function StudyLayout() {
  const [step, setStep] = React.useState(0);
  const [score, setScore] = React.useState({ correct: 0, wrong: 0 });

  const realData = [
    { answer: "花", distractors: ["草", "树"] },
    { answer: "草", distractors: ["花", "树"] },
    { answer: "树", distractors: ["花", "草"] },
  ];

  const sessionData = realData.map((i) => ({
    ...i,
    options: [...i.distractors, i.answer],
    isCorrect: null,
    isGuessed: false,
  }));

  const answer = sessionData[step].answer;
  const options = sessionData[step].options;
  const length = sessionData.length;

  function handleAddStep() {
    if (step === length - 1) return;
    setStep(step + 1);
  }

  function tallyScore(isCorrect) {
    const key = isCorrect ? "correct" : "wrong";
    setScore({ ...score, [key]: score[key] + 1 });
  }

  function resetProgress() {
    setStep(0);
    setScore({ correct: 0, wrong: 0 });
  }

  return (
    <div className={styles.studyLayoutWrapper}>
      <StudyNavBar step={step} length={length} resetProgress={resetProgress} />
      <Outlet
        context={{
          step,
          answer,
          options,
          handleAddStep,
          score,
          tallyScore,
        }}
      />
    </div>
  );
}
