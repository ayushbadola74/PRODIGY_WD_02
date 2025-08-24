// Variables
let [hours, minutes, seconds, milliseconds] = [0, 0, 0, 0];
let timer = null;
let running = false;
let lapCount = 0;

// DOM Elements
const display = document.getElementById("display");
const startStopBtn = document.getElementById("startStop");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const laps = document.getElementById("laps");

// Update display
function updateDisplay() {
  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;
  let ms = milliseconds < 10 ? "0" + milliseconds : milliseconds;
  display.innerHTML = `${h}:${m}:${s}.${ms}`;
}

// Stopwatch logic
function stopwatch() {
  milliseconds++;
  if (milliseconds === 100) {
    milliseconds = 0;
    seconds++;
  }
  if (seconds === 60) {
    seconds = 0;
    minutes++;
  }
  if (minutes === 60) {
    minutes = 0;
    hours++;
  }
  updateDisplay();
}

// Start / Pause
startStopBtn.addEventListener("click", () => {
  if (!running) {
    timer = setInterval(stopwatch, 10);
    startStopBtn.innerText = "Pause";
    running = true;
  } else {
    clearInterval(timer);
    startStopBtn.innerText = "Start";
    running = false;
  }
});

// Reset
resetBtn.addEventListener("click", () => {
  clearInterval(timer);
  [hours, minutes, seconds, milliseconds] = [0, 0, 0, 0];
  updateDisplay();
  startStopBtn.innerText = "Start";
  running = false;
  laps.innerHTML = "";
  lapCount = 0;
});

// Lap
lapBtn.addEventListener("click", () => {
  if (running) {
    lapCount++;
    let lapTime = document.createElement("div");
    lapTime.className = "lap-item";
    lapTime.innerHTML = `<span class="lap-number">Lap ${lapCount}</span> <span>${display.innerText}</span>`;
    laps.appendChild(lapTime);

    // auto-scroll to latest lap
    laps.scrollTop = laps.scrollHeight;
  }
});

// Initialize display
updateDisplay();
