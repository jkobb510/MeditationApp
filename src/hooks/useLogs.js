import { useState, useEffect, useCallback } from 'react';

const useLogs = () => {
  const [logs, setLogs] = useState([]);

  // Load logs from localStorage on mount
  useEffect(() => {
    const savedLogs = JSON.parse(localStorage.getItem('sessionLogs')) || [];
    setLogs(savedLogs);
  }, []);

  const saveLog = useCallback((formattedTime) => {
    const timeParts = formattedTime.split(':').map(Number);
    let totalSeconds;
    if (timeParts.length === 3) {
    // "HH:MM:SS" format
      const [hours, minutes, seconds] = timeParts;

    } else {
      // "MM:SS" format
      const [minutes, seconds] = timeParts;
      totalSeconds = minutes * 60 + seconds;
    }

    if (totalSeconds < 60) return; 
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