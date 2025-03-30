import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import "./Timer.css"; 

const transitionDelay = 1500;
const TimerDisplay = ({ time, isRunning, hideTimerWhenRunning = true }) => {
  const [showBePresent, setShowBePresent] = useState(false);
  const [fade, setFade] = useState('fade-in');
  const timerRef = useRef(null);
  const firstRender = useRef(true);

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
      setShowBePresent(isRunning); // Set correct initial state
      return; // Skip animation on first load
    }
    clearTimer();
    setFade('fade-out');

    timerRef.current = setTimeout(() => {
      setShowBePresent(isRunning);
      requestAnimationFrame(() => {
      setFade('fade-in');
    });
  },transitionDelay);

    return clearTimer;
  }, [isRunning, hideTimerWhenRunning]);

  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
  <div className="timer-wrapper">
    <div id="timerCircle">
      <div id="innerCircle">
        <div className={fade}>
          {showBePresent ? (
            <span id="bePresent">Timer has been hidden to promote focus</span>
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
