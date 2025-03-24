import React, { useState } from 'react';
import Login from './Login';
import MainApp from './MainApp';

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

  return isLoggedIn ? <MainApp username={username} /> : <Login onLogin={handleLogin} />;
}

export default App;