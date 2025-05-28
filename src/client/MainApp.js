import React, { useState, useRef } from "react";
import "./App.css";
import Controls from "./Components/Buttons/StartStop/Controls";
import TimerDisplay from "./Components/Timer/TimerDisplay";
import useTimer from "./hooks/useTimer";
import useLogs from "./hooks/useLogs";
import chimeSound from "./assets/chime1.mp3";
import useWarning from "./hooks/useWarning";
import useAudio from "./hooks/useAudio";
import ToggleAudio from "./Components/Buttons/ToggleAudio/ToggleAudio";
import Sessions from "./Components/Buttons/Sessions/Sessions";
import TimeGraph from "./Components/Buttons/Sessions/TimeGraph";
import About from "./Components/Buttons/About/About";
import { Tooltip } from "./Tooltip";

function MainApp({ username, onLogout }) {
  const menuRef = useRef(null);
  const graphRef = useRef(null);
  const { time, isRunning, startPauseTimer, resetTimer, audioRef } = useTimer();
  const { logs, saveLog } = useLogs(username);
  const { isAudioOn, toggleAudio, resetAudio } = useAudio(audioRef, isRunning);
  const { warning, clearWarning, setShortSessionWarning } = useWarning();

  const [isOpen, setIsOpen] = useState(false);         // hamburger menu
  const [isExpanded, setIsExpanded] = useState(false); // Progress
  const [isAboutOpen, setIsAboutOpen] = useState(false); // About modal
  const [sessionStartTime, setSessionStartTime] = useState(null);

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
    if (isAboutOpen) setIsAboutOpen(false);
    if (isOpen && menuRef.current && !menuRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  return (
    <div className="container" onClick={handleContainerClick}>
      <div className="navbar-bg">
        <div className="top-left">
          <h4 className="logo-text">Upward Meditation</h4>
        </div>
        <div className="right-controls">
          <ToggleAudio isAudioOn={isAudioOn} toggleAudio={toggleAudio} />
          <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>☰</button>
        </div>

        {isOpen && (
          <div className="header-container" ref={menuRef}>
            <About onClick={() => {
              setIsAboutOpen(!isAboutOpen); // ✅ toggle modal
              setIsOpen(false);             // ✅ close hamburger menu
            }} />
            <Sessions isExpanded={isExpanded} toggleExpand={() => {
              setIsExpanded(!isExpanded);
              setIsOpen(false);
            }} />
            <button className="logout-button" onClick={onLogout}>Logout</button>
          </div>
        )}
      </div>

      {isExpanded && (
        <div ref={graphRef} onClick={(e) => e.stopPropagation()}>
          <TimeGraph logs={logs} username={username} onClose={() => setIsExpanded(false)} />
        </div>
      )}

      {isAboutOpen && (
<div className={`dropdown-panel ${isAboutOpen ? "show" : ""}`}>
          <p>
            <strong>Upward Meditation</strong><br /><br />
            A simple meditation tracker that counts up, not down.<br /><br />
            Sessions are saved and added to your daily total.<br /><br />
            Tap the<strong> Progress</strong> button/icon to view your weekly stats.<br /><br />
            More features coming soon!
          </p>
        </div>
      )}

      <div className={isExpanded ? "darkenAndBlur-expanded" : ""}>
        {warning && <div className="warning">{warning}</div>}
        <TimerDisplay time={time} isRunning={isRunning} hideTimerWhenRunning={true} />
        <Controls isRunning={isRunning} onStartPause={handleStartPause} onReset={handleReset} />
      </div>

      <audio ref={audioRef} src={chimeSound} />
    </div>
  );
}

export default MainApp;