import React, { useState } from "react";
import "./App.css";
import LogContainer from "./Components/LogContainer";
import Controls from "./Components/Controls";
import TimerDisplay from "./Components/TimerDisplay";
import useTimer from "./hooks/useTimer";
import useLogs from "./hooks/useLogs";
import chimeSound from "./chalicechime-65472.mp3";
import useWarning from "./hooks/useWarning";
import useAudio from "./hooks/useAudio";
import convertTime from "./utils/convertTime";
import ToggleAudio from "./Components/ToggleAudio";
import CollapsibleHeader from "./Components/CollapsibleHeader";
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
      console.log("Converted Time:", formattedTime);
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
    <div className="top-left">
      <h4>Upward Meditation</h4>
    </div>
      <ToggleAudio isAudioOn={isAudioOn} toggleAudio={toggleAudio} />
      <TimerDisplay time={time} isRunning={isRunning} />
      <Controls isRunning={isRunning} onStartPause={handleStartPause} onReset={handleReset}/>
      <CollapsibleHeader isExpanded={isExpanded} toggleExpand={() => setIsExpanded(!isExpanded)} />
      {isExpanded && <LogContainer logs={logs} />}

        <audio ref={audioRef} src={chimeSound} />
    </div>
  );
}

export default App;