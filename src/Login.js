import React, { useState } from 'react';
import Logo from './Logo.png';
const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showWarning, setShowWarning] = useState(false);

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
    <div
      className="container"
      style={{
        maxWidth: 400,
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 auto',
        flexDirection: 'column',
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
  );
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  margin: '10px 0',
  backgroundColor: '#0a0a0a',
  border: '1px solid #cfcfcf',
  color: '#cfcfcf',
  borderRadius: '4px',
};

const buttonStyle = {
  width: '100%',
  padding: '10px',
  marginTop: '10px',
  backgroundColor: '#cfcfcf',
  color: '#0a0a0a',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default Login;