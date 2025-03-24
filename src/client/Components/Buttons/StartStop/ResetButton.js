import React from "react";
import PropTypes from "prop-types";
const ResetButton = ({ onReset }) => {

  return (
    <button className="button-icon" onClick={onReset} aria-label="Reset">
      <div className="TimerButton" onClick={onReset}>
      <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fillRule="evenodd" clipRule="evenodd">
        <rect x="4" y="5" width="16" height="16" />
      </svg>
      </div>
    </button> 

  );
};

ResetButton.propTypes = {
  onReset: PropTypes.func.isRequired
};

export default ResetButton;