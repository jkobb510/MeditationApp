const { LocalStorage } = require('node-localstorage');

// Set up a storage directory
const localStorage = new LocalStorage('./localStorageData');

const clearLocalStorage = () => {
  localStorage.clear();
  console.log("Local storage cleared.");
};

clearLocalStorage();
