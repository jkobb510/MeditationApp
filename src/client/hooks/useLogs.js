import { useState, useEffect, useCallback } from 'react';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || process.env.RENDER_API_URL;
console.log(`API Base URL: ${API_BASE_URL}`);
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

const saveLog = useCallback((startTime, endTime = Date.now(), username = 'jkobb510') => {
  const totalSeconds = Math.floor((endTime - startTime) / 1000);

  if (totalSeconds < 60) return;

  const date = new Date();
  const newRecord = {
    username,
    date: date.toLocaleDateString(),
    time: date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
    timeRecorded: new Date(totalSeconds * 1000).toISOString().substr(11, 8), // HH:mm:ss
    durationSeconds: totalSeconds,
  };

  setLogs((prevLogs) => [...prevLogs, newRecord]);

  fetch(`${API_BASE_URL}/api/save-session`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newRecord),
  })
    .then(() => fetch(`${API_BASE_URL}/api/sessions`))
    .then((res) => res.json())
    .then((updatedLogs) => setLogs(updatedLogs))
    .catch((err) => {
      console.warn('Failed to save session to server.', err);
  });
}, []);


  return { logs, saveLog, loading };
};

export default useLogs;