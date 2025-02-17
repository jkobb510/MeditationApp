import React from "react";
import PropTypes from "prop-types";
import PlayIcon from "./PlayIcon";
import PauseIcon from "./PauseIcon";
import ResetButton from "./ResetButton";
const Controls = ({ isRunning, onStartPause, onReset }) => {
  return (
    <div className="controls">
      <ResetButton onReset={onReset} />

      <button className="button-icon" onClick={onStartPause}>
        {isRunning ? <PauseIcon /> : <PlayIcon />}
      </button>
    </div>
  );
};

Controls.propTypes = {
  isRunning: PropTypes.bool.isRequired,
  onStartPause: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired
};

export default Controls;
