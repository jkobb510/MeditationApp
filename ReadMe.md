
# React Custom Hooks

## useTimer Hook - hooks/useTimer.js
- Starts and pauses the timer with a single function call
- Resets the timer to its initial value
- Plays an audio cue when the timer starts
- Calculates animation progress for a conic gradient effect
- Returns the current time, running state, and animation style

## useLogs Hook - hooks/useLogs.js
- Manages a list of session logs
- Loads logs from localStorage on mount
- Adds a new log to the list
- Returns the logs and saveLog function

# App.js
- Imports and uses the useTimer and useLogs hooks
- Sets up the timer and logs components
- Handles reset functionality

# TimerDisplay.js
- Displays the current time in the timer circle

# Controls.js
- Handles start, pause, and reset functionality

# LogContainer.js
- Displays the list of logs

# index.js
- Renders the App component