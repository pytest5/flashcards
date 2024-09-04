import React from "react";
import { Outlet, useParams } from "react-router-dom";
import StudyNavBar from "../StudyNavBar/StudyNavBar";
import styles from "./StudyLayout.module.css";
import { getCardsByDeckId } from "../../services/cardService";

export default function StudyLayout() {
  const [step, setStep] = React.useState(0);
  const [score, setScore] = React.useState({ correct: 0, wrong: 0 });
  const [cards, setCards] = React.useState([]);

  const { deckId } = useParams();

  React.useEffect(() => {
    async function loadDecks() {
      const fetchedCards = await getCardsByDeckId(deckId);
      setCards(fetchedCards);
    }
    loadDecks();
  }, [deckId]);

  if (!cards || cards.length === 0) {
    return <h1>Loading...</h1>;
  }

  const sessionData = cards.map((i) => ({
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
