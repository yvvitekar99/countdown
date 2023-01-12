import "./App.css";
import React, { useState, useEffect, Fragment } from "react";
// import { Link } from "react-router-dom";
const START_MINUTES = "00";
const START_SECOND = "05";
const START_DURATION = 3;

export default function App() {
  const [currentMinutes, setMinutes] = useState(START_MINUTES);
  const [currentSeconds, setSeconds] = useState(START_SECOND);
  const [isStop, setIsStop] = useState(false);
  const [duration, setDuration] = useState(START_DURATION);
  const [isRunning, setIsRunning] = useState(false);

  const startHandler = () => {
    setDuration(parseInt(START_SECOND, 10) + 60 * parseInt(START_MINUTES, 10));
    // setMinutes(60 * 5);
    // setSeconds(0);
    setIsRunning(true);
  };
  const stopHandler = () => {
    // stop timer
    setIsStop(true);
    setIsRunning(false);
  };
  const resetHandler = () => {
    setMinutes(START_MINUTES);
    setSeconds(START_SECOND);
    setIsRunning(false);
    setIsStop(false);
    setDuration(START_DURATION);
  };

  const resumeHandler = () => {
    let newDuration =
      parseInt(currentMinutes, 10) * 60 + parseInt(currentSeconds, 10);
    setDuration(newDuration);

    setIsRunning(true);
    setIsStop(false);
  };

  useEffect(() => {
    if (isRunning === true) {
      let timer = duration;
      var minutes, seconds;
      const interval = setInterval(function () {
        if (--timer <= 0) {
          resetHandler();
        } else {
          minutes = parseInt(timer / 60, 10);
          seconds = parseInt(timer % 60, 10);

          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;

          setMinutes(minutes);
          setSeconds(seconds);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  return (
    <Fragment>
      <div className="App">
        <h3>Result:</h3>
        <div className="time">
          {currentMinutes}
          <span className="mx-3">:</span>
          {currentSeconds}
        </div>
        {!isRunning && !isStop && (
          <button
            onClick={startHandler}
            className="btn btn-primary btn-lg inline me-3"
          >
            START
          </button>
        )}
        {isRunning && (
          <button
            onClick={stopHandler}
            className="btn btn-danger btn-lg inline me-3"
          >
            STOP
          </button>
        )}

        {isStop && (
          <button
            onClick={resumeHandler}
            className="btn btn-success btn-lg inline me-3"
          >
            RESUME
          </button>
        )}

        <button
          onClick={resetHandler}
          className="btn btn-outline-secondary btn-lg inline"
          disabled={!isRunning && !isStop}
        >
          RESET
        </button>
        {/* <p>{duration}</p> */}
      </div>
      <hr className="my-5" />
    </Fragment>
  );
}
