import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const transitionDelay = 1200;
const TimerDisplay = ({ time, isRunning }) => {
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
    if (firstRender.current) {
      firstRender.current = false;
      setShowBePresent(isRunning); // Set correct initial state
      return; // Skip animation on first load
    }
    clearTimer();
    setFade('fade-out');

    timerRef.current = setTimeout(() => {
      setShowBePresent(isRunning);
      setTimeout(() => {
      setFade('fade-in');
    }, 10);
  },transitionDelay);

    return clearTimer;
  }, [isRunning]);

  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
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
  );
};


TimerDisplay.propTypes = {
  time: PropTypes.number.isRequired,
  isRunning: PropTypes.bool.isRequired,
};

export default TimerDisplay;
