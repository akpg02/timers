import React, { useState, useEffect } from "react";
import Button from "../button/Button";

import "./Countdown.css";

function Countdown() {
  const formatDate = (str) => {
    const temp = str?.split("-");
    return `${temp[1]}-${temp[2]}-${temp[0]}`;
  };
  const [message, setMessage] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  let countdownDate = new Date(formatDate(date)).getTime();
  const [countdown, setCountdown] = useState(
    countdownDate - new Date().getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (isRunning) {
        if (date <= new Date().toISOString().split("T")[0]) {
          setMessage("Select a future date");
          setIsRunning(false);
          return;
        }
        if (countdown === 0) {
          setMessage("Countdown Ended!");
          return;
        } else {
          setMessage("");
          setCountdown(countdownDate - new Date().getTime());
        }
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [countdown, countdownDate, date, isRunning]);

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    countdownDate = new Date().getTime();
    setCountdown(countdownDate - new Date().getTime());
    setDate(new Date().toISOString().split("T")[0]);
    setIsRunning(false);
    setMessage("");
  };

  const formatTime = () => {
    let days = Math.floor(countdown / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (countdown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((countdown % (1000 * 60)) / 1000);

    days = String(days).padStart(2, "0");
    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");

    return `${days >= 0 ? days : "00"}:${hours >= 0 ? hours : "00"}:${
      minutes >= 0 ? minutes : "00"
    }:${seconds >= 0 ? seconds : "00"}`;
  };

  return (
    <>
      <div className="timer-container">
        <p className="timer-title">Countdown Timer</p>
        <div className="message">{message}</div>
        <input
          type="date"
          value={date}
          className="date"
          onChange={handleDateChange}
        />
        <div className="display">
          {formatTime()}
          <div className="labels-display">
            <span>Days</span> <span>Hours</span> <span>Mins</span>{" "}
            <span>Seconds</span>
          </div>
        </div>
        <div className="controls">
          <Button
            value={"Start"}
            className={"start-button"}
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

export default Countdown;
