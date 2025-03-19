import React, { useEffect, useState } from "react";
import Cursor from "./ui/Play/Cursor";

const TypingInput = ({ typedLetters, currentWord, correctWordIndex }) => {
  const [typedText, setTypedText] = useState("");
  const [isStarted, setIsStarted] = useState(false); // Track whether typing has started

  useEffect(() => {
    const currentWordArr = typedLetters[correctWordIndex + 1] ?? [];
    const text = currentWordArr.map((entry) => entry?.letter || "").join("");

    if (text.length > 0) setIsStarted(true); // Mark as started when user types

    setTypedText(text);

    const lastTypedLetter = currentWordArr[currentWordArr.length - 1]?.letter;

    if (lastTypedLetter === " " && text.trim() === currentWord) {
      setTypedText("");
    }
  }, [typedLetters, correctWordIndex, currentWord]);

  const isCorrect = currentWord.startsWith(typedText);
  let bgColor = isCorrect ? "bg-transparent" : "bg-red-500 opacity-90";
  if (typedText === "") bgColor = "bg-transparent";

  return (
    <div className="bg-secondary flex flex-col items-center gap-3 rounded-2xl shadow-hard">
      <div className="w-full flex flex-col px-4 py-4 gap-2">
        <div
          className={`flex flex-col gap-2 py-4 w-full px-16 border-2 border-bprimary rounded-2xl transition-all ${bgColor}`}
        >
          <p
            className={`bg-transparent placeholder:text-bold outline-none text-white font-route text-center text-[25px] border-b-2 transition-all ${
              isCorrect ? "border-white" : "border-danger text-[#d43b41]"
            }`}
          >
            <span className="flex items-center justify-center">
              {!isStarted ? (
                <div className="relative">
                  <span className="text-[#555555]">
                    Type here when the game begins...
                  </span>
                  <Cursor classNames={"absolute top-[1px] left-1/2 -translate-x-1/2"} />
                </div>
              ) : (
                <> {typedText || "\u00A0"}</>
              )}
              {isStarted && <Cursor />}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TypingInput;
