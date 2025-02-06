import React, { useState } from 'react';
import './App.css';
import LogContainer from './Components/LogContainer';
import Controls from './Components/Controls';
import TimerDisplay from './Components/TimerDisplay';
import useTimer from './hooks/useTimer';
import useLogs from './hooks/useLogs';
import chimeSound from './chalicechime-65472.mp3';

function App() {
  const [warning, setWarning] = useState('');
  const { time, isRunning, formattedTime, startPauseTimer, resetTimer, audioRef } = useTimer();
  const { logs, saveLog } = useLogs();

  const clearWarning = () => {
    if (warning) setWarning(''); // ✅ Clears the warning only if it exists
  };

  const handleStartPause = () => {
    clearWarning(); // ✅ Clicking Play/Pause always clears the warning
    startPauseTimer();
  };

  const handleReset = () => {
    if (warning) {
      clearWarning(); // ✅ Clicking Reset again clears the warning
    } else if (time >= 60) {  
      console.log('Saving log with time:', formattedTime);
      saveLog(formattedTime);
      clearWarning(); // ✅ Clears warning when saving valid session
    } else {
      setWarning('Session must be at least 1 minute to be logged.'); // ✅ Shows warning if session too short
    }
    resetTimer();
  };

  return (
    <div className="container">
      {warning && <p className="warning">{warning}</p>} 
      <div id="timerCircle">
        <div id="innerCircle">
          <TimerDisplay time={time} formattedTime={formattedTime} />
        </div>
      </div>
      <Controls isRunning={isRunning} onStartPause={handleStartPause} onReset={handleReset} />
      <LogContainer logs={logs} />
      <audio ref={audioRef} src={chimeSound} />
    </div>
  );
}

export default App;
