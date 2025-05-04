"use client";
import React, { useEffect, useState } from "react";

const chars = "!@#$%^&*()_+~<>?/|abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function getRandomChar() {
  return chars[Math.floor(Math.random() * chars.length)];
}

function MatrixText({ text, className = "" }) {
  const [display, setDisplay] = useState(Array(text.length).fill(""));
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    let frame = 0;
    const maxFrames = 30; // Adjust this for scrambling duration
    const interval = setInterval(() => {
      setDisplay((prev) =>
        prev.map((char, i) => {
          // Scramble each letter at different speeds
          if (frame >= maxFrames || frame > i * 3) {
            return text[i];
          }
          return getRandomChar();
        })
      );

      frame++;
      // End the animation when all letters are set
      if (frame > text.length * 2 + maxFrames) clearInterval(interval);
    }, 32); // Adjust FPS (frame speed)

    // Cursor blink effect (simulates typing)
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500); // Cursor blink every 500ms

    return () => {
      clearInterval(interval);
      clearInterval(cursorInterval);
    };
  }, [text]);

  return (
    <span className={className}>
      {display.map((char, i) => (
        <span key={i}>{char}</span>
      ))}
      {/* Typing cursor */}
      <span
        className="cursor-blink"
        style={{ visibility: cursorVisible ? "visible" : "hidden" }}
      >
        |
      </span>
    </span>
  );
}

export default MatrixText;
