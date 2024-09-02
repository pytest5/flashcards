import React from "react";
import { getAudioUrl } from "../../services/textToSpeechService";
import McqKidsCardOption from "../McqKidsCardOption/McqKidsCardOption";
import { useOutletContext } from "react-router-dom";

export default function McqKidsCard() {
  const [src, setSrc] = React.useState("");
  const [isInitialStep, setIsInitialStep] = React.useState(true);
  const audioRef = React.useRef();
  const { step, answer, distractors, handleAddStep } = useOutletContext();

  console.log("hi", distractors);

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
      <ul>
        {distractors.map((i, idx) => (
          <McqKidsCardOption
            key={`${i}-${step}-${isInitialStep}`}
            answer={answer}
            idx={idx}
            step={step}
          >
            {i}
          </McqKidsCardOption>
        ))}
      </ul>
      <audio src={src} ref={audioRef} autoPlay={true} />
      {isInitialStep ? (
        <button onClick={handlePlay} style={{ width: "110px" }}>
          Start
        </button>
      ) : (
        <button onClick={handleAddStep} style={{ width: "110px" }}>
          Continue
        </button>
      )}
    </>
  );
}
