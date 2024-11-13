import { useState, useEffect, useCallback, useRef } from 'react';

const useTimer = (initialTime = 600) => {
    const [time, setTime] = useState(initialTime);
    const [isRunning, setIsRunning] = useState(false);
    const initialTimeRef = useRef(initialTime);
    const audioRef = useRef(null);

  const startPauseTimer = useCallback(() => {
    if (time > 0)
        if (time === initialTimeRef.current && !isRunning) {
            audioRef.current.play();
        }
        setIsRunning((prev) => !prev);
  }, [time], isRunning);

  const resetTimer = useCallback(() => {
    setTime(initialTimeRef.current);
    setIsRunning(false);
  }, [time, initialTimeRef]);

 const formattedTime = `${Math.floor(time / 60)}:${time % 60 < 10 ? '0' : ''}${time % 60}`;


  // Handle the timer countdown
    useEffect(() => {
    if (!isRunning || time === 0) {
        setIsRunning(false);
        return;
    }
    const timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
    }, [isRunning, time]);


  return {
    time,
    isRunning,
    formattedTime,
    startPauseTimer,
    resetTimer,
    audioRef
  };
};

export default useTimer;
