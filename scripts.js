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

// Opcjonalnie, możesz ustawić jedną z zakładek jako domyślnie otwartą:
document.getElementsByClassName("tablinks")[0].click(); // Otwiera pierwszą zakładkę


document.addEventListener('DOMContentLoaded', function() {
    function createRandomElement() {
        const element = document.createElement('div');
        element.classList.add('element');

        // Losowa pozycja i rozmiar
        element.style.position = 'absolute'; // Ustawienie pozycji absolutnej
        element.style.left = Math.random() * document.body.clientWidth + 'px';
        element.style.top = Math.random() * document.body.clientHeight + 'px';
        element.style.width = '20px';
        element.style.height = '20px';

        document.body.appendChild(element); // Dodanie elementu do <body>

        // Funkcja rosnąca
        let size = 20;
        const grow = setInterval(function() {
            size++;
            element.style.width = size + 'px';
            element.style.height = size + 'px';
            if (size >= 100) clearInterval(grow); // Zatrzymaj rośnięcie
        }, 100);

        // Reakcja na najechanie kursorem
        element.addEventListener('mouseover', function() {
            clearInterval(grow); // Zatrzymaj rośnięcie
            element.remove(); // Usuń element
        });
    }

    // Tworzenie nowego elementu co jakiś czas
    setInterval(createRandomElement, 2000); // Co 2 sekundy
});
