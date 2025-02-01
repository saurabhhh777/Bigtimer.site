import { useState, useEffect } from "react";

export default function CountdownTimer() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timeLeft, setTimeLeft] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Function to start or resume the countdown
  const startCountdown = () => {
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    if (!isPaused && totalSeconds > 0 && totalSeconds <= 86400) { // Start only if not paused
      setTimeLeft(totalSeconds);
    }
    setIsRunning(true);
    setIsPaused(false);
  };

  // Function to pause the countdown
  const pauseCountdown = () => {
    setIsPaused(true);
    setIsRunning(false);
  };

  // Function to reset the countdown
  const resetCountdown = () => {
    setTimeLeft(null);
    setIsRunning(false);
    setIsPaused(false);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  // Countdown effect
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
    if (timeLeft === 0) {
      setIsRunning(false);
    }
  }, [isRunning, timeLeft]);

  // Convert timeLeft to display format
  const formatTime = () => {
    const h = Math.floor(timeLeft / 3600);
    const m = Math.floor((timeLeft % 3600) / 60);
    const s = timeLeft % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-7xl font-extrabold mb-12">Countdown Timer</h1>

      <div className="bg-gray-800 p-10 rounded-2xl shadow-2xl flex flex-col items-center min-w-[450px]">
        {!isRunning && !isPaused ? (
          <div className="flex space-x-6">
            <input
              type="number"
              min="0"
              max="24"
              value={hours}
              onChange={(e) => setHours(Math.min(24, Math.max(0, Number(e.target.value))))}
              className="w-32 text-6xl p-4 text-center bg-gray-700 text-white rounded-xl"
              placeholder="H"
            />
            <input
              type="number"
              min="0"
              max="59"
              value={minutes}
              onChange={(e) => setMinutes(Math.min(59, Math.max(0, Number(e.target.value))))}
              className="w-32 text-6xl p-4 text-center bg-gray-700 text-white rounded-xl"
              placeholder="M"
            />
            <input
              type="number"
              min="0"
              max="59"
              value={seconds}
              onChange={(e) => setSeconds(Math.min(59, Math.max(0, Number(e.target.value))))}
              className="w-32 text-6xl p-4 text-center bg-gray-700 text-white rounded-xl"
              placeholder="S"
            />
          </div>
        ) : (
          <h2 className="text-9xl font-extrabold bg-gray-700 py-6 px-12 rounded-2xl shadow-2xl">
            {formatTime()}
          </h2>
        )}

        <div className="mt-8 flex space-x-6">
          {!isRunning && !isPaused && (
            <button
              onClick={startCountdown}
              className="px-8 py-4 text-4xl bg-blue-600 hover:bg-blue-700 rounded-2xl shadow-lg"
            >
              Start Countdown
            </button>
          )}

          {isRunning && (
            <button
              onClick={pauseCountdown}
              className="px-8 py-4 text-4xl bg-yellow-600 hover:bg-yellow-700 rounded-2xl shadow-lg"
            >
              Pause
            </button>
          )}

          {isPaused && (
            <>
              <button
                onClick={startCountdown}
                className="px-8 py-4 text-4xl bg-green-600 hover:bg-green-700 rounded-2xl shadow-lg"
              >
                Resume
              </button>
              <button
                onClick={resetCountdown}
                className="px-8 py-4 text-4xl bg-red-600 hover:bg-red-700 rounded-2xl shadow-lg"
              >
                Reset
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
