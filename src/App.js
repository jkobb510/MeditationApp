import React, { useState } from "react";
import "./App.css";
import LogContainer from "./Components/LogContainer";
import Controls from "./Components/Controls";
import TimerDisplay from "./Components/TimerDisplay";
import useTimer from "./hooks/useTimer";
import useLogs from "./hooks/useLogs";
import chimeSound from "./chalicechime-65472.mp3";
import audioOnImg from "./audioOn.png";
import audioOffImg from "./audioOff.png";

function App() {
  const { time, isRunning, startPauseTimer, resetTimer, audioRef } = useTimer();
  const { logs, saveLog } = useLogs();
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [pendingUnmute, setPendingUnmute] = useState(false); // Track pending unmute state
  const [isExpanded, setIsExpanded] = useState(false);

  const handleLogSession = () => {
    if (time >= 60) {
      saveLog(time);
      return true;
    }
    return false;
  };

  const toggleAudio = () => {
    setIsAudioOn((prevIsAudioOn) => {
      const newIsAudioOn = !prevIsAudioOn;
      if (audioRef.current) {
        if (!newIsAudioOn) {
          audioRef.current.muted = true;
          setPendingUnmute(false);
        } else if (isRunning) {
          setPendingUnmute(true);
        } else {
          audioRef.current.muted = false;
        }
      }
      return newIsAudioOn;
    });
  };

  const handleReset = () => {
    resetTimer();
    if (pendingUnmute) {
      setIsAudioOn(true);
      if (audioRef.current) {
        audioRef.current.muted = false;
      }
      setPendingUnmute(false);
    }
  };

  return (
    <div className="container">
      <div className="top-right">
        <button className="button-icon" onClick={toggleAudio}>
          <img src={isAudioOn ? audioOnImg : audioOffImg} alt="Toggle Sound" width="24" height="24" />
        </button>
      </div>
      <TimerDisplay time={time} />
      <Controls
        isRunning={isRunning}
        onStartPause={startPauseTimer}
        onReset={handleReset}
        onLogSession={handleLogSession}
        isAudioOn={isAudioOn}
        toggleAudio={toggleAudio}
      />
      <div className="collapsible-header" onClick={() => setIsExpanded(!isExpanded)}>
        <h4>Your Sessions</h4>
        <span>{isExpanded ? "▲" : "▼"}</span>
      </div>
      {isExpanded && <LogContainer logs={logs} />}

        <audio ref={audioRef} src={chimeSound} />
    </div>
  );
}

export default App;