import { useState, useEffect, useCallback } from 'react';

const useLogs = () => {
  const [logs, setLogs] = useState(() => {
    // Load from localStorage first
    return JSON.parse(localStorage.getItem('sessionLogs')) || [];
  });

  useEffect(() => {
    let isMounted = true;
    const savedLogs = JSON.parse(localStorage.getItem('sessionLogs')) || [];
    fetch('http://localhost:5001/api/sessions')
      .then((res) => res.json())
      .then((serverLogs) => {
        if (!isMounted) return;
        const combinedLogs = mergeLogs(savedLogs, serverLogs);
        setLogs(combinedLogs);
        localStorage.setItem('sessionLogs', JSON.stringify(combinedLogs));
      })
      .catch((err) => {
        console.warn('Failed to load sessions from server. Using local logs.', err);
      });

    return () => {
      isMounted = false; // Prevents setting state after unmount
    };
  }, []);

  const saveLog = useCallback((formattedTime, username = 'jkobb510') => {
    const timeParts = formattedTime.split(':').map(Number);
    let totalSeconds = timeParts.length === 3
      ? timeParts[0] * 3600 + timeParts[1] * 60 + timeParts[2]
      : timeParts[0] * 60 + timeParts[1];

    if (totalSeconds < 60) return; // Ignore logs under 1 min

    const date = new Date();
    const newRecord = {
      username,
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
      timeRecorded: formattedTime,
    };

    const updatedLogs = [...logs, newRecord];
    setLogs(updatedLogs);
    localStorage.setItem('sessionLogs', JSON.stringify(updatedLogs));

    fetch('http://localhost:5001/api/save-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRecord),
    }).catch((err) => {
      console.warn('Failed to save session to server. Log saved locally.', err);
    });
  }, [logs]);

  return { logs, saveLog };
};

const mergeLogs = (localLogs, dbLogs) => {
  if (!Array.isArray(dbLogs)) return localLogs; // Fallback if server response is invalid

  const allLogs = [...localLogs, ...dbLogs];

  // Remove duplicates based on date, time, and timeRecorded
  return allLogs.reduce((acc, log) => {
    if (!acc.some(item =>
      item.date === log.date &&
      item.time === log.time &&
      item.timeRecorded === log.timeRecorded
    )) {
      acc.push(log);
    }
    return acc;
  }, []);
};

export default useLogs;