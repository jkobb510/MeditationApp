import React, { useState } from "react";
import "./App.css";
import LogContainer from "./Components/Buttons/Sessions/LogContainer";
import Controls from "./Components/Buttons/StartStop/Controls";
import TimerDisplay from "./Components/Timer/TimerDisplay";
import useTimer from "./hooks/useTimer";
import useLogs from "./hooks/useLogs";
import chimeSound from "./chalicechime-65472.mp3";
import useWarning from "./hooks/useWarning";
import useAudio from "./hooks/useAudio";
import convertTime from "./utils/convertTime";
import ToggleAudio from "./Components/Buttons/ToggleAudio/ToggleAudio";
import Sessions from "./Components/Buttons/Sessions/Sessions";
import TimeGraph from "./Components/Buttons/Sessions/TimeGraph";

function App() {
  const { time, isRunning, startPauseTimer, resetTimer, audioRef } = useTimer();
  const { logs, saveLog } = useLogs();
  const { isAudioOn, toggleAudio, resetAudio } = useAudio(audioRef, isRunning);
  const [isExpanded, setIsExpanded] = useState(false);
  const { warning, clearWarning, setShortSessionWarning } = useWarning();

  const handleStartPause = () => {
    clearWarning();
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
    <div className="top-left">
      <h4>Upward Meditation</h4>
    </div>
      <ToggleAudio isAudioOn={isAudioOn} toggleAudio={toggleAudio} />
      <TimerDisplay time={time} isRunning={isRunning} />
      <Controls isRunning={isRunning} onStartPause={handleStartPause} onReset={handleReset}/>
      <Sessions isExpanded={isExpanded} toggleExpand={() => setIsExpanded(!isExpanded)} />
      {isExpanded && <TimeGraph logs={logs} />}
      <audio ref={audioRef} src={chimeSound} />
    </div>
  );
}

export default App;
