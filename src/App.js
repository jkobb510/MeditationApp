import React, { useState, useRef } from "react";
import "./App.css";
import Controls from "./Components/Buttons/StartStop/Controls";
import TimerDisplay from "./Components/Timer/TimerDisplay";
import useTimer from "./hooks/useTimer";
import useLogs from "./hooks/useLogs";
import chimeSound from "./chime1.mp3";
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
  const graphRef = useRef(null);

  const handleStartPause = () => { clearWarning(); startPauseTimer(); };

  const handleReset = () => {
    if (warning) clearWarning();
    else if (time >= 60) saveLog(convertTime(time));
    else setShortSessionWarning();

    resetTimer();
    resetAudio();
  };

  const handleContainerClick = (e) => {
    if (isExpanded && graphRef.current && !graphRef.current.contains(e.target)) setIsExpanded(false);
  };

  return (
    <div className="container" onClick={handleContainerClick}>
      <div className="top-left"><h4>Upward Meditation</h4></div>
      <ToggleAudio isAudioOn={isAudioOn} toggleAudio={toggleAudio} />
      {warning && <div className="warning">{warning}</div>}
      <TimerDisplay time={time} isRunning={isRunning} />
      <Controls isRunning={isRunning} onStartPause={handleStartPause} onReset={handleReset} />
      <Sessions isExpanded={isExpanded} toggleExpand={() => setIsExpanded(!isExpanded)} />
      {isExpanded && <div ref={graphRef} onClick={(e) => e.stopPropagation()}><TimeGraph logs={logs} /></div>}
      <audio ref={audioRef} src={chimeSound} />
    </div>
  );
}

export default App;