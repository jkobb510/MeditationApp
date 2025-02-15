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
import useWarning from "./hooks/useWarning";
import useAudio from "./hooks/useAudio";
import convertTime from "./utils/convertTime";
function App() {
  const { time, isRunning, startPauseTimer, resetTimer, audioRef } = useTimer();
  const { logs, saveLog } = useLogs();
  const { isAudioOn, toggleAudio, resetAudio } = useAudio(audioRef, isRunning);
  const [isExpanded, setIsExpanded] = useState(false);
  const { warning, clearWarning, setShortSessionWarning } = useWarning();

  const handleStartPause = () => {
    clearWarning();``
    startPauseTimer();
  };


  const handleReset = () => {
    if (warning) {
      clearWarning();
    } else if (time >= 60) { 
      const formattedTime = convertTime(time);
      saveLog(formattedTime);
      clearWarning();
    } else {
      setShortSessionWarning();
    }
    resetTimer();
    resetAudio();
  };

  return (
    <div className="container">
    {warning && <p className="warning">{warning}</p>} 

      <div className="top-right">
        <button className="button-icon" onClick={toggleAudio}>
          <img src={isAudioOn ? audioOnImg : audioOffImg} alt="Toggle Sound" width="24" height="24" />
        </button>
      </div>
      <TimerDisplay time={time} />
      <Controls
        isRunning={isRunning}
        onStartPause={handleStartPause}
        onReset={handleReset}
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