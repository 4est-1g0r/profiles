const body = document.body;
let modeChangeTimeout = null;

function setMode(mode) {
    if (modeChangeTimeout) {
        clearTimeout(modeChangeTimeout);
    }
    
    body.classList.remove("light", "dark-day", "dark-night");
    body.classList.add(mode);
    console.log("Modo activado:", mode);

    if (typeof updateSunColor === 'function') {
        updateSunColor();
    }

    if (typeof updateFooterIndicator === 'function') {
        updateFooterIndicator();
    }

if (window.changeParticlesColor) {
    const modeColors = {
        'light': '#27196f',
        'dark-night': '#7b633a',
        'dark-day': '#A94C4C'
    };
    window.changeParticlesColor(modeColors[mode] || '#A94C4C');
}

    resetSoundSystem();
    
    modeChangeTimeout = setTimeout(() => {
        assignHoverSounds();
        modeChangeTimeout = null;
    }, 300);

    if (radioPlayer && typeof radioPlayer.syncWithMode === 'function') {
        radioPlayer.syncWithMode();
    }

    setTimeout(checkContainerScaling, 150);
}

let scalingInterval = null;
let scalingTimeout = null;
let lastScaleCheck = 0;

function checkContainerScaling() {
    const now = Date.now();
    if (now - lastScaleCheck < 100) return;
    lastScaleCheck = now;
    
    const contentWrapper = document.getElementById('content-wrapper');
    const mainContainer = document.getElementById('main-container');
    
    if (!contentWrapper || !mainContainer) return;
    
    const wrapperHeight = contentWrapper.scrollHeight;
    const availableHeight = window.innerHeight - 40;
    const isOverflowing = wrapperHeight > availableHeight;
    
    if (isOverflowing) {
        const scaleFactor = availableHeight / wrapperHeight;
        contentWrapper.style.transform = `scale(${scaleFactor})`;
    } else {
        contentWrapper.style.transform = 'none';
    }
}

function initScaling() {
    const contentWrapper = document.getElementById('content-wrapper');
    if (!contentWrapper) {
        console.warn('No se encontró #content-wrapper');
        return;
    }
    
    setTimeout(checkContainerScaling, 100);
    
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(checkContainerScaling, 100);
    });
    
    if (scalingInterval) {
        clearInterval(scalingInterval);
    }
    scalingInterval = setInterval(checkContainerScaling, 2000);
}


let marqueeAnimation = null;
let marqueePosition = 0;
let lastMarqueeTime = 0;

function createMarqueeText() {
    const lateral = document.getElementById('lateral');
    if (!lateral) {
        console.warn('No se encontró el elemento #lateral');
        return;
    }
    
    if (document.querySelector('.marquee-vertical-container')) {
        console.log('El marquee ya existe');
        return;
    }
    
    const marqueeText = "© All illustrations are the intellectual property of Neon Genesis Evangelion, created by Hideaki Anno. | Web Profile coded & designed by Myt, for Jade";
    
    const container = document.createElement('div');
    container.className = 'marquee-vertical-container';
    
    const content = document.createElement('div');
    content.className = 'marquee-vertical-content';
    
    let htmlContent = '';
    for (let i = 0; i < 10; i++) {
        htmlContent += `<span>${marqueeText}</span>`;
    }
    content.innerHTML = htmlContent;
    
    container.appendChild(content);
    lateral.appendChild(container);
    
    startMarqueeAnimation();
}

function startMarqueeAnimation() {
    if (marqueeAnimation) {
        cancelAnimationFrame(marqueeAnimation);
    }
    
    const content = document.querySelector('.marquee-vertical-content');
    if (!content) return;
    
    let lastTime = performance.now();
    const pixelsPerSecond = 60; 
    
    function animate(currentTime) {
        const deltaTime = (currentTime - lastTime) / 1000;
        lastTime = currentTime;
        
        const safeDelta = Math.min(deltaTime, 0.1);
        
        marqueePosition -= pixelsPerSecond * safeDelta;
        
        if (marqueePosition <= -content.scrollWidth / 2) {
            marqueePosition = 0;
        }
        
        content.style.transform = `translateX(${marqueePosition}px)`;
        marqueeAnimation = requestAnimationFrame(animate);
    }
    
    lastTime = performance.now();
    marqueeAnimation = requestAnimationFrame(animate);
}

function stopMarqueeAnimation() {
    if (marqueeAnimation) {
        cancelAnimationFrame(marqueeAnimation);
        marqueeAnimation = null;
    }
}

function restartMarqueeAnimation() {
    stopMarqueeAnimation();
    marqueePosition = 0;
    const content = document.querySelector('.marquee-vertical-content');
    if (content) {
        content.style.transform = 'translateX(0)';
    }
    startMarqueeAnimation();
}


