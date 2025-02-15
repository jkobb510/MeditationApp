// src/hooks/useAudio.js
import { useState } from "react";

const useAudio = (audioRef, isRunning) => {
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [pendingUnmute, setPendingUnmute] = useState(false);

  const toggleAudio = () => {
    setIsAudioOn((prevIsAudioOn) => {
      const newIsAudioOn = !prevIsAudioOn;
      if (audioRef.current) {
        if (!newIsAudioOn) {
          audioRef.current.muted = true;
          setPendingUnmute(false);
        } else if (isRunning) {
          setPendingUnmute(true);
        } else {
          audioRef.current.muted = false;
        }
      }
      return newIsAudioOn;
    });
  };

  const resetAudio = () => {
    if (pendingUnmute) {
      setIsAudioOn(true);
      if (audioRef.current) {
        audioRef.current.muted = false;
      }
      setPendingUnmute(false);
    }
  };

  return { isAudioOn, toggleAudio, resetAudio };
};

export default useAudio;
