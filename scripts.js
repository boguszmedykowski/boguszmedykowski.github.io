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



//czarne dziury

// document.addEventListener('DOMContentLoaded', function() {
//     let elementCount = 0; // Licznik śledzący ilość elementów na stronie
//     let removedCount = 0; // Licznik śledzący ilość usuniętych elementów

//     function updateRemovedCounter() {
//         const counterElement = document.getElementById('removedCounter');
//         counterElement.textContent = `${removedCount}`;
//     }

//     // Inicjalizacja licznika usuniętych elementów na początku
//     updateRemovedCounter();

//     function createRandomElement() {
//         // Tworzy element tylko jeśli jest mniej niż 5 elementów
//         if (elementCount < 5) {
//             const element = document.createElement('div');
//             element.classList.add('element');

//             // Losowa pozycja i rozmiar
//             element.style.position = 'absolute';
//             element.style.left = Math.random() * document.body.clientWidth + 'px';
//             element.style.top = Math.random() * document.body.clientHeight + 'px';
//             element.style.width = '20px';
//             element.style.height = '20px';

//             document.body.appendChild(element);
//             elementCount++;

//             // Funkcja rosnąca
//             let size = 20;
//             const grow = setInterval(function() {
//                 size++;
//                 element.style.width = size + 'px';
//                 element.style.height = size + 'px';
//             }, 100);

//             // Reakcja na najechanie kursorem
//             element.addEventListener('mouseover', function() {
//                 clearInterval(grow);
//                 element.remove();
//                 elementCount--;
//                 removedCount++; // Zwiększenie licznika usuniętych elementów
//                 updateRemovedCounter(); // Aktualizacja licznika na stronie
//             });
//         }
//     }

//     // Tworzenie nowego elementu co jakiś czas
//     setInterval(createRandomElement, 6000); // Co 6 sekund
// });



// // JavaScript do wyłączenia pointer-events na fog-layer
// const fogLayer = document.querySelector('.fog-layer');
// fogLayer.style.pointerEvents = 'none';



//white

document.addEventListener('DOMContentLoaded', function() {
    let elementCount = 0; // Licznik śledzący ilość elementów na stronie
    let removedCount = 0; // Licznik śledzący ilość usuniętych elementów

    function updateRemovedCounter() {
        const counterElement = document.getElementById('removedCounter');
        counterElement.textContent = `${removedCount}`;
    }

    // Inicjalizacja licznika usuniętych elementów na początku
    updateRemovedCounter();

    function createRandomElement() {
        // Tworzy element tylko jeśli jest mniej niż 5 elementów
        if (elementCount < 5) {
            const element = document.createElement('div');
            element.classList.add('fogg-canvas'); // Zmiana klasy na 'fogg-canvas'

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
            const grow = setInterval(function() {
                size++;
                element.style.width = size + 'px';
                element.style.height = size + 'px';
            }, 100);

            // Reakcja na najechanie kursorem
            element.addEventListener('mouseover', function() {
                clearInterval(grow);
                element.remove();
                elementCount--;
                removedCount++; // Zwiększenie licznika usuniętych elementów
                updateRemovedCounter(); // Aktualizacja licznika na stronie
            });
        }
    }

    // Tworzenie nowego elementu co jakiś czas
    setInterval(createRandomElement, 6000); // Co 6 sekund
});
