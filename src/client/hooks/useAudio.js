import { useState, useEffect } from "react";

const useAudio = (audioRef, isRunning) => {
  const [isAudioOn, setIsAudioOn] = useState(() => {
    const stored = localStorage.getItem("isAudioOn");
    return stored !== null ? JSON.parse(stored) : true;
  });
  const [pendingUnmute, setPendingUnmute] = useState(false);

  useEffect(() => {
    localStorage.setItem("isAudioOn", JSON.stringify(isAudioOn));
  }, [isAudioOn]);

  // Ensure audio element is muted/unmuted on mount
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = !isAudioOn;
    }
  }, [audioRef, isAudioOn]);

  const toggleAudio = () => {
    setIsAudioOn((prev) => {
      const newSetting = !prev;
      if (audioRef.current) {
        if (!newSetting) {
          audioRef.current.muted = true;
          setPendingUnmute(false);
        } else if (isRunning) {
          setPendingUnmute(true);
        } else {
          audioRef.current.muted = false;
        }
      }
      return newSetting;
    });
  };

  const resetAudio = () => {
    if (pendingUnmute) {
      setIsAudioOn(true);
      if (audioRef.current) audioRef.current.muted = false;
      setPendingUnmute(false);
    }
  };

  return { isAudioOn, toggleAudio, resetAudio };
};

export default useAudio;