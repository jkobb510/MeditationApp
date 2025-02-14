import React from "react";
import PropTypes from "prop-types";
const ResetButton = ({ onReset, isRunning, onLogSession, setWarning }) => {
  const handleReset = () => {
    if (isRunning) {
      onReset();
    }
    const success = onLogSession();
    if (!success) {
      setWarning("Session must be at least 1 minute to be logged.");
    }
  };

  return (
    <button className="button-icon" onClick={handleReset}>
      <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fillRule="evenodd" clipRule="evenodd">
        <rect x="4" y="5" width="16" height="16" />
      </svg>
    </button>
  );
};

ResetButton.propTypes = {
  onReset: PropTypes.func.isRequired,
  isRunning: PropTypes.bool.isRequired,
  onLogSession: PropTypes.func.isRequired,
  setWarning: PropTypes.func.isRequired,
};

export default ResetButton;