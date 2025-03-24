import React, { useState } from 'react';
import Logo from './Logo.png';
import tooltip from './tooltip.svg';
import { color } from 'chart.js/helpers';
import Tooltip from './client/Tooltip';
const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showWarning, setShowWarning] = useState(false);
const [showTooltip, setShowTooltip] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setShowWarning(true);
      return;
    }
    setShowWarning(false);
    if (onLogin) onLogin(username);
  };

  return (
      <div style={{ position: 'relative', height: '100vh' }}>
<Tooltip iconSrc={tooltip}>
  You can login with any username and password. 
  Username will be stored and used to record meditation time.
</Tooltip>



    <div
      className="container"
      style={{
        position: 'relative', // <== Add this line
        maxWidth: 400,
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 auto',
        flexDirection: 'column',
        transform: 'translateY(-50px)',
      }}
    >
    <img src={Logo} alt="Logo" style={{ width: 250, height: 250, marginBottom: 20 }} />

      {showWarning && (
        <div style={{ color: '#ff6b6b', marginBottom: '10px', textAlign: 'center' }}>
          Please fill in username and password
        </div>
      )}
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>
          Login
        </button>
      </form>
    </div>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '15px',
  margin: '10px 0',
  backgroundColor: '#0a0a0a',
  border: '1px solid #cfcfcf',
  color: '#cfcfcf',
  borderRadius: '4px',
};

const buttonStyle = {
  width: '100%',
  padding: '15px',
  marginTop: '10px',
  backgroundColor: '#cfcfcf',
  color: '#0a0a0a',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};


export default Login;