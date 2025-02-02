import React from 'react';

const LogContainer = ({ logs }) => {
  return (
    <div id="logContainer">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Time Recorded</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={index}>
              <td>{log.date}</td>
              <td>{log.time}</td>
              <td>{log.timeRecorded || '00:00' }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LogContainer;