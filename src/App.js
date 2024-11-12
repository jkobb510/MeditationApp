import React from 'react';
import './App.css';
import LogContainer from './LogContainer';
import Controls from './Controls';
import TimerDisplay from './TimerDisplay';
import useTimer from './hooks/useTimer';
import useLogs from './hooks/useLogs';

function App() {
  const { time, isRunning, formattedTime, startPauseTimer, resetTimer } = useTimer(600);
  const { logs, saveLog } = useLogs();
  const handleReset = () => {
    if (time < 600) saveLog(formattedTime());
    resetTimer();
  };

  return (
    <div className="container">
      <TimerDisplay time={time} formattedTime={formattedTime()} />
      <Controls isRunning={isRunning} onStartPause={startPauseTimer} onReset={handleReset} />
      <LogContainer logs={logs} />
    </div>
  );
}

export default App;
