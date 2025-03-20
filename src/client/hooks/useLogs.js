import { useState, useEffect, useCallback } from 'react';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001';

const useLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetch(`${API_BASE_URL}/api/sessions`)
      .then((res) => res.json())
      .then((serverLogs) => {
        if (!isMounted || !Array.isArray(serverLogs)) return;
        setLogs(serverLogs);
      })
      .catch((err) => {
        console.warn('Failed to load sessions from server.', err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false; };
  }, []);

  const saveLog = useCallback((formattedTime, username = 'jkobb510') => {
    const timeParts = formattedTime.split(':').map(Number);
    let totalSeconds = timeParts.length === 3
      ? timeParts[0] * 3600 + timeParts[1] * 60 + timeParts[2]
      : timeParts[0] * 60 + timeParts[1];

    if (totalSeconds < 60) return;

    const date = new Date();
    const newRecord = {
      username,
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
      timeRecorded: formattedTime,
    };

    setLogs((prevLogs) => [...prevLogs, newRecord]);

    fetch(`${API_BASE_URL}/api/save-session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRecord),
    }).catch((err) => {
      console.warn('Failed to save session to server.', err);
    });
  }, []);

  return { logs, saveLog, loading };
};

export default useLogs;