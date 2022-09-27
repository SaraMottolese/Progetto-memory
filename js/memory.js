let arrayAnimali = ['🐱', '🦉', '🐾', '🦁', '🦋', '🐛', '🐝', '🐬', '🦊', '🐨', '🐰', '🐯', '🐱', '🦉', '🐾', '🦁', '🦋', '🐛', '🐝', '🐬', '🦊', '🐨', '🐰', '🐯'];
//libreria per icone
//https://html-css-js.com/html/character-codes/
console.log(arrayAnimali.length);

let arrayComparison = [];

let interval;
let modale = document.getElementById('modal');
let time = document.getElementsByClassName('timer')
let iconsFind = document.getElementsByClassName('find');
document.body.onload = startGame();


function shuffle(a) {
    var currentIndex = a.length;
    var temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = a[currentIndex];
        a[currentIndex] = a[randomIndex];
        a[randomIndex] = temporaryValue;
    }
    return a;
}

function timer() {
    var s = 0;
    m = 0, h = 0;
    interval = setInterval(function() {
        timer.innerHTML = 'Tempo: ' + m + ' min ' + s + ' sec';
        s++;
        if (s == 60) {
            m++;
            s = 0;
        }
        if (m == 60) {
            h++;
            m = 0;
        }
    }, 1000);
}



function startGame() {
    var arrayShuffle = shuffle(arrayAnimali);
    console.log(arrayShuffle);
    clearInterval(interval);
    arrayComparison = [];
    var lista = document.getElementById('griglia');
    while (lista.hasChildNodes()) {
        lista.removeChild(lista.firstChild);
    }

    for (i = 0; i < arrayShuffle.length; i++) {
        var box = document.createElement('div');
        var elemento = document.createElement('div');
        elemento.className = 'icon';
        lista.appendChild(box).appendChild(elemento);
        elemento.innerHTML = arrayShuffle[i];


    }
    var icon = document.getElementsByClassName("icon");
    var icons = [...icon];
    for (var i = 0; i < icons.length; i++) {
        icons[i].addEventListener("click", displayIcon);
        icons[i].addEventListener("click", openModal);
    }
    timer();
}
document.body.onload = startGame();

function displayIcon() {

    var icon = document.getElementsByClassName("icon");
    var icons = [...icon];
    console.log(icons);

    this.classList.toggle("show");
    arrayComparison.push(this);

    var len = arrayComparison.length;
    if (len === 2) {
        if (arrayComparison[0].innerHTML === arrayComparison[1].innerHTML) {
            arrayComparison[0].classList.add("find", "disabled");
            arrayComparison[1].classList.add("find", "disabled");
            arrayComparison = [];
        } else {
            icons.forEach(function(item) {
                item.classList.add('disabled');
            });
            setTimeout(function() {
                arrayComparison[0].classList.remove("show");
                arrayComparison[1].classList.remove("show");
                icons.forEach(function(item) {
                    item.classList.remove('disabled');
                    for (var i = 0; i < iconsFind.length; i++) {
                        iconsFind[i].classList.add("disabled");
                    }
                });
                arrayComparison = [];
            }, 700);
        }
    }
}

var modal = document.getElementById("modal");
var timer = document.querySelector(".timer");

function openModal() {
    if (iconsFind.length == 24) {
        clearInterval(interval);
        modal.classList.add("active");
        document.getElementById("tempoTotale").innerHTML = timer.innerHTML;
        closeModal();
    }
}

function closeModal() {
    HTMLAllCollection.addEventListener('click', function(e) {
        modal.classList.remove('active');
        startGame();
    });
}


function playAgain() {
    modal.classList.remove("active");
    document.body.onload = startGame();

}