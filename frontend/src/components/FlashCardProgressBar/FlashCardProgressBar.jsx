import React from "react";

export default function FlashCardProgressBar({ step, length }) {
  return (
    <div>
      {step + 1}/{length}
    </div>
  );
}
