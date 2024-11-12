import { useState, useEffect, useCallback } from 'react';

const useTimer = (initialTime = 600) => {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  const startPauseTimer = useCallback(() => {
    setIsRunning((prev) => !prev);
  }, []);

  // Reset the timer
  const resetTimer = useCallback(() => {
    setTime(initialTime);
    setIsRunning(false);
  }, [initialTime]);

  // Format time for display
  const formattedTime = useCallback(() => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }, [time]);

  // Handle the timer countdown
  useEffect(() => {
    let timer;
    if (isRunning && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, time]);

  return {
    time,
    isRunning,
    formattedTime,
    startPauseTimer,
    resetTimer,
  };
};

export default useTimer;
