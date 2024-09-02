import React from "react";
import { getAudioUrl } from "../../services/textToSpeechService";
import McqKidsCardOption from "../McqKidsCardOption/McqKidsCardOption";
import { useOutletContext } from "react-router-dom";
import { GridList, GridListItem, Button } from "react-aria-components";

export default function McqKidsCard() {
  const [src, setSrc] = React.useState("");
  const [isInitialStep, setIsInitialStep] = React.useState(true);
  const audioRef = React.useRef();
  const { step, answer, distractors, handleAddStep } = useOutletContext();

  React.useEffect(() => {
    async function initializeAudio() {
      const audioUrl = await getAudioUrl(answer);
      setSrc(audioUrl);
    }
    initializeAudio();
  }, [answer]);

  function handlePlay() {
    audioRef.current.play();
    setIsInitialStep(false);
  }

  return (
    <>
      <GridList aria-label="mcq kids card options" selectionMode="multiple">
        {distractors.map((i, idx) => (
          <GridListItem key={`${i}-${step}-${isInitialStep}`}>
            <McqKidsCardOption answer={answer} idx={idx} step={step}>
              {i}
            </McqKidsCardOption>
          </GridListItem>
        ))}
      </GridList>
      <audio src={src} ref={audioRef} autoPlay={true} />
      {isInitialStep ? (
        <Button onPress={handlePlay} style={{ width: "110px" }}>
          Start
        </Button>
      ) : (
        <Button onPress={handleAddStep} style={{ width: "110px" }}>
          Continue
        </Button>
      )}
    </>
  );
}
