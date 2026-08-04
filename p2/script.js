// Obtener la referencia a la imagen de Chucky
const chuckyImage = document.querySelector('.chucky');
const originalChuckySrc = 'chucky1.png';
const hoverChuckySrc = 'chucky2.png';
const terrorSoundChucky = new Audio('terror2.wav');
let chuckyMouseOver = false;

chuckyImage.addEventListener('mouseenter', function () {
    chuckyMouseOver = true;
    chuckyImage.src = hoverChuckySrc;
    terrorSoundChucky.play();
});

chuckyImage.addEventListener('mouseleave', function () {
    chuckyMouseOver = false;
    chuckyImage.src = originalChuckySrc;
    terrorSoundChucky.pause();
    terrorSoundChucky.currentTime = 0;
});

/////// LUZ PAPARDEANDO

const luzImage = document.querySelector('.luz');
const parpadeoSound = new Audio('parpadeo2.wav');
let sonidoActivo = false;

function parpadeoRapido() {
    // Generar un número aleatorio entre 0 y 1
    const aleatorio = Math.random();

    // Establecer la visibilidad según el número aleatorio
    luzImage.style.opacity = aleatorio > 0.5 ? 1 : 0;

    // Si la imagen es visible, activar el sonido
    if (luzImage.style.opacity === '1' && !sonidoActivo) {
        sonidoActivo = true;
        parpadeoSound.currentTime = 0;
        parpadeoSound.play();
    }

    // Si la imagen es invisible, detener el sonido
    if (luzImage.style.opacity === '0' && sonidoActivo) {
        sonidoActivo = false;
        parpadeoSound.pause();
        parpadeoSound.currentTime = 0;
    }

    // Configurar el próximo parpadeo después de un intervalo aleatorio
    const intervaloAleatorio = Math.floor(Math.random() * (200 - 100 + 1) + 100);
    setTimeout(() => requestAnimationFrame(parpadeoRapido), intervaloAleatorio);
}

// Iniciar el parpadeo rápido
parpadeoRapido();

///////////////////////////////////FIN DEL PARPADEO

// Obtener la referencia a la imagen DEHMI
const dehmiImage = document.querySelector('.dehmi');
const hoverDehmiSrc = 'DEHMI2.png';
const hoverSoundDehmi = new Audio('hover.wav');
let dehmiMouseOver = false;

dehmiImage.addEventListener('mouseenter', function () {
    dehmiMouseOver = true;
    dehmiImage.src = hoverDehmiSrc;
    hoverSoundDehmi.play();
});

dehmiImage.addEventListener('mouseleave', function () {
    dehmiMouseOver = false;
    dehmiImage.src = 'DEHMI1.png';
    hoverSoundDehmi.pause();
    hoverSoundDehmi.currentTime = 0;
});

// Repetir el mismo patrón para SINBI y MYT
const sinbiImage = document.querySelector('.sinbi');
const hoverSinbiSrc = 'SINBI2.png';
const hoverSoundSinbi = new Audio('hover.wav');
let sinbiMouseOver = false;

sinbiImage.addEventListener('mouseenter', function () {
    sinbiMouseOver = true;
    sinbiImage.src = hoverSinbiSrc;
    hoverSoundSinbi.play();
});

sinbiImage.addEventListener('mouseleave', function () {
    sinbiMouseOver = false;
    sinbiImage.src = 'SINBI1.png';
    hoverSoundSinbi.pause();
    hoverSoundSinbi.currentTime = 0;
});

const mytImage = document.querySelector('.myt');
const hoverMytSrc = 'MYT2.png';
const hoverSoundMyt = new Audio('hover.wav');
let mytMouseOver = false;

mytImage.addEventListener('mouseenter', function () {
    mytMouseOver = true;
    mytImage.src = hoverMytSrc;
    hoverSoundMyt.play();
});

mytImage.addEventListener('mouseleave', function () {
    mytMouseOver = false;
    mytImage.src = 'MYT1-copia.png';
    hoverSoundMyt.pause();
    hoverSoundMyt.currentTime = 0;
});


/////////////////////////////////////////////////////////////////// REPRODUCTOR

document.addEventListener('DOMContentLoaded', function() {
    var musicPlayerButton = document.querySelector('#music-player .playerbutton');
    var pauseButton = document.querySelector('#music-player .pausebutton');
    var audio = document.querySelector('#music-player audio');
    var currentTime = 0;

    musicPlayerButton.addEventListener('click', function() {
        musicPlayerButton.style.display = 'none';
        pauseButton.style.display = 'block';

        audio.src = 'icecube3.mp3';
        audio.currentTime = currentTime;
        audio.play();
    });

    pauseButton.addEventListener('click', function() {
        musicPlayerButton.style.display = 'block';
        pauseButton.style.display = 'none';

        currentTime = audio.currentTime;
        audio.pause();
    });
});

