// src/MainApp.js

import React, { useState, useRef } from "react";
import "./App.css";
import Controls from "./Components/Buttons/StartStop/Controls";
import TimerDisplay from "./Components/Timer/TimerDisplay";
import useTimer from "./hooks/useTimer";
import useLogs from "./hooks/useLogs";
import chimeSound from "./assets/chime1.mp3"; // Ensure you have a chime sound in your assets folder
import useWarning from "./hooks/useWarning";
import useAudio from "./hooks/useAudio";
import ToggleAudio from "./Components/Buttons/ToggleAudio/ToggleAudio";
import Sessions from "./Components/Buttons/Sessions/Sessions";
import TimeGraph from "./Components/Buttons/Sessions/TimeGraph";
import About from "./Components/Buttons/About/About"; // Import the About component
import { Tooltip } from "./Tooltip";

function MainApp({ username, onLogout}) {
  const menuRef = useRef(null);
  const { time, isRunning, startPauseTimer, resetTimer, audioRef } = useTimer();
  const { logs, saveLog } = useLogs(username);
  const { isAudioOn, toggleAudio, resetAudio } = useAudio(audioRef, isRunning);
  const [isExpanded, setIsExpanded] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const { warning, clearWarning, setShortSessionWarning } = useWarning();
  const graphRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleStartPause = () => {
    clearWarning();
    if (!isRunning) setSessionStartTime(Date.now());
    startPauseTimer();
  };

  const handleReset = () => {
    if (warning) clearWarning();
    else if (time > 0) {
      const now = Date.now();
      if (sessionStartTime) saveLog(sessionStartTime, now);
    } else setShortSessionWarning();

    resetTimer();
    resetAudio();
    setSessionStartTime(null);
  };

const handleContainerClick = (e) => {
  if (isExpanded && graphRef.current && !graphRef.current.contains(e.target)) {
    setIsExpanded(false);
  }
  if (isOpen && menuRef.current && !menuRef.current.contains(e.target)) {
    setIsOpen(false);
  }
};


  return (
    <div className="container" onClick={handleContainerClick}>
    <div className="navbar-bg">
      <div className="top-left"><h4 className="logo-text">Upward Meditation</h4></div>
        <div className="right-controls">

      <ToggleAudio isAudioOn={isAudioOn} toggleAudio={toggleAudio} />
      <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>☰</button>
      </div>
  {isOpen && (
      <div className="header-container" ref={menuRef}>
        <About onClick={() => setIsExpanded(true)}/>
        <Sessions isExpanded={isExpanded} toggleExpand={() => setIsExpanded(!isExpanded)} />
        <button className="logout-button" onClick={onLogout}>Logout</button>
      </div>
  )}
    </div>
      {isExpanded && (
        <div ref={graphRef} onClick={(e) => e.stopPropagation()}>
          <TimeGraph logs={logs} username={username} onClose={() => setIsExpanded(false)} />
        </div>
      )}
      <div className={isExpanded ? "darkenAndBlur-expanded" : ""}>
        {warning && <div className="warning">{warning}</div>}
        <TimerDisplay time={time} isRunning={isRunning} hideTimerWhenRunning={false} />
        <Controls isRunning={isRunning} onStartPause={handleStartPause} onReset={handleReset} />
      </div>
      <audio ref={audioRef} src={chimeSound} />
    </div>
  );
}

export default MainApp;