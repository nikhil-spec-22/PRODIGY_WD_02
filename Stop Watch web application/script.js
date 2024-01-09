document.addEventListener("DOMContentLoaded", () => {
    let timer;
    let isRunning = false;
    let startTime;
    let elapsedTime = 0;

    const display = document.getElementById("display");
    const startPauseButton = document.getElementById("startPause");
    const lapButton = document.getElementById("lap");
    const resetButton = document.getElementById("reset");
    const lapsList = document.getElementById("laps");

    startPauseButton.addEventListener("click", toggleStartPause);
    lapButton.addEventListener("click", recordLap);
    resetButton.addEventListener("click", resetStopwatch);

    function toggleStartPause() {
        if (isRunning) {
            pauseStopwatch();
        } else {
            startStopwatch();
        }
    }

    function startStopwatch() {
        startPauseButton.textContent = "Pause";
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateDisplay, 10);
    }

    function pauseStopwatch() {
        startPauseButton.textContent = "Resume";
        isRunning = false;
        clearInterval(timer);
    }

    function updateDisplay() {
        const now = Date.now();
        elapsedTime = now - startTime;
        display.textContent = formatTime(elapsedTime);
    }

    function recordLap() {
        const lapTime = formatTime(elapsedTime);
        const lapItem = document.createElement("li");
        lapItem.textContent = `Lap ${lapsList.children.length + 1}: ${lapTime}`;
        lapsList.prepend(lapItem);
    }

    function resetStopwatch() {
        clearInterval(timer);
        isRunning = false;
        elapsedTime = 0;
        display.textContent = "00:00:00";
        startPauseButton.textContent = "Start";
        lapsList.innerHTML = "";
    }

    function formatTime(milliseconds) {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const millis = Math.floor((milliseconds % 1000) / 10);

        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(millis).padStart(2, '0')}`;
    }
});
