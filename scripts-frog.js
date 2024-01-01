// Sprawdzanie, czy urządzenie jest mobilne
if(/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    // Wyświetlenie komunikatu, że strona nie jest dostępna na urządzeniach mobilnych
    document.body.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100vh; color: white; background-color: black; font-size: 20px;"><p>Strona nie jest dostępna na urządzeniach mobilnych.</p></div>';
} else {
    // Uruchamianie skryptu mgły dla innych urządzeń
    document.addEventListener('DOMContentLoaded', function() {
        createFogLayer(100, 'fogg-canvas', 10, true); // Pierwsza warstwa mgły, reaguje na myszkę
        createFogLayer(50, 'fogg-canvas2', 25, false); // Druga warstwa mgły, nie reaguje na myszkę
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
                if (reactsToMouse) applyInertia(element);
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
        element.velocity.x *= 0.95; // Tłumienie prędkości
        element.velocity.y *= 0.95;
        updateParticlePosition(element);
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
            updateParticlePosition(particle);
        }
    }

    function updateParticlePosition(element) {
        element.style.left = (element.offsetLeft + element.velocity.x) + 'px';
        element.style.top = (element.offsetTop + element.velocity.y) + 'px';
        constrainParticleToScreen(element);
    }

    function constrainParticleToScreen(element) {
        const particleRightEdge = element.offsetLeft + element.offsetWidth;
        const particleBottomEdge = element.offsetTop + element.offsetHeight;

        if (element.offsetLeft < 0 || particleRightEdge > window.innerWidth) {
            element.velocity.x = -element.velocity.x; // Odwrócenie kierunku poziomego
        }

        if (element.offsetTop < 0 || particleBottomEdge > window.innerHeight) {
            element.velocity.y = -element.velocity.y; // Odwrócenie kierunku pionowego
        }
    }
}
