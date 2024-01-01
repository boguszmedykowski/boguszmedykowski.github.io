document.addEventListener('DOMContentLoaded', function() {
    createFogLayer(100, 'fogg-canvas', 20, true); // Pierwsza warstwa mgły, reaguje na myszkę
    createFogLayer(50, 'fogg-canvas2', 50, false); // Druga warstwa mgły, nie reaguje na myszkę
});

function createFogLayer(numberOfParticles, className, particleSize, reactsToMouse) {
    for (let i = 0; i < numberOfParticles; i++) {
        const element = document.createElement('div');
        element.classList.add(className);
        element.velocity = { x: 0, y: 0 }; // Inicjalizacja prędkości
        resetParticlePosition(element, particleSize);
        document.body.appendChild(element);

        setInterval(() => {
            moveParticleInRandomDirection(element);
            applyInertia(element);
        }, 100);
    }

    if (reactsToMouse) {
        document.addEventListener('mousemove', (e) => {
            document.querySelectorAll('.' + className).forEach(particle => {
                pushParticle(particle, e);
            });
        });
    }
}

function resetParticlePosition(element, size) {
    element.style.left = Math.random() * window.innerWidth + 'px';
    element.style.top = Math.random() * window.innerHeight + 'px';
    const particleSize = Math.random() * size; 
    element.style.width = particleSize + 'vw';
    element.style.height = particleSize + 'vh';
    element.style.opacity = 1;
    element.velocity = { x: 0, y: 0 }; // Reset prędkości
}

function moveParticleInRandomDirection(element) {
    const angle = Math.random() * Math.PI * 2;
    const distance = 5;
    element.velocity.x += Math.cos(angle) * distance;
    element.velocity.y += Math.sin(angle) * distance;
}

function applyInertia(element) {
    element.style.left = (element.offsetLeft + element.velocity.x) + 'px';
    element.style.top = (element.offsetTop + element.velocity.y) + 'px';
    element.velocity.x *= 0.95; // Tłumienie prędkości
    element.velocity.y *= 0.95;
}

function pushParticle(particle, e) {
    const deltaX = particle.offsetLeft + particle.offsetWidth / 2 - e.clientX;
    const deltaY = particle.offsetTop + particle.offsetHeight / 2 - e.clientY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const maxDistance = 300;
    const pushFactor = 5;

    if (distance < maxDistance) {
        const angle = Math.atan2(deltaY, deltaX);
        particle.velocity.x += Math.cos(angle) * pushFactor;
        particle.velocity.y += Math.sin(angle) * pushFactor;
    }
}
