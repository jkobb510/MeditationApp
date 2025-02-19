import React from 'react';

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
              <td>{log.timeRecorded || '00:00' }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LogContainer;