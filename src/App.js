import React, { useState } from 'react';
import Login from './client/Login';
import MainApp from './client/MainApp';

function App() {
const [username, setUsername] = useState(() => localStorage.getItem('username') || '');
const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('username'));

  const handleLogin = (uname) => {
    localStorage.setItem('username', uname);
    setUsername(uname);
    setIsLoggedIn(true);
  };
  const handleLogout = () => {
  localStorage.removeItem('username');
  setUsername('');
  setIsLoggedIn(false);
};

  return username ? <MainApp username={username} onLogout={handleLogout} /> : <Login onLogin={handleLogin} />;
}

export default App;