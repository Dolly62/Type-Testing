import React, { useEffect, useRef, useState } from "react";
import Timer from "./Timer";
import { useHistory } from "react-router-dom";

const UserInput = () => {
  const [enteredChar, setEnteredChar] = useState("");
  const userTypingStarted = useRef(false);
  const [highlightedChars, setHighlightedChars] = useState([]);

  const history = useHistory();

  const sampleText =
    "does not green own first upon winged. air make he moving let all stars abundantly, let meat whales for sixth can't they're give set so sixth, blessed second face that creature rule winged and so yielding moving were face firmament gathered called fifth.";

  useEffect(() => {
    if (userTypingStarted.current) {
      const chars = enteredChar.split("");
      const highlighted = sampleText.split("").map((char, index) => {
        return chars[index] === char;
      });
      setHighlightedChars(highlighted);
    }
  }, [enteredChar]);

  const calculateAccuracyHandler = () => {
    const correctChars = enteredChar
      .split("")
      .filter((char, index) => char === sampleText[index]).length;

    const totalChars = Math.max(sampleText.length, enteredChar.length);
    const accuracyPercentage = (correctChars / totalChars) * 100 || 0;
    localStorage.setItem("correctChars", correctChars);
    localStorage.setItem("totalChars", totalChars);
    localStorage.setItem("accuracy", accuracyPercentage.toFixed(0));
  };

  const calculateWpmHandler = () => {
    const wordsPerMinute = (enteredChar.split(" ").length / 1) * (60 / 5) || 0;
    localStorage.setItem("wpm", wordsPerMinute.toFixed(0));
  };

  useEffect(() => {
    if (userTypingStarted.current) {
      calculateAccuracyHandler();
      calculateWpmHandler();
    }
  }, [enteredChar]);

  const timeOverHandler = () => {
    calculateAccuracyHandler();
    calculateWpmHandler();
    history.push("/user-result");
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      <Timer userChar={userTypingStarted} onTimeOver={timeOverHandler} />
      <div className="w-3/4 h-4/5 p-3 mt-3">
        <p>
          {sampleText.split("").map((char, index) => (
            <span
              key={index}
              className={
                highlightedChars[index] ? "text-green-500" : "text-red-500"
              }
            >
              {char}
            </span>
          ))}
        </p>
      </div>
      <textarea
        name="userText"
        id="userText"
        className=" outline-purple-600 border-none p-3 rounded-lg w-3/4 h-4/5 min-h-64 mt-5"
        value={enteredChar}
        onChange={(e) => {
          setEnteredChar(e.target.value);
          userTypingStarted.current = true;
        }}
      ></textarea>
    </div>
  );
};

export default UserInput;
