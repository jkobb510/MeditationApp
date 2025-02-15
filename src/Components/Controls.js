import React from "react";
import PropTypes from "prop-types";
import PlayIcon from "./PlayIcon";
import PauseIcon from "./PauseIcon";

const Controls = ({ isRunning, onStartPause, onReset, isAudioOn, toggleAudio }) => {
  return (
    <div className="controls">
      <button className="button-icon" onClick={onReset}>
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fillRule="evenodd" clipRule="evenodd">
          <rect x="4" y="5" width="16" height="16" />
        </svg>
      </button>

      <button className="button-icon" onClick={onStartPause}>
        {isRunning ? <PauseIcon /> : <PlayIcon />}
      </button>
    </div>
  );
};

Controls.propTypes = {
  isRunning: PropTypes.bool.isRequired,
  onStartPause: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  onLogSession: PropTypes.func.isRequired,
  isAudioOn: PropTypes.bool.isRequired,
  toggleAudio: PropTypes.func.isRequired,
};

export default Controls;
