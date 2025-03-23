// src/MainApp.js

import React, { useState, useRef } from "react";
import "./App.css";
import Controls from "./client/Components/Buttons/StartStop/Controls";
import TimerDisplay from "./client/Components/Timer/TimerDisplay";
import useTimer from "./client/hooks/useTimer";
import useLogs from "./client/hooks/useLogs";
import chimeSound from "./chime1.mp3";
import useWarning from "./client/hooks/useWarning";
import useAudio from "./client/hooks/useAudio";
import ToggleAudio from "./client/Components/Buttons/ToggleAudio/ToggleAudio";
import Sessions from "./client/Components/Buttons/Sessions/Sessions";
import TimeGraph from "./client/Components/Buttons/Sessions/TimeGraph";

function MainApp({ username }) {
  const { time, isRunning, startPauseTimer, resetTimer, audioRef } = useTimer();
  const { logs, saveLog } = useLogs(username);
  const { isAudioOn, toggleAudio, resetAudio } = useAudio(audioRef, isRunning);
  const [isExpanded, setIsExpanded] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const { warning, clearWarning, setShortSessionWarning } = useWarning();
  const graphRef = useRef(null);

  const handleStartPause = () => {
    clearWarning();
    if (!isRunning) setSessionStartTime(Date.now());
    startPauseTimer();
  };

  const handleReset = () => {
    if (warning) clearWarning();
    else if (time >= 60) {
      const now = Date.now();
      if (sessionStartTime) saveLog(sessionStartTime, now);
    } else setShortSessionWarning();

    resetTimer();
    resetAudio();
    setSessionStartTime(null);
  };

  const handleContainerClick = (e) => {
    if (isExpanded && graphRef.current && !graphRef.current.contains(e.target)) setIsExpanded(false);
  };

  return (
    <div className="container" onClick={handleContainerClick}>
      <div className="top-left"><h4>Upward Meditation</h4></div>
      <div className="header-container">
        <Sessions isExpanded={isExpanded} toggleExpand={() => setIsExpanded(!isExpanded)} />
        <ToggleAudio isAudioOn={isAudioOn} toggleAudio={toggleAudio} />
      </div>
      {isExpanded && (
        <div ref={graphRef} onClick={(e) => e.stopPropagation()}>
          <TimeGraph logs={logs} />
        </div>
      )}
      <div className={isExpanded ? "darkenAndBlur-expanded" : ""}>
        {warning && <div className="warning">{warning}</div>}
        <TimerDisplay time={time} isRunning={isRunning} />
        <Controls isRunning={isRunning} onStartPause={handleStartPause} onReset={handleReset} />
      </div>
      <audio ref={audioRef} src={chimeSound} />
    </div>
  );
}

export default MainApp;