import React from "react";
import { getAudioUrl } from "../../services/textToSpeechService";
import McqKidsCardOption from "../McqKidsCardOption/McqKidsCardOption";
import { useOutletContext } from "react-router-dom";
import { Button, ListBox, ListBoxItem } from "react-aria-components";
import styles from "./McqKidsCard.module.css";

export default function McqKidsCard() {
  const [src, setSrc] = React.useState("");
  const [isInitialStep] = React.useState(true);
  const { step, answer, distractors, handleAddStep } = useOutletContext();
  const [disabledTracker, setDisabledTracker] = React.useState(() =>
    makeDisabledTracker()
  );
  const audioRef = React.useRef();

  React.useEffect(() => {
    async function initializeAudio() {
      const audioUrl = await getAudioUrl(answer);
      setSrc(audioUrl);
    }
    initializeAudio();
  }, [answer]);

  // function handlePlay() {
  //   audioRef.current.play();
  //   setIsInitialStep(false);
  // }

  function makeDisabledTracker() {
    const trackerObj = distractors.reduce((a, c) => ({ ...a, [c]: false }), {});
    return trackerObj;
  }

  function evaluateChoice(word) {
    function updateDisabledTracker(word) {
      const newTracker = {};
      function evaluate(key, word, answer) {
        if (key === answer) return (newTracker[key] = "answer");
        if (key === word) {
          return (newTracker[key] = "wrong");
        } else {
          return (newTracker[key] = "disabled");
        }
      }
      Object.keys(disabledTracker).forEach((key) =>
        evaluate(key, word, answer)
      );
      return newTracker;
    }
    const newTracker = updateDisabledTracker(word);
    setDisabledTracker(newTracker);
  }

  function resetDisabledTracker() {
    const trackerObj = distractors.reduce((a, c) => ({ ...a, [c]: false }), {});
    setDisabledTracker(trackerObj);
  }

  function handleClickContinue() {
    handleAddStep();
    resetDisabledTracker();
  }

  return (
    <div className={styles.mcqWrapper}>
      <ListBox className={styles.mcqContainer}>
        {distractors.map((i, idx) => (
          <ListBoxItem id={i} key={`${i}-${step}-${isInitialStep}`}>
            <McqKidsCardOption
              answer={answer}
              idx={idx}
              step={step}
              length={distractors.length}
              key={`${i}-${step}-${isInitialStep}`}
              disabledTracker={disabledTracker}
              evaluateChoice={evaluateChoice}
            >
              {i}
            </McqKidsCardOption>
          </ListBoxItem>
        ))}
      </ListBox>
      <audio src={src} ref={audioRef} autoPlay={true} />
      {/* {isInitialStep ? (
        <Button onPress={handlePlay}>Start</Button>
      ) : (
        <Button onPress={handleAddStep}>Continue</Button>
      )} */}
      <Button className={styles.mcqContinueBtn} onPress={handleClickContinue}>
        Continue
      </Button>
    </div>
  );
}
