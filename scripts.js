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
    const shirimeButton = document.querySelector('.shirime');
    const eye = document.getElementById('bigEye');

    shirimeButton.addEventListener('click', function () {
        if (eye.classList.contains('eye-closed')) {
            eye.classList.remove('eye-closed');
            eye.classList.add('eye-open');
        } else {
            eye.classList.remove('eye-open');
            eye.classList.add('eye-closed');
        }
    });
});



// czarne dziury

document.addEventListener('DOMContentLoaded', function () {
    let elementCount = 0; // Licznik śledzący ilość elementów na stronie
    let removedCount = 13; // Licznik śledzący ilość usuniętych elementów

    function updateRemovedCounter() {
        const counterElement = document.getElementById('removedCounter');
        counterElement.textContent = `${removedCount}`;

        // Zaktualizuj styl liter w .shirime
        let shirimeLetters = document.querySelectorAll('.shirime span');
        if (removedCount > 0 && removedCount <= shirimeLetters.length) {
            let letterToChange = shirimeLetters[shirimeLetters.length - removedCount];
            letterToChange.style.color = 'white';
            letterToChange.style.textShadow = '0 0 10px white, 0 0 20px white, 0 0 30px white, 0 0 40px white, 0 0 50px white, 0 0 60px white, 0 0 70px white';
        }
    }
    function updateEye() {
        const eye = document.getElementById('bigEye');
        if (eye) {
            if (removedCount === 0) {
                eye.classList.remove('eye-closed');
                eye.classList.add('eye-open');
            } else {
                eye.classList.remove('eye-open');
                eye.classList.add('eye-closed');
            }
        }
    }


    // Inicjalizacja licznika usuniętych elementów na początku
    updateRemovedCounter();

    function createRandomElement() {
        // Tworzy element tylko jeśli jest mniej niż 5 elementów
        if (elementCount < 5 && removedCount > 0) {
            const element = document.createElement('div');
            element.classList.add('element');

            // Losowa pozycja i rozmiar
            element.style.position = 'absolute';
            element.style.left = Math.random() * document.body.clientWidth + 'px';
            element.style.top = Math.random() * document.body.clientHeight + 'px';
            element.style.width = '20px';
            element.style.height = '20px';

            document.body.appendChild(element);
            elementCount++;

            // Funkcja rosnąca
            let size = 20;
            const grow = setInterval(function () {
                size++;
                element.style.width = size + 'px';
                element.style.height = size + 'px';
            }, 100);

            // Reakcja na najechanie kursorem
            element.addEventListener('mouseover', function () {
                clearInterval(grow);
                element.remove();
                elementCount--;
                if (removedCount > 0) {
                    removedCount--;
                }; // Zwiększenie licznika usuniętych elementów
                updateRemovedCounter(); // Aktualizacja licznika na stronie
            });
        }
    }

    // Utwórz pierwszy element natychmiast po załadowaniu strony
    createRandomElement();

    // Następnie, twórz nowe elementy co 6 sekund
    setInterval(createRandomElement, 6000); // Co 6 sekund
});






// JavaScript do wyłączenia pointer-events na fog-layer
const fogLayer = document.querySelector('.fog-layer');
fogLayer.style.pointerEvents = 'none';



