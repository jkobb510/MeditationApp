import { useState, useEffect, useCallback } from 'react';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || process.env.RENDER_API_URL;
console.log(`API Base URL: ${API_BASE_URL}`);
const useLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    console.log('Fetching sessions from server...');
    fetch(`${API_BASE_URL}/api/sessions`)
      .then((res) => res.json())
      .then((serverLogs) => {
        console.log('Received sessions:', serverLogs);
        if (!isMounted || !Array.isArray(serverLogs)) return;
        setLogs(serverLogs);
      })
      .catch((err) => {
        console.warn('Failed to load sessions from server.', err);
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
          console.log('Finished fetching sessions.');
        }
      });

    return () => { isMounted = false; };
  }, []);

  const saveLog = useCallback((startTime, endTime = Date.now(), username = 'jkobb510') => {
    const totalSeconds = Math.floor((endTime - startTime) / 1000);
    console.log(`Calculated duration: ${totalSeconds} seconds`);

    if (totalSeconds < 60) {
      console.log('Session duration less than 60 seconds. Not saving.');
      return;
    }

    const date = new Date();
    const newRecord = {
      username,
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
      timeRecorded: new Date(totalSeconds * 1000).toISOString().substr(11, 8), // HH:mm:ss
      durationSeconds: totalSeconds,
    };

    console.log('Saving new session:', newRecord);
    // Optimistically update local logs
    setLogs((prevLogs) => [...prevLogs, newRecord]);

    fetch(`${API_BASE_URL}/api/save-session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRecord),
    })
      .then((res) => {
        console.log('Save response status:', res.status);
        return res.json();
      })
      .then((data) => {
        console.log('Save response data:', data);
        // Re-fetch sessions after saving
        return fetch(`${API_BASE_URL}/api/sessions`);
      })
      .then((res) => res.json())
      .then((updatedLogs) => {
        console.log('Updated sessions from server:', updatedLogs);
        setLogs(updatedLogs);
      })
      .catch((err) => {
        console.warn('Failed to save session to server.', err);
      });
  }, []);

  return { logs, saveLog, loading };
};

export default useLogs;