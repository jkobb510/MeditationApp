import React from 'react';
import './App.css';
import LogContainer from './LogContainer';
import Controls from './Controls';
import TimerDisplay from './TimerDisplay';
import useTimer from './hooks/useTimer';
import useLogs from './hooks/useLogs';
import chimeSound from './chalicechime-65472.mp3';

function App() {
  const { time, isRunning, formattedTime, startPauseTimer, resetTimer, audioRef } = useTimer(600);
  const { logs, saveLog } = useLogs();
  const handleReset = () => {
    if (time < 600) saveLog(formattedTime);
    resetTimer();
    audioRef.current.play();
  };

  return (
    <div className="container">
      <TimerDisplay time={time} formattedTime={formattedTime} />
      <Controls isRunning={isRunning} onStartPause={startPauseTimer} onReset={handleReset} />
      <LogContainer logs={logs} />
        <audio ref={audioRef} src={chimeSound} />

    </div>
  );
}

export default App;
