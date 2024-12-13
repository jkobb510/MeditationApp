import { useState, useEffect, useCallback, useRef } from 'react';

const useTimer = (initialTime = 600) => {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const audioRef = useRef(null);

  const startPauseTimer = useCallback(() => {
    if (time > 0) {
      setIsRunning((prev) => {
        const newIsRunning = !prev;

        // Play audio only when starting the timer
        if (newIsRunning && time === initialTime) {
          audioRef.current?.play();
        }

        return newIsRunning;
      });
    }
  }, [time, initialTime]);
   
  const resetTimer = useCallback(() => {
    setTime(initialTime);
    setIsRunning(false);
  }, [initialTime]);

  useEffect(() => {
    if (!isRunning || time === 0) {
      return;
    }

    const timer = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, time]);

  // Calculate animation progress
  const progress = ((initialTime - time) / initialTime) * 100;
const animateStyle = {
  background: `conic-gradient(#cccccc ${progress}%, #ffffff ${progress}%)`,
};

  return {
    time,
    isRunning,
    startPauseTimer,
    resetTimer,
    animateStyle,
    audioRef,
  };
};

export default useTimer;
