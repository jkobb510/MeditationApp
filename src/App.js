import React from 'react';
import './App.css';
import LogContainer from './Components/LogContainer';
import Controls from './Components/Controls';
import TimerDisplay from './Components/TimerDisplay';
import useTimer from './hooks/useTimer';
import useLogs from './hooks/useLogs';
import chimeSound from './chalicechime-65472.mp3';

function App() {
  const { time, isRunning, formattedTime, startPauseTimer, resetTimer, audioRef, animateStyle } = useTimer(600);
  const { logs, saveLog } = useLogs();

  const handleReset = () => {
    if (time < 600) {
      console.log('Saving log with time:', formattedTime);
      saveLog(formattedTime);
    }
    resetTimer();
  };

  return (
    <div className="container">
      <div id="timerCircle" style={animateStyle}>
        <div id="innerCircle">
            <TimerDisplay time={time} formattedTime={formattedTime} />
        </div>

      </div>
      <Controls isRunning={isRunning} onStartPause={startPauseTimer} onReset={handleReset} />
      <LogContainer logs={logs} />
      <audio ref={audioRef} src={chimeSound} />
    </div>
  );
}

export default App;
