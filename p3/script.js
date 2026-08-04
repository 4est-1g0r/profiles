// función de arrastrar el rectángulo q me robé de Diana (nymphia), muxas gracias  

const rectangle = document.querySelector('.rectangle');
const titleBar = document.querySelector('.title-bar');

let isDragging = false;
let offsetX = 0;
let offsetY = 0;

titleBar.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - (rectangle.getBoundingClientRect().left + window.scrollX);
    offsetY = e.clientY - (rectangle.getBoundingClientRect().top + window.scrollY);
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        let xPos = e.clientX - offsetX;
        let yPos = e.clientY - offsetY;

        // Ajustar los márgenes según el zoom
        const scale = 0.8;
        const rectWidth = rectangle.offsetWidth * scale;
        const rectHeight = rectangle.offsetHeight * scale;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        xPos = Math.max(0, Math.min(xPos, windowWidth - rectWidth));
        yPos = Math.max(0, Math.min(yPos, windowHeight - rectHeight));

        rectangle.style.left = `${xPos}px`;
        rectangle.style.top = `${yPos}px`;
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});



document.addEventListener('DOMContentLoaded', function() {
    const lightButton = document.getElementById('lightButton');
    const minimizeButton = document.getElementById('minimizeButton');
    const body = document.body;
    const rectangle = document.querySelector('.rectangle');

    let isLightOn = true;
    let isExpanded = true; 

    function updateButtonHover(button, imgOn, imgOnHover, imgOff, imgOffHover) {
        button.src = imgOn;
        button.onmouseover = () => button.src = imgOnHover;
        button.onmouseout = () => button.src = imgOn;
    }

    lightButton.addEventListener('click', function() {
        if (isLightOn) {
            body.style.backgroundImage = "url('fondo3.png')";
            updateButtonHover(lightButton, 'LIGHTSOFF1.png', 'LIGHTSOFF2.png', 'LIGHTSOFF1.png', 'LIGHTSOFF2.png');
        } else {
            body.style.backgroundImage = "url('fondo2.png')";
            updateButtonHover(lightButton, 'LIGHTSON1.png', 'LIGHTSON2.png', 'LIGHTSON1.png', 'LIGHTSON2.png');
        }
        isLightOn = !isLightOn;
    });

    minimizeButton.addEventListener('click', function() {
        if (isExpanded) {
            rectangle.style.height = '155px';
            updateButtonHover(minimizeButton, 'EXPAND1.png', 'EXPAND2.png', 'EXPAND1.png', 'EXPAND2.png');
        } else {
            rectangle.style.height = '352px';
            updateButtonHover(minimizeButton, 'MIN1.png', 'MIN2.png', 'MIN1.png', 'MIN2.png');
        }
        isExpanded = !isExpanded;
    });

    updateButtonHover(minimizeButton, 'MIN1.png', 'MIN2.png', 'MIN1.png', 'MIN2.png');
});


document.addEventListener('DOMContentLoaded', function() {
    const playButton = document.getElementById('playButton');
    const pauseButton = document.getElementById('pauseButton');
    const forwardButton = document.getElementById('forwardButton');
    const backwardButton = document.getElementById('backwardButton');
    const songTitle = document.getElementById('songTitle');
    const audioPlayer = document.getElementById('audioPlayer');
    const cdImage = document.getElementById('cdImage');
    const spinSound = new Audio('spin.wav');

    const songs = ['Charli_xcx_-_Girl_so_confusing.mp3', 'Blue_Foundation_-_Eyes_On_Fire.mp3'];
    const images = ['CD1.png', 'CD2.png'];
    let songIndex = 0;

    function updateSong() {
        audioPlayer.src = songs[songIndex];
        songTitle.textContent = songs[songIndex];
        cdImage.src = images[songIndex];
    }

    function playAudio() {
        audioPlayer.play();
        playButton.style.display = 'none';
        pauseButton.style.display = 'block';


        cdImage.style.display = 'block';
        cdImage.style.animationPlayState = 'running';
        spinSound.play();
    }

    function pauseAudio() {
        audioPlayer.pause();
        playButton.style.display = 'block';
        pauseButton.style.display = 'none';

        cdImage.style.animationPlayState = 'paused'; 
        spinSound.pause();
        spinSound.currentTime = 0; 
    }

    function nextSong() {
        songIndex = (songIndex + 1) % songs.length;
        updateSong();
        playAudio();
    }

    playButton.addEventListener('click', function() {
        playAudio();
    });

    pauseButton.addEventListener('click', function() {
        pauseAudio();
    });

    forwardButton.addEventListener('click', function() {
        nextSong();
    });

    backwardButton.addEventListener('click', function() {
        songIndex = (songIndex - 1 + songs.length) % songs.length;
        updateSong();
        playAudio(); 
    });

    audioPlayer.addEventListener('ended', function() {
        nextSong(); 
    });

    playButton.style.display = 'block'; 
    updateSong(); 
});


document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            const audio = new Audio('hover.wav');
            audio.play();
        });
    });

});
