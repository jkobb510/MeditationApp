import { useState, useEffect, useCallback } from 'react';

const useLogs = () => {
  const [logs, setLogs] = useState([]);

  // Load logs from localStorage on mount
  useEffect(() => {
    const savedLogs = JSON.parse(localStorage.getItem('sessionLogs')) || [];
    fetch('http://localhost:5001/api/sessions')
      .then((res) => res.json())
      .then((data) => {
        const combinedLogs = mergeLogs(savedLogs, data);
        setLogs(combinedLogs);
        localStorage.setItem('sessionLogs', JSON.stringify(combinedLogs));
      })
      .catch((err) => console.error('Failed to load sessions', err));
  }, []);

  const saveLog = useCallback((formattedTime, username = 'jkobb510') => {
    const timeParts = formattedTime.split(':').map(Number);
    let totalSeconds;
    if (timeParts.length === 3) {
      const [hours, minutes, seconds] = timeParts;
      totalSeconds = hours * 3600 + minutes * 60 + seconds;
    } else {
      const [minutes, seconds] = timeParts;
      totalSeconds = minutes * 60 + seconds;
    }

    if (totalSeconds < 60) return;

    const date = new Date();
    const dateStr = date.toLocaleDateString();
    const timeStr = date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    const newRecord = { username, date: dateStr, time: timeStr, timeRecorded: formattedTime };

    const updatedLogs = [...logs, newRecord];
    setLogs(updatedLogs);
    localStorage.setItem('sessionLogs', JSON.stringify(updatedLogs));

    // Save to database
    fetch('http://localhost:5001/api/save-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRecord),
    }).catch((err) => console.error('Failed to save session', err));
  }, [logs]);

  return { logs, saveLog };
};

const mergeLogs = (localLogs, dbLogs) => {
  const allLogs = [...localLogs, ...dbLogs];

  // Remove duplicates based on date, time, and timeRecorded
  const uniqueLogs = allLogs.reduce((acc, log) => {
    const exists = acc.some(
      (item) => item.date === log.date && item.time === log.time && item.timeRecorded === log.timeRecorded
    );
    if (!exists) acc.push(log);
    return acc;
  }, []);

  return uniqueLogs;
};

export default useLogs;