function getCurrentDualMode() {
    const now = new Date();
    const hourGMT3 = (now.getUTCHours() - 3 + 24) % 24;
    
    if (hourGMT3 >= 7 && hourGMT3 < 19) {
        return 'dark-day';
    } else {
        return 'dark-night';
    }
}

let sunAnimation = null;

function updateSunColor() {
    const sunContainer = document.getElementById('sun-icon');
    if (!sunContainer) return;
    
    const svg = sunContainer.querySelector('svg');
    if (!svg) return;
  
    let color = '#ffffff'; 
    
    if (document.body.classList.contains('dark-night')) {
        color = '#7c643a'; 
    } else if (document.body.classList.contains('light')) {
        color = '#ffffff'; 
    }
    
    svg.querySelectorAll('path, circle, rect, polygon, line, polyline, ellipse').forEach(el => {
        if (el.getAttribute('fill') && el.getAttribute('fill') !== 'none') {
            el.setAttribute('fill', color);
        }
        if (el.getAttribute('stroke') && el.getAttribute('stroke') !== 'none') {
            el.setAttribute('stroke', color);
        }
    });
}

function initSunIcon() {
    const sunContainer = document.getElementById('sun-icon');
    if (!sunContainer) return;

    if (sunAnimation) {
        updateSunColor();
        return;
    }

    sunAnimation = lottie.loadAnimation({
        container: sunContainer,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'icons8-sun.json'
    });

    sunAnimation.addEventListener('DOMLoaded', updateSunColor);
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initSunIcon, 200);
});


const hoverSounds = {
    'bubble': new Audio('sounds/bubble_sound.mp3'),
    'alien': new Audio('sounds/hoveralien.mp3'),
    'tiny': new Audio('sounds/tiny.mp3'),
    'click': new Audio('sounds/sounds_click7.wav')
};

Object.values(hoverSounds).forEach(sound => {
    sound.load();
    sound.volume = 0.3;
});

const soundSystem = {
    lastSoundKey: null,
    lastElementId: null,
    lastPlayTime: 0,
    spamThreshold: 200
};

function getElementId(element) {
    return element.id || 
           element.className || 
           element.tagName + '_' + Math.random().toString(36).substr(2, 9);
}

function playHoverSound(soundKey, element) {
    if (!soundKey) return;
    
    const now = Date.now();
    const elementId = getElementId(element);
    
    if (soundKey === soundSystem.lastSoundKey && 
        elementId === soundSystem.lastElementId && 
        now - soundSystem.lastPlayTime < soundSystem.spamThreshold) {
        return;
    }
    
    const sound = hoverSounds[soundKey];
    if (!sound) return;
    
    soundSystem.lastSoundKey = soundKey;
    soundSystem.lastElementId = elementId;
    soundSystem.lastPlayTime = now;
    
    sound.currentTime = 0;
    sound.play().catch(e => {
    });
}

let soundsAssigned = false;

function assignHoverSounds() {
    if (soundsAssigned) return;
    
    document.body.addEventListener('mouseenter', (e) => {
        const target = e.target;
        
        if (target.closest('.bot-link-gif-link')) {
            playHoverSound('bubble', target.closest('.bot-link-gif-link'));
        }
        else if (target.closest('.profile-icon-container')) {
            playHoverSound('alien', target.closest('.profile-icon-container'));
        }
        else if (target.closest('.message-img-container') ||
                 target.closest('.decor-sic-container') ||
                 target.closest('.top-cuadro1-container') ||
                 target.closest('.top-cuadro2-container') ||
                 target.closest('.logo-gif-container') ||
                 target.closest('.arachnid-group')) {
            playHoverSound('tiny', target.closest('.message-img-container, .decor-sic-container, .top-cuadro1-container, .top-cuadro2-container, .logo-gif-container, .arachnid-group'));
        }
        else if (target.closest('#buttons button')) {
            playHoverSound('click', target.closest('#buttons button'));
        }
    }, true); 
    
    soundsAssigned = true;
    console.log('✅ Sonidos hover asignados (delegación)');
}

function resetSoundSystem() {
    soundSystem.lastSoundKey = null;
    soundSystem.lastElementId = null;
    soundSystem.lastPlayTime = 0;
}

