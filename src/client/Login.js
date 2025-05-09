import React, { useState } from 'react';
import Logo from './assets/logo.png'; // Ensure you have a logo image in your assets folder
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
<div style={{ width: 250, height: 230, overflow: 'hidden', marginBottom: 20 }}>
  <img src={Logo} alt="Logo" style={{ width: 250, height: 250, display: 'block' }} />
</div>

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
          autocomplete="new-username"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
          autocomplete="new-password"
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
  width: '80%',
  padding: '15px',
  margin: '10px 0',
  backgroundColor: '#0a0a0a',
  border: '1px solid #cfcfcf',
  color: '#cfcfcf',
  borderRadius: '4px',
  fontSize: '16px',
  autocomplete: 'off',
};

const buttonStyle = {
  width: '80%',
  padding: '15px',
  marginTop: '10px',
  backgroundColor: '#cfcfcf',
  color: '#0a0a0a',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};


export default Login;