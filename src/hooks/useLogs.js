import { useState, useEffect, useCallback } from 'react';

const useLogs = () => {
  const [logs, setLogs] = useState([]);

  // Load logs from localStorage on mount
  useEffect(() => {
    const savedLogs = JSON.parse(localStorage.getItem('sessionLogs')) || [];
    setLogs(savedLogs);
  }, []);

  const saveLog = useCallback((formattedTime) => {
    // Convert "MM:SS" to seconds
    const [minutes, seconds] = formattedTime.split(':').map(Number);
    const totalSeconds = minutes * 60 + seconds;

    if (totalSeconds < 60) return; // Ignore logs under 1 minute

    const date = new Date();
    const dateStr = date.toLocaleDateString();
    const timeStr = date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    const newRecord = { date: dateStr, time: timeStr, timeRecorded: formattedTime };

    const updatedLogs = [...logs, newRecord];
    setLogs(updatedLogs);
    localStorage.setItem('sessionLogs', JSON.stringify(updatedLogs));
  }, [logs]);

  return { logs, saveLog };
};

export default useLogs;