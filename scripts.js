function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

document.getElementsByClassName("tablinks")[0].click(); // Otwiera pierwszą zakładkę





document.addEventListener('DOMContentLoaded', function () {
    let elementCount = 0;
    let removedCount = 13;

    const shirimeButton = document.querySelector('.shirime');
    const eye = document.getElementById('bigEye');
    const counterElement = document.getElementById('removedCounter');
    const fogLayer = document.querySelector('.fog-layer');
    const shirimeContainer = document.querySelector('.shirime-container');
    let isAnimationTriggered = false;

    function updateRemovedCounter() {
        counterElement.textContent = `${removedCount}`;

        let shirimeLetters = document.querySelectorAll('.shirime span');
        if (removedCount > 0 && removedCount <= shirimeLetters.length) {
            let letterToChange = shirimeLetters[shirimeLetters.length - removedCount];
            letterToChange.style.color = 'white';
            letterToChange.style.textShadow = '0 0 10px white, 0 0 20px white, 0 0 30px white, 0 0 40px white, 0 0 50px white, 0 0 60px white, 0 0 70px white';
        }

        updateShirimeContainer();
    }

    function updateShirimeContainer() {
        if (shirimeContainer) {
            if (removedCount < 2) {
                shirimeContainer.style.boxShadow = '0 0 10px white';
            } else {
                shirimeContainer.style.boxShadow = '0 0 10px black';
            }
        }
    }

    function createRandomElement() {
        if (elementCount < 5 && removedCount > 1) {
            const element = document.createElement('div');
            element.classList.add('element');
            element.style.position = 'absolute';
            element.style.left = Math.random() * document.body.clientWidth + 'px';
            element.style.top = Math.random() * document.body.clientHeight + 'px';
            element.style.width = '20px';
            element.style.height = '20px';

            document.body.appendChild(element);
            elementCount++;

            let size = 20;
            const grow = setInterval(function () {
                size++;
                element.style.width = size + 'px';
                element.style.height = size + 'px';
            }, 100);

            element.addEventListener('mouseover', function () {
                clearInterval(grow);
                element.remove();
                elementCount--;
                removedCount--;
                updateRemovedCounter();
            });
        }
    }

    shirimeButton.addEventListener('click', function () {
        if (removedCount < 2 && !isAnimationTriggered) {
            eye.classList.add('animate-eye');
            shirimeContainer.style.animation = 'fadeOutBlur 2s forwards';
            isAnimationTriggered = true;

            // Nasłuchiwacz, który wykrywa zakończenie animacji 'growAndFade'
            eye.addEventListener('animationend', function () {
                // Usunięcie elementu 'eye' z DOM po zakończeniu animacji
                eye.remove();
            }, { once: true }); // Opcja 'once: true' powoduje, że nasłuchiwacz jest uruchamiany tylko raz
        }
    });




    // Wyłączenie pointer-events na fog-layer
    if (fogLayer) {
        fogLayer.style.pointerEvents = 'none';
    }

    // Inicjalizacja licznika usuniętych elementów na początku
    updateRemovedCounter();

    // Tworzenie elementów
    createRandomElement();
    setInterval(createRandomElement, 3000);
});




