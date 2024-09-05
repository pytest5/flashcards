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
    async function loadCards() {
      const fetchedCards = await getCardsByDeckId(deckId);
      setCards(fetchedCards);
    }
    loadCards();
  }, [deckId]);

  // if (cards.length === 0) {
  //   return <h1>Deck is empty</h1>;
  // }

  const sessionData = cards?.map((i) => ({
    ...i,
    options: [...i.distractors, i.answer],
    isCorrect: null,
    isGuessed: false,
  }));

  const answer = sessionData[step]?.answer || 0;
  const options = sessionData[step]?.options || 0;
  const length = sessionData?.length || 0;

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
          length,
          handleAddStep,
          score,
          tallyScore,
        }}
      />
    </div>
  );
}