// ============================================
// JADECASSETTE
// ============================================
const radioPlayer = {
    playBtn: null,
    pauseBtn: null,
    prevBtn: null,
    nextBtn: null,
    cassetteImg: null,
    isPlaying: false,
    currentSongIndex: 0,
    songFiles: ['song1.mp3', 'song2.mp3', 'song3.mp3'],
    audioElement: null,
    radioFreqAudio: null,
    initialized: false,

    init: function() {
        if (this.initialized) return;
        
        console.log('📻 Inicializando Radio Player...');

        this.playBtn = document.getElementById('radio-play');
        this.pauseBtn = document.getElementById('radio-pause');
        this.prevBtn = document.getElementById('radio-prev');
        this.nextBtn = document.getElementById('radio-next');
        this.cassetteImg = document.getElementById('radio-cassette-img');

        if (!this.playBtn || !this.pauseBtn || !this.prevBtn || !this.nextBtn || !this.cassetteImg) {
            console.warn('⚠️ No se encontraron todos los elementos de la radio.');
            return;
        }

        this.audioElement = new Audio();
        this.radioFreqAudio = new Audio('sounds/radiofrequency.wav');
        this.radioFreqAudio.loop = true;
        this.radioFreqAudio.volume = 0.2;

        this.audioElement.addEventListener('ended', () => {
            this.nextSong();
        });

        this.playBtn.addEventListener('click', () => this.play());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.prevBtn.addEventListener('click', () => this.prevSong());
        this.nextBtn.addEventListener('click', () => this.nextSong());

        this.showPlayButton();
        this.initialized = true;
        console.log('✅ Radio Player inicializado');
    },

    showPlayButton: function() {
        this.playBtn.style.display = 'block';
        this.pauseBtn.style.display = 'none';
    },

    showPauseButton: function() {
        this.playBtn.style.display = 'none';
        this.pauseBtn.style.display = 'block';
    },

    loadSong: function(index) {
        const safeIndex = (index + this.songFiles.length) % this.songFiles.length;
        this.currentSongIndex = safeIndex;
        const songPath = `jadecassette/${this.songFiles[safeIndex]}`;

        this.audioElement.src = songPath;
        this.audioElement.load();
    },

    play: function() {
        if (!this.audioElement.src) {
            this.loadSong(0);
        }

        this.isPlaying = true;
        document.body.classList.add('radio-playing');
        this.showPauseButton();

        this.audioElement.play().catch(e => console.log('Error al reproducir:', e));
        this.radioFreqAudio.play().catch(e => console.log('Error al reproducir frecuencia:', e));
        this.playSoundEffect('sounds/sounds_play.wav');
        
        if (typeof updateFooterIndicator === 'function') {
            updateFooterIndicator();
        }
    },

    pause: function() {
        this.isPlaying = false;
        document.body.classList.remove('radio-playing');
        this.showPlayButton();

        this.audioElement.pause();
        this.radioFreqAudio.pause();
        this.playSoundEffect('sounds/sounds_play.wav');
        
        if (typeof updateFooterIndicator === 'function') {
            updateFooterIndicator();
        }
    },

    nextSong: function() {
        this.loadSong(this.currentSongIndex + 1);
        if (this.isPlaying) {
            this.audioElement.play().catch(e => console.log('Error al reproducir:', e));
        }
        this.playSoundEffect('sounds/sounds_next.wav');
    },

    prevSong: function() {
        this.loadSong(this.currentSongIndex - 1);
        if (this.isPlaying) {
            this.audioElement.play().catch(e => console.log('Error al reproducir:', e));
        }
        this.playSoundEffect('sounds/sounds_next.wav');
    },

    playSoundEffect: function(soundPath) {
        const effect = new Audio(soundPath);
        effect.volume = 0.3;
        effect.play().catch(e => {});
    },

    syncWithMode: function() {
    }
};

// ============================================
// I
// ============================================
let currentIndicatorType = 'default';

function updateFooterIndicator() {
    const indicator = document.getElementById('indicator-img');
    if (!indicator) return;
    
    function getImagePath(imageName) {
        if (document.body.classList.contains('light')) {
            return `lightmode/${imageName}`;
        } else if (document.body.classList.contains('dark-night')) {
            return `mytmode/${imageName}`;
        } else {
            return `darkmode/${imageName}`;
        }
    }
    
    let imageName = '3-a-la-vez.gif';
    
    if (currentIndicatorType === 'cargando') {
        imageName = 'cargando.gif';
    } else if (currentIndicatorType === 'alterar' || document.body.classList.contains('radio-playing')) {
        imageName = 'alterar.gif';
    }
    
    indicator.src = getImagePath(imageName);
}


function setupIndicatorHovers() {
    document.body.addEventListener('mouseenter', (e) => {
        const target = e.target;
        
        if (target.closest('#buttons button') || target.closest('.bot-link-gif-link')) {
            currentIndicatorType = 'cargando';
            updateFooterIndicator();
        }
    }, true);
    
    document.body.addEventListener('mouseleave', (e) => {
        const target = e.target;
        
        if (target.closest('#buttons button') || target.closest('.bot-link-gif-link')) {
            currentIndicatorType = 'default';
            updateFooterIndicator();
        }
    }, true);
}


