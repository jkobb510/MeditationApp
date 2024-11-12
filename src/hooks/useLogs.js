import { useState, useEffect, useCallback } from 'react';

const useLogs = () => {
  const [logs, setLogs] = useState([]);

  // Load logs from localStorage on mount
  useEffect(() => {
    const savedLogs = JSON.parse(localStorage.getItem('sessionLogs')) || [];
    setLogs(savedLogs);
  }, []);

  // Save a new log
  const saveLog = useCallback((timeElapsed) => {
    const date = new Date();
    const dateStr = date.toLocaleDateString();
    const timeStr = date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    const newRecord = { date: dateStr, time: timeStr, timeRecorded: timeElapsed };

    const updatedLogs = [...logs, newRecord];
    setLogs(updatedLogs);
    localStorage.setItem('sessionLogs', JSON.stringify(updatedLogs));
  }, [logs]);

  return { logs, saveLog };
};

export default useLogs;
