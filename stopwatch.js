let minutes = 0, seconds = 0, centiseconds = 0;
let timer = null;
let running = false;
let lapCounter = 1;

const display = document.getElementById("display");
const startButton = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");
const lapButton = document.getElementById("lapButton");
const resetButton = document.getElementById("resetButton");
const lapsList = document.getElementById("lapsList");

function formatTime() {
    const m = String(minutes).padStart(2, "0");
    const s = String(seconds).padStart(2, "0");
    const cs = String(centiseconds).padStart(2, "0");
    return `${m}:${s}:${cs}`;
}

function updateDisplay() {
    display.textContent = formatTime();
}

function runTimer() {
    centiseconds++;
    if (centiseconds === 100) {
        centiseconds = 0;
        seconds++;
    }
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }
    updateDisplay();
}

function startTimer() {
    if (!running) {
        running = true;
        timer = setInterval(runTimer, 10);
        
        startButton.disabled = true;
        pauseButton.disabled = false;
        lapButton.disabled = false;
        resetButton.disabled = false;
        
        startButton.textContent = "START";
    }
}

function pauseTimer() {
    if (running) {
        running = false;
        clearInterval(timer);
        
        startButton.disabled = false;
        pauseButton.disabled = true;
        lapButton.disabled = true;
        resetButton.disabled = false;
        
        startButton.textContent = "RESUME";
    }
}

function recordLap() {
    if (running) {
        const timeString = formatTime();
        const li = document.createElement("li");
        li.innerHTML = `<span>Lap ${lapCounter}</span><span>${timeString}</span>`;
        lapsList.prepend(li);
        lapCounter++;
        lapsList.parentNode.scrollTop = 0;
    }
}

function resetTimer() {
    clearInterval(timer);
    running = false;
    minutes = 0;
    seconds = 0;
    centiseconds = 0;
    lapCounter = 1;
    updateDisplay();
    
    lapsList.innerHTML = "";
    
    startButton.disabled = false;
    pauseButton.disabled = true;
    lapButton.disabled = true;
    resetButton.disabled = true;
    
    startButton.textContent = "START";
}

function initialize() {
    updateDisplay();
    startButton.disabled = false;
    pauseButton.disabled = true;
    lapButton.disabled = true;
    resetButton.disabled = true;
}

startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
lapButton.addEventListener("click", recordLap);
resetButton.addEventListener("click", resetTimer);

initialize();