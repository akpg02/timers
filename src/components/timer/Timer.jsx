import React, { useState, useEffect } from "react";
import Button from "../button/Button";
import "./Timer.css";

function Counter() {
  const [time, setTime] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [message, setMessage] = useState("");

  const handleIncrement = () => {
    setTime((t) => t + 1);
  };

  const handleDecrement = () => {
    setTime((t) => t - 1);
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(60);
    setMessage("");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isRunning) {
        if (time > 0) {
          setTime((t) => t - 1);
          setMessage("");
        } else {
          setMessage("Timer Completed!");
          setIsRunning(false);
        }
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [isRunning, time]);

  const formatTime = () => {
    let minutes = Math.floor((time / 60) % 60);
    let seconds = Math.floor(time % 60);

    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");

    return `${minutes}:${seconds}`;
  };

  return (
    <>
      <div className="counter-container">
        <p className="timer-title">Pomodoro Timer</p>
        <div className="message">{message}</div>
        <div className="button-group">
          <Button
            className={"decrement"}
            value={"-"}
            onClick={handleDecrement}
          />
          <div className="display">
            {formatTime()}
            <div className="display-labels">
              <span>Mins</span>
              <span>Seconds</span>
            </div>
          </div>
          <Button
            className={"increment"}
            value={"+"}
            onClick={handleIncrement}
          />
        </div>
        <div className="controls">
          <Button
            className={"start-button"}
            value={"Start"}
            onClick={handleStart}
          />
          <Button
            value={"Pause"}
            className={"pause-button"}
            onClick={handlePause}
          />
          <Button
            value={"Reset"}
            className={"reset-button"}
            onClick={handleReset}
          />
        </div>
      </div>
    </>
  );
}

export default Counter;
