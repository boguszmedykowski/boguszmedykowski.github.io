const waveCanvas = document.getElementById('waveCanvas');
const skyCanvas = document.getElementById('skyCanvas');
const waveCtx = waveCanvas.getContext('2d');
const skyCtx = skyCanvas.getContext('2d');
let wave1, wave2, wave3;
let increment1, increment2, increment3;
let clouds = [];

function setupWaves() {
    waveCanvas.width = window.innerWidth;
    waveCanvas.height = window.innerHeight / 2;

    const waterHeightStart = waveCanvas.height * 0.6;

    wave1 = {
        y: waterHeightStart + waveCanvas.height * 0.2,
        length: 0.05,
        amplitude: 4,
        frequency: 0.05
    };

    wave2 = {
        y: waterHeightStart + waveCanvas.height * 0.25,
        length: 0.04,
        amplitude: 6,
        frequency: 0.04
    };

    wave3 = {
        y: waterHeightStart + waveCanvas.height * 0.3,
        length: 0.03,
        amplitude: 10,
        frequency: 0.03
    };

    increment1 = wave1.frequency;
    increment2 = wave2.frequency;
    increment3 = wave3.frequency;
}

function drawWave(wave, gradient, increment) {
    waveCtx.beginPath();
    waveCtx.moveTo(0, wave.y);

    for (let i = 0; i < waveCanvas.width; i++) {
        waveCtx.lineTo(i, wave.y + Math.sin(i * wave.length + increment) * wave.amplitude * Math.sin(increment));
    }

    waveCtx.lineTo(waveCanvas.width, waveCanvas.height);
    waveCtx.lineTo(0, waveCanvas.height);
    waveCtx.closePath();

    waveCtx.fillStyle = gradient;
    waveCtx.fill();
}



function animateWaves() {
    requestAnimationFrame(animateWaves);
    waveCtx.clearRect(0, 0, waveCanvas.width, waveCanvas.height);


    let gradient1 = waveCtx.createLinearGradient(0, 0, 0, waveCanvas.height);
    gradient1.addColorStop(0, 'darkslategray');
    gradient1.addColorStop(1, 'darkblue');
    drawWave(wave1, gradient1, increment1);
    increment1 += wave1.frequency;

    let gradient2 = waveCtx.createLinearGradient(0, 0, 0, waveCanvas.height);
    gradient2.addColorStop(0, 'slategray');
    gradient2.addColorStop(1, 'mediumblue');
    drawWave(wave2, gradient2, increment2);
    increment2 += wave2.frequency;

    let gradient3 = waveCtx.createLinearGradient(0, 0, 0, waveCanvas.height);
    gradient3.addColorStop(0, 'blue');
    gradient3.addColorStop(1, 'black');
    drawWave(wave3, gradient3, increment3);
    increment3 += wave3.frequency;
}

function setupSky() {
    skyCanvas.width = window.innerWidth;
    skyCanvas.height = window.innerHeight / 2;
    createClouds();
}

function drawLightning() {
    let x = Math.random() * skyCanvas.width;
    let y = Math.random() * skyCanvas.height * 0.5;

    skyCtx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    skyCtx.lineWidth = 2;
    skyCtx.beginPath();
    skyCtx.moveTo(x, y);
    skyCtx.lineTo(x + Math.random() * 30 - 15, y + Math.random() * 80 + 20);
    skyCtx.lineTo(x, y + Math.random() * 80 + 40);
    skyCtx.stroke();
}

function createClouds() {
    clouds = [];
    for (let i = 0; i < 7; i++) {
        clouds.push({
            x: Math.random() * skyCanvas.width,
            y: Math.random() * skyCanvas.height * 0.5,
            size: Math.random() * 100 + 100
        });
    }
}

function drawCloud(cloud) {
    let x = cloud.x;
    let y = cloud.y;
    let size = cloud.size;

    skyCtx.beginPath();
    skyCtx.fillStyle = 'rgba(50, 50, 50, 0.8)';
    skyCtx.arc(x, y, size * 0.5, Math.PI * 0.5, Math.PI * 1.5);
    skyCtx.arc(x + size * 0.5, y - size * 0.4, size * 0.6, Math.PI * 1, Math.PI * 2);
    skyCtx.arc(x + size * 1.1, y, size * 0.7, Math.PI * 1.5, Math.PI * 0.5);
    skyCtx.fill();
}

function updateClouds() {
    clouds.forEach(cloud => {
        cloud.x += 1;
        if (cloud.x > skyCanvas.width) {
            cloud.x = -200;
            cloud.y = Math.random() * skyCanvas.height * 0.5;
            cloud.size = Math.random() * 100 + 100;
        }
    });
}

function drawMoon() {
    const moonX = skyCanvas.width / 2;
    const moonY = skyCanvas.height / 4;
    const moonRadius = 70;

    skyCtx.beginPath();
    skyCtx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2, false);
    skyCtx.fillStyle = 'rgba(255, 255, 220, 0.8)';
    skyCtx.fill();
}

function drawSky() {
    let gradient = skyCtx.createLinearGradient(0, 0, 0, skyCanvas.height);
    gradient.addColorStop(0, 'black');
    gradient.addColorStop(1, 'gray');

    skyCtx.fillStyle = gradient;
    skyCtx.fillRect(0, 0, skyCanvas.width, skyCanvas.height);

    drawMoon();

    clouds.forEach(drawCloud);
    updateClouds();

    if (Math.random() < 0.05) {
        drawLightning();
    }
}

function animateSky() {
    requestAnimationFrame(animateSky);
    drawSky();
}

setupWaves();
setupSky();
window.addEventListener('resize', () => {
    setupWaves();
    setupSky();
});

animateWaves();
animateSky();
