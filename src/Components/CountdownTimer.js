import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const [time, setTime] = useState(7200); //2 hours in seconds
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(7200);
  };

  const handleTimeChange = (event) => {
    const newTime = parseInt(event.target.value, 10) * 60; // Converted minutes in to seconds........
    setTime(newTime);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  return (
    <div>
      <h1>Countdown Timer</h1>
      <div>
        <label>
          Set Time (minutes):
          <input type="number" min="1" value={time / 60} onChange={handleTimeChange} />
        </label>
      </div>
      <div>
        <p>Time Remaining: {formatTime(time)}</p>
      </div>
      <div>
        <button onClick={handleStartStop}>{isRunning ? 'Stop' : 'Start'}</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

// function App() {
//   return (
//     <div className="App">
//       <CountdownTimer />
//     </div>
//   );
// }

// export default App;
export default CountdownTimer;
