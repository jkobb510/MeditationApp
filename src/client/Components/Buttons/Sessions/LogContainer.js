import React from 'react';
import convertTime from '../../../utils/convertTime';

const LogContainer = ({ logs }) => {
  if (logs.length === 0) {
    return <p style={{ marginTop: "20px" }}>You don't have any sessions yet</p>;
  }
  return (
    <div id="logContainer">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time Recorded</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={index}>
              <td>{log.date}</td>
              <td>{log.durationSeconds ? convertTime(log.durationSeconds) : '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LogContainer;