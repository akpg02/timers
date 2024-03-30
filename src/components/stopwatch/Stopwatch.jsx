import React, { useState, useEffect, useRef } from "react";
import Button from "../button/Button";
import "./Stopwatch.css";

function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  const intervalIDRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalIDRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    }
    return () => {
      clearInterval(intervalIDRef.current);
    };
  }, [isRunning]);

  const start = () => {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
  };
  const pause = () => {
    setIsRunning(false);
  };
  const reset = () => {
    setIsRunning(false);
    setElapsedTime(0);
  };

  const formatTime = () => {
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");

    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
  };

  return (
    <div className="stopwatch">
      <p className="stopwatch-title">Stopwatch Timer</p>
      <div className="display">
        {formatTime()}
        <div className="labels-display">
          <span>Days</span> <span>Hours</span> <span>Mins</span>{" "}
          <span>Seconds</span>
        </div>
      </div>
      <div className="controls">
        <Button className={"start-button"} value={"Start"} onClick={start} />
        <Button className={"pause-button"} value={"Pause"} onClick={pause} />
        <Button className={"reset-button"} value={"Reset"} onClick={reset} />
      </div>
    </div>
  );
}

export default Stopwatch;
