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
    background: `conic-gradient(rgb(185, 144, 20) ${progress}%,rgb(255, 255, 255) ${progress}%)`,
  };
  const formattedTime = `${Math.floor(time / 60)}:${(time % 60).toString().padStart(2, '0')}`;

  return {
    time,
    isRunning,
    formattedTime,
    startPauseTimer,
    resetTimer,
    animateStyle,
    audioRef,
  };
};

export default useTimer;
