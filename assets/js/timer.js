let startTime;
let timerRunning = false;
let paused = false;
let pausedTime;
let interval;

document.getElementById('startStopButton').addEventListener('click', function () {
    if (!timerRunning && !paused) {
        // Rozpoczęcie timera
        startTime = new Date();
        interval = setInterval(calculateEarning, 1000);
        timerRunning = true;
        document.getElementById('pauseButton').textContent = 'Pause'; // Resetowanie tekstu przycisku pauzy
    } else if (timerRunning || paused) {
        // Zatrzymanie timera
        clearInterval(interval);
        timerRunning = false;
        paused = false;
        document.getElementById('pauseButton').textContent = 'Pause'; // Resetowanie tekstu przycisku pauzy
    }
});

document.getElementById('pauseButton').addEventListener('click', function () {
    if (!paused && timerRunning) {
        // Pauzowanie timera
        clearInterval(interval);
        pausedTime = new Date();
        paused = true;
        timerRunning = false;
        this.textContent = 'Resume';
    } else if (paused && !timerRunning) {
        // Wznowienie timera
        const pauseDuration = new Date() - pausedTime;
        startTime = new Date(startTime.getTime() + pauseDuration);
        interval = setInterval(calculateEarning, 1000);
        paused = false;
        timerRunning = true;
        this.textContent = 'Pause';
    }
});

function calculateEarning() {
    const hourlyRate = document.getElementById('hourlyRate').value;
    const now = new Date();
    const difference = now - startTime; // różnica w milisekundach
    const hoursWorked = difference / (1000 * 60 * 60);
    const earning = (hourlyRate * hoursWorked).toFixed(2);
    document.getElementById('earning').textContent = `total: ${earning}`;
}
