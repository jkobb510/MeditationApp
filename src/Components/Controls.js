import React from 'react';
import PropTypes from 'prop-types';

/**
 * React component for rendering start/pause and reset controls.
 *
 * The component is passed two props: `isRunning` and `onStartPause` and `onReset`.
 * `isRunning` is a boolean indicating whether the timer is currently running.
 * `onStartPause` is a function to start or pause the timer, and `onReset` is a function to reset the timer.
 *
 * The component renders two buttons. The first button is a reset button, and the second button is a start/pause button.
 * The start/pause button will render a play icon if the timer is not running, and a pause icon if the timer is running.
 * Clicking the start/pause button will start or pause the timer by calling the `onStartPause` prop.
 * Clicking the reset button will reset the timer by calling the `onReset` prop.
 *
 * The component should be rendered within a container element with the class "controls".
 */
const Controls = ({ isRunning, onStartPause, onReset }) => {
  const renderPlayIcon = () => (
    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
      <path d="M23 12l-22 12v-24l22 12zm-21 10.315l18.912-10.315-18.912-10.315v20.63z" />
    </svg>
  );

  const renderPauseIcon = () => (
    <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" fill="white" fillOpacity="0.01" />
      <path d="M16 12V36" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M32 12V36" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  return (
    <div className="controls">
      <button className="invert-button" onClick={onReset}>
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fillRule="evenodd" clipRule="evenodd">
          <rect x="4" y="5" width="16" height="16" />
        </svg>
      </button>
      <button className="invert-button" onClick={onStartPause}>
        {isRunning ? renderPauseIcon() : renderPlayIcon()}
      </button>
    </div>
  );
};

Controls.propTypes = {
  isRunning: PropTypes.bool.isRequired,
  onStartPause: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default Controls;
