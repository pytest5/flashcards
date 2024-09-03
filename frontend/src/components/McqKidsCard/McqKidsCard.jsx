import React from "react";
import { getAudioUrl } from "../../services/textToSpeechService";
import McqKidsCardOption from "../McqKidsCardOption/McqKidsCardOption";
import { useOutletContext } from "react-router-dom";
import { Button, ListBox, ListBoxItem } from "react-aria-components";
import styles from "./McqKidsCard.module.css";

export default function McqKidsCard() {
  const [src, setSrc] = React.useState("");
  const [isInitialStep] = React.useState(true);
  const { step, answer, options, handleAddStep } = useOutletContext();
  const [resultTracker, setResultTracker] = React.useState(() =>
    makeResultTracker()
  );
  const audioRef = React.useRef();

  React.useEffect(() => {
    async function initializeAudio() {
      const audioUrl = await getAudioUrl(answer);
      setSrc(audioUrl);
    }
    initializeAudio();
  }, [answer]);

  function makeResultTracker() {
    return options.reduce((a, c) => ({ ...a, [c]: false }), {});
  }

  function resetResultTracker() {
    setResultTracker(makeResultTracker());
  }

  function evaluateChoice(word) {
    // reduce this maybe..
    function updateResultTracker(word) {
      const newTracker = {};
      function evaluate(key, word, answer) {
        if (key === answer) return (newTracker[key] = "answer");
        if (key === word) {
          return (newTracker[key] = "wrong");
        } else {
          return (newTracker[key] = "disabled");
        }
      }
      Object.keys(resultTracker).forEach((key) => evaluate(key, word, answer));
      return newTracker;
    }
    const newTracker = updateResultTracker(word);
    setResultTracker(newTracker);
  }

  function handleClickContinue() {
    handleAddStep();
    resetResultTracker();
  }

  return (
    <div className={styles.mcqWrapper}>
      <ListBox className={styles.mcqContainer}>
        {options.map((i, idx) => (
          <ListBoxItem id={i} key={`${i}-${step}-${isInitialStep}`}>
            <McqKidsCardOption
              answer={answer}
              idx={idx}
              step={step}
              length={options.length}
              key={`${i}-${step}-${isInitialStep}`}
              resultTracker={resultTracker}
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
