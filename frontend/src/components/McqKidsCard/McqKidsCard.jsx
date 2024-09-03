import React from "react";
import { getAudioUrl } from "../../services/textToSpeechService";
import McqKidsCardOption from "../McqKidsCardOption/McqKidsCardOption";
import { useOutletContext } from "react-router-dom";
import { Button, ListBox, ListBoxItem } from "react-aria-components";
import styles from "./McqKidsCard.module.css";

export default function McqKidsCard() {
  const [src, setSrc] = React.useState("");
  const [isInitialStep] = React.useState(true);
  const audioRef = React.useRef();
  const { step, answer, distractors, handleAddStep } = useOutletContext();

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

  return (
    <div className={styles.mcqWrapper}>
      <ListBox className={styles.mcqContainer}>
        {distractors.map((i, idx) => (
          <ListBoxItem
            className={styles.mcqOptionBox}
            id={i}
            key={`${i}-${step}-${isInitialStep}`}
          >
            <McqKidsCardOption
              answer={answer}
              idx={idx}
              step={step}
              length={distractors.length}
              key={`${i}-${step}-${isInitialStep}`}
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
      <Button className={styles.mcqContinueBtn} onPress={handleAddStep}>
        Continue
      </Button>
    </div>
  );
}
