import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const transitionDelay = 2000;
const TimerDisplay = ({ time, isRunning }) => {
  const [display, setDisplay] = useState('formatTime');
  const [animation, setAnimation] = useState('fade-in');
  const timerRef = useRef(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    clearTimer();
    if (isRunning && display === 'formatTime') {
      setAnimation('fade-out');
      timerRef.current = setTimeout(() => {
        setDisplay('bePresent');
        setAnimation('fade-in');
      }, transitionDelay);
    } else if (!isRunning && display === 'bePresent') {
      setAnimation('fade-out');
      timerRef.current = setTimeout(() => {
        setDisplay('formatTime');
        setAnimation('fade-in');
      }, transitionDelay);
    }

    return clearTimer;
  }, [isRunning, display]);

  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div id="timerCircle">
      <div id="innerCircle">
        {display === 'bePresent' ? (
          <div className={animation}>
            <span id="bePresent">Timer has been hidden to promote focus</span>
          </div>
        ) : (
          <div className={animation}>
            <span id="time">{formatTime()}</span>
          </div>
        )}
      </div>
    </div>
  );
};

TimerDisplay.propTypes = {
  time: PropTypes.number.isRequired,
  isRunning: PropTypes.bool.isRequired,
};

export default TimerDisplay;
