import React from "react";
import { Outlet } from "react-router-dom";
import StudyNavBar from "../StudyNavBar/StudyNavBar";

export default function StudyLayout() {
  const [step, setStep] = React.useState(0);
  const mockData = [
    { answer: "花", distractors: ["花", "草", "树"] },
    { answer: "草", distractors: ["花", "草", "树"] },
    { answer: "树", distractors: ["花", "草", "树"] },
  ];
  const answer = mockData[step].answer;
  const distractors = mockData[step].distractors;

  function handleAddStep() {
    if (step === mockData.length - 1) return;
    setStep(step + 1);
  }

  return (
    <div>
      <StudyNavBar />
      <Outlet context={{ step, answer, distractors, handleAddStep }} />
    </div>
  );
}