(function() {
    'use strict';
    
    const modeColors = {
        'light': '#27196f',
        'dark-night': '#7b633a',
        'dark-day': '#A94C4C'
    };
    
    let particlesInstance = null;
    let initAttempts = 0;
    const MAX_INIT_ATTEMPTS = 10;

    function initParticles() {
        if (!document.getElementById('particles-js')) {
            console.warn('⚠️ Contenedor #particles-js no encontrado');
            return;
        }
        
        console.log('🎨 Inicializando particles.js...');
        
        const config = {
            particles: {
                number: { value: 61, density: { enable: true, value_area: 789.1476416322727 } },
                color: { value: "#A94C4C" }, // Color inicial
                shape: { type: "edge", stroke: { width: 0, color: "#b1b1b1" }, polygon: { nb_sides: 3 } },
                opacity: { value: 0.5, random: true, anim: { enable: false } },
                size: { value: 3, random: true, anim: { enable: true, speed: 4, size_min: 1, sync: false } },
                line_linked: { enable: false },
                move: { enable: true, speed: 2, direction: "none", random: false, straight: false, out_mode: "out", bounce: false, attract: { enable: false } }
            },
            interactivity: {
                detect_on: "canvas",
                events: { onhover: { enable: false }, onclick: { enable: true, mode: "push" }, resize: true },
                modes: { push: { particles_nb: 4 } }
            },
            retina_detect: true
        };
        
        particlesJS('particles-js', config);
        
        captureParticlesInstance();
    }
    
    function captureParticlesInstance() {
        if (window.pJSDom && window.pJSDom.length > 0) {
            particlesInstance = window.pJSDom[0];
            console.log('✅ Particles.js instancia capturada correctamente');
            
            const currentMode = document.body.classList.contains('light') ? 'light' : 
                               (document.body.classList.contains('dark-night') ? 'dark-night' : 'dark-day');
            changeParticlesColor(modeColors[currentMode]);
        } else if (initAttempts < MAX_INIT_ATTEMPTS) {
            initAttempts++;
            console.log(`⏳ Esperando a que particles.js esté listo... (intento ${initAttempts}/${MAX_INIT_ATTEMPTS})`);
            setTimeout(captureParticlesInstance, 200);
        } else {
            console.warn('⚠️ No se pudo capturar la instancia de particles.js después de varios intentos');
        }
    }
    
    window.changeParticlesColor = function(newColor) {
        if (!newColor) {
            console.warn('⚠️ No se proporcionó un color para las partículas');
            return;
        }
        
        if (!particlesInstance && window.pJSDom && window.pJSDom.length > 0) {
            particlesInstance = window.pJSDom[0];
        }
        
        if (!particlesInstance) {
            console.log('⏳ Partículas no listas, reintentando cambio de color en 200ms...');
            setTimeout(() => window.changeParticlesColor(newColor), 200);
            return;
        }
        
        try {
            if (particlesInstance.pJS && particlesInstance.pJS.particles) {
                particlesInstance.pJS.particles.color.value = newColor;
                
                if (particlesInstance.pJS.particles.array && particlesInstance.pJS.particles.array.length > 0) {
                    particlesInstance.pJS.particles.array.forEach(p => {
                        if (p.color) {
                            p.color.value = newColor;
                        }
                    });
                }
                
                particlesInstance.pJS.fn.particlesRefresh();
                
                console.log('🎨 Color de partículas cambiado a:', newColor, 'sin reiniciar la animación');
            } else {
                console.warn('⚠️ Estructura de particles.js no reconocida');
            }
        } catch (e) {
            console.error('❌ Error cambiando color de partículas:', e);
        }
    };
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initParticles);
    } else {
        initParticles();
    }
})();

document.documentElement.style.overflow = 'hidden';
document.body.style.overflow = 'hidden';

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM cargado, inicializando...');
    
    const initialDualMode = getCurrentDualMode();
    const modes = ['light', initialDualMode];
    const randomIndex = Math.random() < 0.5 ? 0 : 1;
    const initialMode = modes[randomIndex];

    setMode(initialMode);

    const lightBtn = document.getElementById("light-btn");
    const darkDayBtn = document.getElementById("dark-day-btn");

    if (lightBtn) {
        lightBtn.addEventListener("click", () => setMode("light"));
    }

    if (darkDayBtn) {
        darkDayBtn.addEventListener("click", () => setMode(getCurrentDualMode()));
    }

    createMarqueeText();
    initScaling();
    
    setTimeout(() => initSunIcon(), 200);
    setTimeout(() => radioPlayer.init(), 400);
    setTimeout(() => {
        assignHoverSounds();
        setupIndicatorHovers();
    }, 600);
    
    updateFooterIndicator();
});

window.addEventListener('load', function() {
    console.log('✅ Página cargada');
    checkContainerScaling();
    restartMarqueeAnimation();
});

document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        stopMarqueeAnimation();
    } else {
        startMarqueeAnimation();
    }
});

console.log("✅ Sistema listo");
