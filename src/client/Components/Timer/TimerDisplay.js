import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import "./Timer.css"; 
import getRandomMantra from './getRandomMantra';

const transitionDelay = 1500;
const TimerDisplay = ({ time, isRunning, hideTimerWhenRunning = true }) => {
  const [showBePresent, setShowBePresent] = useState(false);
  const [fade, setFade] = useState('fade-in');
  const timerRef = useRef(null);
  const firstRender = useRef(true);
  const wasRunning = useRef(false);
  const mantraFetched = useRef(false);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

useEffect(() => {
  if (!hideTimerWhenRunning) {
    setShowBePresent(false);
    return;
  }
  if (firstRender.current) {
    firstRender.current = false;
    setShowBePresent(isRunning);
    wasRunning.current = isRunning;
    return;
  }
  clearTimer();
  setFade('fade-out');
  const prev = wasRunning.current;
  wasRunning.current = isRunning;
timerRef.current = setTimeout(() => {
if (isRunning) {
  if (!prev && !mantraFetched.current) {
    getRandomMantra().then(m => {
      setText(m);
      mantraFetched.current = true;
    });
  }
  setShowBePresent(true);
} else {
  setShowBePresent(false);
}
  requestAnimationFrame(() => {
    setFade('fade-in');
  });
        wasRunning.current = isRunning; // update after transition

}, transitionDelay);


    return clearTimer;
  }, [isRunning, hideTimerWhenRunning]);

  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
const [text, setText] = useState("");
  return (
  <div className="timer-wrapper">
    <div id="timerCircle">
      <div id="innerCircle">
        <div className={fade}>
          {showBePresent ? (
            <span id="timerText">{text}</span>
          ) : (
            <span id="time">{formatTime()}</span>
          )}
        </div>
      </div>
    </div>
  </div>
  );
};

TimerDisplay.propTypes = {
  time: PropTypes.number.isRequired,
  isRunning: PropTypes.bool.isRequired,
  hideTimerWhenRunning: PropTypes.bool, // Optional prop to control visibility when running
};

export default TimerDisplay;
