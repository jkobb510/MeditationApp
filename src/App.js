import React, { useState } from 'react';
import Login from './Login';
import MainApp from './MainApp';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = (uname) => {
    setUsername(uname);
    setIsLoggedIn(true);
  };

  return isLoggedIn ? <MainApp username={username} /> : <Login onLogin={handleLogin} />;
}

export default App;