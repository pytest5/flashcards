import React from "react";

export default function FlashCardOptionIcon({ isCorrect }) {
  if (isCorrect === null) {
    return <div style={{ color: "red" }}> </div>;
  } else if (isCorrect) {
    return <div style={{ color: "red" }}>✔</div>;
  } else {
    return <div style={{ color: "red" }}>x</div>;
  }
}
