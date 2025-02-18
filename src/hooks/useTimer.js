import { useState, useEffect, useCallback, useRef } from 'react';

const useTimer = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [lastActiveTime, setLastActiveTime] = useState(null);
  const intervalRef = useRef(null);
  const audioRef = useRef(null);

  const startPauseTimer = useCallback(() => {
    setIsRunning((prev) => {
      const newIsRunning = !prev;

      // Play audio only when starting the timer
      if (newIsRunning && time === 0) {
        setLastActiveTime(Date.now() - time * 1000);
        audioRef.current?.play();
      }

      return newIsRunning;
    });
  }, [time]);

  const resetTimer = useCallback(() => {
    setTime(0);
    setIsRunning(false);
    setLastActiveTime(null);
  }, []);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearInterval(intervalRef.current);
      } else if (isRunning && lastActiveTime) {
        const elapsed = Math.floor((Date.now() - lastActiveTime) / 1000);
        setTime(elapsed);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isRunning, lastActiveTime]);

  return {
    time,
    isRunning,
    formattedTime,
    startPauseTimer,
    resetTimer,
    audioRef,
  };
};

export default useTimer;