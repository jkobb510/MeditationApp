import React from 'react';
import PropTypes from 'prop-types';

const TimerDisplay = ({ time }) => {
  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div id="timer-circle">
      <span id="time">{formatTime()}</span>
    </div>
  );
};

TimerDisplay.propTypes = {
  time: PropTypes.number.isRequired,
};

export default TimerDisplay;
