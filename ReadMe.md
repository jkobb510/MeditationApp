### Site: https://jkobb510.github.io/MeditationApp/

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

```sh


Timer/getRandomMantra.js
Timer/mantras.json
Timer/Timer.css
Timer/TimerDisplay.js

hooks/useAudio.js
hooks/useLogs.js
hooks/useOutsideClick.js
hooks/useTimeGraphData.js
hooks/useTimer.js
hooks/useWarning.js

tests/Control.test.js
tests/useLogs.test.js

App.css
Login.js
MainApp.js
Tooltip.js

server/routes/sessions.js
server/routes/app.js
server/db.js
server/App.js

index.html
index.js

client/Components/Buttons/About/About.css
client/Components/Buttons/About/About.js
client/Components/Buttons/About/AboutModal.js

client/Components/Buttons/Sessions/ChartConfig.js
client/Components/Buttons/Sessions/Graph.css
client/Components/Buttons/Sessions/LogContainer.js
client/Components/Buttons/Sessions/Sessions.js
client/Components/Buttons/Sessions/TimeGraph.js

client/Components/Buttons/StartStop/Controls.css
client/Components/Buttons/StartStop/Controls.js
client/Components/Buttons/StartStop/PauseIcon.js
client/Components/Buttons/StartStop/PlayIcon.js
client/Components/Buttons/StartStop/ResetButton.js

client/Components/Buttons/ToggleAudio/Audio.css
client/Components/Buttons/ToggleAudio/ToggleAudio.js




```

```sh

```
