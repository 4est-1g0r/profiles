document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const reiraImg = document.getElementById('reira-img');
    const logoImg = document.getElementById('logo-img');
    const addlettersImg = document.getElementById('addletters-img');
    const lineImg = document.getElementById('line-img');
    const bottomLineImg = document.getElementById('bottom-line-img');
    const coloursImg = document.getElementById('colours-img');
    const oculumImg = document.getElementById('oculum-img');
    const reira2Img = document.getElementById('reira2-img');
    const reira0Img = document.getElementById('reira0-img');
    const mainText = document.getElementById('main-text');
    const colorButtons = document.querySelectorAll('.color-button');
    const prefooterImg = document.getElementById('prefooter-img');
    const logobratImg = document.getElementById('logobrat-img');
    const idImg = document.getElementById('id-img');
    const c4tsImg = document.getElementById('c4ts-img');
    const symbolsImg = document.getElementById('symbols-img');
    const reira3Img = document.getElementById('reira3-img');
    const radiocassetteImg = document.getElementById('radiocassette-img');
    const logocassetteImg = document.getElementById('logocassette-img');
    
    // reproductor
    const playButton = document.getElementById('playButton');
    const pauseButton = document.getElementById('pauseButton');
    const backwardButton = document.getElementById('backwardButton');
    const forwardButton = document.getElementById('forwardButton');
    
    // audio
    const clicSound = document.getElementById('clic-sound');
    const beepSound = document.getElementById('beep-sound');
    const click7Sound = document.getElementById('click7-sound');
    const metalSound = document.getElementById('metal-sound');
    const playSoundElement = document.getElementById('play-sound');
    const nextSound = document.getElementById('next-sound');
    const radiofrequencySound = document.getElementById('radiofrequency-sound');
    

    const madebyImg = document.getElementById('madeby-img');
    const lottieSun = document.getElementById('lottie-sun');
    let sunAnimation;
    
    let beepTimeout;
    let isBeeping = false;
    let isPlaying = false; 
    let isRadioPlaying = false; 
    
    let currentMusic = null;
    let currentPlaylist = [];
    let currentSongIndex = -1;
    let playedSongs = [];
    let isMusicPlaying = false;
    
    const colorConfig = {
        red: {
            bodyClass: 'red-theme',
            reira: 'red/reira1.png',
            logo: 'red/logo1.png',
            logoHover: 'red/logo2.png',
            addletters: 'red/addletters.gif',
            addlettersHover: 'red/addletters.gif',
            line: 'red/line.png',
            colours: 'red/colours1.png',
            coloursHover: 'red/colours2.png',
            oculum: 'red/oculum1.png',
            oculumHover: 'red/oculum2.png',
            reira2: 'red/reira2.png',
            reira0: 'red/reira0.png',
            textColor: '#aa8636',
            buttons: {
                red: 'buttons/RC1.png',
                redHover: 'buttons/RC2.gif',
                blue: 'buttons/RD1.png',
                blueHover: 'buttons/RD2.gif',
                yellow: 'buttons/RP1.png',
                yellowHover: 'buttons/RP2.gif',
                white: 'buttons/RT1.png',
                whiteHover: 'buttons/RT2.gif'
            },
            // NUEVAS configuraciones
            prefooter: 'red/prefooter.png',
            logobrat: 'red/logobrat1.png',
            logobratHover: 'red/logobrat2.png',
            id: 'red/id1.png',
            idHover: 'red/id2.png',
            c4ts: 'red/c4ts.png',
            symbols: 'red/symbols.png',
            reira3: 'red/reira3.png',
            logocassette: 'red/logocassette.png',
            radiocassetteOFF: 'red/jadecassetteOFF.png',
            radiocassetteON: 'red/jadecassetteON.gif',
            footer: 'red/footer.png',
            threefl: 'red/3fl.png',
            madeby: 'red/madeby.png',
            madebyHover: 'red/madeby2.png',
            sunColor: '#aa8636',
            sunHoverColor: '#662b28',
            musicFolder: 'music/red/'
        },
        blue: {
            bodyClass: 'blue-theme',
            reira: 'blue/reira1.png',
            logo: 'blue/logo1.png',
            logoHover: 'blue/logo2.png',
            addletters: 'blue/addletters1.gif',
            addlettersHover: 'blue/addletters2.gif',
            line: 'blue/line.png',
            colours: 'blue/colours1.png',
            coloursHover: 'blue/colours2.png',
            oculum: 'blue/oculum1.png',
            oculumHover: 'blue/oculum2.png',
            reira2: 'blue/reira2.png',
            reira0: 'blue/reira0.png',
            textColor: '#ffffff',
            buttons: {
                red: 'buttons/BC1.png',
                redHover: 'buttons/BC2.gif',
                blue: 'buttons/BD1.png',
                blueHover: 'buttons/BD2.gif',
                yellow: 'buttons/BP1.png',
                yellowHover: 'buttons/BP2.gif',
                white: 'buttons/BT1.png',
                whiteHover: 'buttons/BT2.gif'
            },
            prefooter: 'blue/prefooter.png',
            logobrat: 'blue/logobrat1.png',
            logobratHover: 'blue/logobrat2.png',
            id: 'blue/id1.png',
            idHover: 'blue/id2.png',
            c4ts: 'blue/c4ts.png',
            symbols: 'blue/symbols.png',
            reira3: 'blue/reira3.png',
            logocassette: 'blue/logocassette.png',
            radiocassetteOFF: 'blue/jadecassetteOFF.png',
            radiocassetteON: 'blue/jadecassetteON.gif',
            footer: 'blue/footer.png',
            threefl: 'blue/3fl.png',
            madeby: 'blue/madeby.png',
            madebyHover: 'blue/madeby2.png',
            sunColor: '#ffffff',
            sunHoverColor: '#707bc2',
            musicFolder: 'music/blue/'
        },
        white: {
            bodyClass: 'white-theme',
            reira: 'white/reira1.png',
            logo: 'white/logo1.png',
            logoHover: 'white/logo2.png',
            addletters: 'white/addletters1.gif',
            addlettersHover: 'white/addletters2.gif',
            line: 'white/line.png',
            colours: 'white/colours1.png',
            coloursHover: 'white/colours2.png',
            oculum: 'white/oculum1.png',
            oculumHover: 'white/oculum2.png',
            reira2: 'white/reira2.png',
            reira0: 'white/reira0.png',
            textColor: '#883e56',
            buttons: {
                red: 'buttons/WC1.png',
                redHover: 'buttons/WC2.gif',
                blue: 'buttons/WD1.png',
                blueHover: 'buttons/WD2.gif',
                yellow: 'buttons/WP1.png',
                yellowHover: 'buttons/WP2.gif',
                white: 'buttons/WT1.png',
                whiteHover: 'buttons/WT2.gif'
            },
            prefooter: 'white/prefooter.png',
            logobrat: 'white/logobrat1.png',
            logobratHover: 'white/logobrat2.png',
            id: 'white/id1.png',
            idHover: 'white/id2.png',
            c4ts: 'white/c4ts.png',
            symbols: 'white/symbols.png',
            reira3: 'white/reira3.png',
            logocassette: 'white/logocassette.png',
            radiocassetteOFF: 'white/jadecassetteOFF.png',
            radiocassetteON: 'white/jadecassetteON.gif',
            footer: 'white/footer.png',
            threefl: 'white/3fl.png',
            madeby: 'white/madeby.png',
            madebyHover: 'white/madeby2.png',
            sunColor: '#883e56',
            sunHoverColor: '#e1aabd',
            musicFolder: 'music/white/'
        },
        yellow: {
            bodyClass: 'yellow-theme',
            reira: 'yellow/reira1.png',
            logo: 'yellow/logo1.png',
            logoHover: 'yellow/logo2.png',
            addletters: 'yellow/addletters.gif',
            addlettersHover: 'yellow/addletters.gif',
            line: 'yellow/line.png',
            colours: 'yellow/colours1.png',
            coloursHover: 'yellow/colours2.png',
            oculum: 'yellow/oculum1.png',
            oculumHover: 'yellow/oculum2.png',
            reira2: 'yellow/reira2.png',
            reira0: 'yellow/reira0.png',
            textColor: '#000000',
            buttons: {
                red: 'buttons/YC1.png',
                redHover: 'buttons/YC2.gif',
                blue: 'buttons/YD1.png',
                blueHover: 'buttons/YD2.gif',
                yellow: 'buttons/YP1.png',
                yellowHover: 'buttons/YP2.gif',
                white: 'buttons/YT1.png',
                whiteHover: 'buttons/YT2.gif'
            },
            prefooter: 'yellow/prefooter.png',
            logobrat: 'yellow/logobrat1.png',
            logobratHover: 'yellow/logobrat2.png',
            id: 'yellow/id1.png',
            idHover: 'yellow/id2.png',
            c4ts: 'yellow/c4ts.png',
            symbols: 'yellow/symbols.png',
            reira3: 'yellow/reira3.png',
            logocassette: 'yellow/logocassette.png',
            radiocassetteOFF: 'yellow/jadecassetteOFF.png',
            radiocassetteON: 'yellow/jadecassetteON.gif',
            footer: 'yellow/footer.png',
            threefl: 'yellow/3fl.png',
            madeby: 'yellow/madeby.png',
            madebyHover: 'yellow/madeby2.png',
            sunColor: '#000000',
            sunHoverColor: '#4d462b',
            musicFolder: 'music/yellow/'
        }
    };
    
    // NOMBRES DE LAS CANCIONES
    const musicFiles = {
        red: ['song1.mp3', 'song2.mp3', 'song3.mp3'],
        blue: ['song1.mp3', 'song2.mp3', 'song3.mp3'],
        white: ['song1.mp3', 'song2.mp3', 'song3.mp3'],
        yellow: ['song1.mp3', 'song2.mp3', 'song3.mp3']
    };
    
    function playSound(sound) {
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(e => console.log('Error reproduciendo sonido:', e));
        }
    }
    
    function startBeepLoop() {
        if (isBeeping) return;
        
        isBeeping = true;
        
        function playBeep() {
            if (!isBeeping) return;
            
            playSound(beepSound);
            
            beepTimeout = setTimeout(playBeep, beepSound.duration * 1000);
        }
        
        playBeep();
    }
    
    function stopBeepLoop() {
        isBeeping = false;
        if (beepTimeout) {
            clearTimeout(beepTimeout);
            beepTimeout = null;
        }
    }
    
    function toggleRadioFrequency(play) {
        if (play) {
            radiofrequencySound.play().catch(e => console.log('Error reproduciendo radiofrequency:', e));
            isRadioPlaying = true;
        } else {
            radiofrequencySound.pause();
            radiofrequencySound.currentTime = 0;
            isRadioPlaying = false;
        }
    }
    
    function loadPlaylist(color) {
        const config = colorConfig[color];
        currentPlaylist = musicFiles[color].map(song => config.musicFolder + song);
        playedSongs = [];
        currentSongIndex = -1;
        
        console.log(`Playlist cargada para ${color}:`, currentPlaylist);
    }
    
    function getRandomSong() {
        if (currentPlaylist.length === 0) return -1;
        
        if (playedSongs.length >= currentPlaylist.length) {
            playedSongs = [];
        }
        
        const availableSongs = currentPlaylist.filter((_, index) => !playedSongs.includes(index));
        
        if (availableSongs.length === 0) return -1;
        
        const randomIndex = Math.floor(Math.random() * availableSongs.length);
        const songIndex = currentPlaylist.indexOf(availableSongs[randomIndex]);
        
        return songIndex;
    }
    
    function playMusic() {
        if (isMusicPlaying && currentMusic) {
            return;
        }
        
        if (!currentMusic || currentSongIndex === -1) {
            const songIndex = getRandomSong();
            if (songIndex === -1) {
                console.log('No hay canciones disponibles');
                return;
            }
            
            currentSongIndex = songIndex;
            playedSongs.push(songIndex);
            currentMusic = new Audio(currentPlaylist[songIndex]);
            
            currentMusic.onended = function() {
                playNextSong();
            };
        }
        
        currentMusic.play().catch(e => console.log('Error reproduciendo música:', e));
        isMusicPlaying = true;
        console.log(`Reproduciendo: ${currentPlaylist[currentSongIndex]}`);
    }
    
    function pauseMusic() {
        if (currentMusic && isMusicPlaying) {
            currentMusic.pause();
            isMusicPlaying = false;
            console.log('Música pausada');
        }
    }
    
    function playNextSong() {
        playSound(nextSound);
        if (currentMusic) {
            currentMusic.pause();
            currentMusic = null;
        }
        currentSongIndex = -1;
        playMusic();
    }
    
    function playPreviousSong() {
        playSound(nextSound);
        if (currentMusic) {
            currentMusic.pause();
            currentMusic = null;
        }
        
        if (playedSongs.length > 1) {
            playedSongs.pop(); 
            const previousIndex = playedSongs.pop(); 
            if (previousIndex !== undefined) {
                currentSongIndex = previousIndex;
                currentMusic = new Audio(currentPlaylist[previousIndex]);
                currentMusic.play().catch(e => console.log('Error reproduciendo música anterior:', e));
                
                currentMusic.onended = function() {
                    playNextSong();
                };
                
                isMusicPlaying = true;
                playedSongs.push(previousIndex); 
                console.log(`Reproduciendo canción anterior: ${currentPlaylist[previousIndex]}`);
                return;
            }
        }
        
        currentSongIndex = -1;
        playMusic();
    }
    
    function stopMusic() {
        if (currentMusic) {
            currentMusic.pause();
            currentMusic.currentTime = 0;
            currentMusic = null;
        }
        isMusicPlaying = false;
        currentSongIndex = -1;
    }
    
    function initLottieSun(color) {
        const config = colorConfig[color];
        
        if (sunAnimation) {
            sunAnimation.destroy();
        }
        
        sunAnimation = lottie.loadAnimation({
            container: lottieSun,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'icons8-sun.json'
        });
        
        sunAnimation.addEventListener('DOMLoaded', function() {
            setSunColor(config.sunColor);
        });
    }
    
    function setSunColor(color) {
        const sunSvg = lottieSun.querySelector('svg');
        if (sunSvg) {
            const paths = sunSvg.querySelectorAll('path');
            paths.forEach(path => {
                path.style.fill = color;
                path.style.stroke = color;
            });
        }
    }
    
    function setupLeftSideHovers(color) {
        const config = colorConfig[color];
        const leftSideElements = document.querySelector('.left-side-elements');
        
        leftSideElements.addEventListener('mouseenter', function() {
            madebyImg.src = config.madebyHover;
            setSunColor(config.sunHoverColor);
        });
        
        leftSideElements.addEventListener('mouseleave', function() {
            madebyImg.src = config.madeby;
            setSunColor(config.sunColor);
        });
    }
    
    function setupSoundEffects() {
        const hoverElements = [
            document.getElementById('logo-img'),
            document.getElementById('colours-img'),
            document.getElementById('oculum-img'),
            document.getElementById('logobrat-img'),
            document.getElementById('id-img')
        ];
        
        hoverElements.forEach(element => {
            if (element) {
                element.addEventListener('mouseenter', function() {
                    playSound(metalSound);
                });
            }
        });
        
        playButton.addEventListener('click', function() {
            playSound(playSoundElement);
            toggleRadioFrequency(true);
            if (!isMusicPlaying) {
                playMusic();
            }
        });
        
        pauseButton.addEventListener('click', function() {
            playSound(playSoundElement);
            toggleRadioFrequency(false);
            pauseMusic(); 
        });
        
        backwardButton.addEventListener('click', function() {
            playPreviousSong();
        });
        
        forwardButton.addEventListener('click', function() {
            playNextSong();
        });
    }
    
    function setupLeftSideLink() {
        const leftSideElements = document.querySelector('.left-side-elements');
        
        const linkWrapper = document.createElement('a');
        linkWrapper.href = "https://4est-1g0r.github.io/profiles/p1/";
        linkWrapper.target = "_blank";
        linkWrapper.rel = "noopener noreferrer";
        linkWrapper.style.textDecoration = 'none';
        linkWrapper.style.color = 'inherit';
        linkWrapper.style.cursor = 'pointer';
        linkWrapper.style.display = 'flex';
        linkWrapper.style.flexDirection = 'column';
        linkWrapper.style.alignItems = 'center';
        linkWrapper.style.gap = '8px';
        
        while (leftSideElements.firstChild) {
            linkWrapper.appendChild(leftSideElements.firstChild);
        }
        
        leftSideElements.appendChild(linkWrapper);
        
        leftSideElements.addEventListener('mouseenter', function() {
            playSound(click7Sound);
        });
    }

    
    function changeTheme(color) {
        const config = colorConfig[color];
        
        body.classList.remove('red-theme', 'blue-theme', 'white-theme', 'yellow-theme');
        
        body.classList.add(config.bodyClass);
        
        reiraImg.src = config.reira;
        logoImg.src = config.logo;
        addlettersImg.src = config.addletters;
        lineImg.src = config.line;
        bottomLineImg.src = config.line;
        document.getElementById('footer-line-img').src = config.line;
        coloursImg.src = config.colours;
        oculumImg.src = config.oculum;
        reira2Img.src = config.reira2;
        reira0Img.src = config.reira0;
        prefooterImg.src = config.prefooter;
        logobratImg.src = config.logobrat;
        idImg.src = config.id;
        c4tsImg.src = config.c4ts;
        symbolsImg.src = config.symbols;
        reira3Img.src = config.reira3;
        logocassetteImg.src = config.logocassette;
        document.getElementById('footer-bg-img').src = config.footer;
        document.getElementById('threefl-img').src = config.threefl;
        
        madebyImg.src = config.madeby;
        
        initLottieSun(color);
        
        setupLeftSideHovers(color);
        
        isPlaying = false;
        isRadioPlaying = false;
        isMusicPlaying = false;
        playButton.style.display = 'inline-block';
        pauseButton.style.display = 'none';
        radiocassetteImg.src = config.radiocassetteOFF;
        toggleRadioFrequency(false);
        stopMusic();
        
        loadPlaylist(color);
        
        logoImg.onmouseenter = function() {
            this.src = config.logoHover;
            if (color === 'blue' || color === 'white') {
                addlettersImg.src = config.addlettersHover;
            }
        };
        
        logoImg.onmouseleave = function() {
            this.src = config.logo;
            addlettersImg.src = config.addletters;
        };
        
        coloursImg.onmouseenter = function() {
            this.src = config.coloursHover;
        };
        
        coloursImg.onmouseleave = function() {
            this.src = config.colours;
        };
        
        oculumImg.onmouseenter = function() {
            this.src = config.oculumHover;
        };
        
        oculumImg.onmouseleave = function() {
            this.src = config.oculum;
        };
        
        logobratImg.onmouseenter = function() {
            this.src = config.logobratHover;
        };
        
        logobratImg.onmouseleave = function() {
            this.src = config.logobrat;
        };
        
        idImg.onmouseenter = function() {
            this.src = config.idHover;
        };
        
        idImg.onmouseleave = function() {
            this.src = config.id;
        };
        
        updateColorButtons(color);
        
        localStorage.setItem('selectedTheme', color);
    }
    
    // botones de colores
    function updateColorButtons(currentColor) {
        const config = colorConfig[currentColor];
        
        colorButtons.forEach(button => {
            const color = button.getAttribute('data-color');
            const buttonImg = button.querySelector('.button-img');
            
            switch(color) {
                case 'red':
                    buttonImg.src = config.buttons.red;
                    break;
                case 'blue':
                    buttonImg.src = config.buttons.blue;
                    break;
                case 'yellow':
                    buttonImg.src = config.buttons.yellow;
                    break;
                case 'white':
                    buttonImg.src = config.buttons.white;
                    break;
            }
            
            // hover
            button.onmouseenter = function() {
                playSound(clicSound);
                startBeepLoop();
                
                switch(color) {
                    case 'red':
                        buttonImg.src = config.buttons.redHover;
                        break;
                    case 'blue':
                        buttonImg.src = config.buttons.blueHover;
                        break;
                    case 'yellow':
                        buttonImg.src = config.buttons.yellowHover;
                        break;
                    case 'white':
                        buttonImg.src = config.buttons.whiteHover;
                        break;
                }
            };
            
            button.onmouseleave = function() {
                stopBeepLoop();
                
                switch(color) {
                    case 'red':
                        buttonImg.src = config.buttons.red;
                        break;
                    case 'blue':
                        buttonImg.src = config.buttons.blue;
                        break;
                    case 'yellow':
                        buttonImg.src = config.buttons.yellow;
                        break;
                    case 'white':
                        buttonImg.src = config.buttons.white;
                        break;
                }
            };
            
            // click para cambiar tema
            button.onclick = function() {
                changeTheme(color);
            };
        });
    }
    
    // reproductor
    function togglePlayPause() {
        isPlaying = !isPlaying;
        const currentTheme = body.classList[0].replace('-theme', '');
        const config = colorConfig[currentTheme];
        
        if (isPlaying) {
            playButton.style.display = 'none';
            pauseButton.style.display = 'inline-block';
            radiocassetteImg.src = config.radiocassetteON;
        } else {
            playButton.style.display = 'inline-block';
            pauseButton.style.display = 'none';
            radiocassetteImg.src = config.radiocassetteOFF;
        }
    }
    
    // Event listeners para el reproductor
    playButton.addEventListener('click', togglePlayPause);
    pauseButton.addEventListener('click', togglePlayPause);
    
    // Función para seleccionar un color aleatorio al cargar la página
    function setRandomTheme() {
        const colors = ['red', 'blue', 'white', 'yellow'];
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    }
    
    function initTheme() {
        const savedTheme = localStorage.getItem('selectedTheme');
        
        if (savedTheme) {
            changeTheme(savedTheme);
        } else {
            const randomTheme = setRandomTheme();
            changeTheme(randomTheme);
        }
    }
    
    initTheme();
    
    setupSoundEffects();
    setupLeftSideLink();
});

// he usado IA lo admito!!!
// he usado IA lo admito!!!
// he usado IA lo admito!!!
// he usado IA lo admito!!!
// he usado IA lo admito!!!
// he usado IA lo admito!!!
// he usado IA lo admito!!!
// he usado IA lo admito!!!

function handleContainerScaling() {
    const container = document.querySelector('.container');
    const body = document.body;
    
    let wrapper = document.querySelector('.container-wrapper');
    if (!wrapper) {
        wrapper = document.createElement('div');
        wrapper.className = 'container-wrapper';
        container.parentNode.insertBefore(wrapper, container);
        wrapper.appendChild(container);
        
        const style = document.createElement('style');
        style.textContent = `
            .container-wrapper {
                width: 100%;
                height: 100vh;
                overflow: hidden;
                position: relative;
            }
            .container.scaled {
                transform-origin: top center;
                margin: 0 auto;
            }
        `;
        document.head.appendChild(style);
    }
    
    function checkAndFreezeScaling() {
        const containerHeight = container.scrollHeight;
        const viewportHeight = window.innerHeight;
        const isOverflowing = containerHeight > viewportHeight;
        
        console.log(`Container: ${containerHeight}px, Viewport: ${viewportHeight}px, Overflow: ${isOverflowing}`);
        
        if (isOverflowing) {
            // Congelar el tamaño - calcular la escala máxima permitida
            const scaleFactor = viewportHeight / containerHeight;
            
            // Aplicar transform scale para limitar el tamaño
            container.style.zoom = 'unset';
            container.style.transform = `scale(${scaleFactor})`;
            container.classList.add('scaled');
            
            console.log(`Scaling container to: ${scaleFactor}`);
        } else {
            // Restaurar zoom normal si no hay overflow
            container.style.transform = 'none';
            container.style.zoom = '1.0';
            container.classList.remove('scaled');
        }
    }
    
    // Suavizar las transiciones
    container.style.transition = 'transform 0.1s ease';
    
    // Verificar en resize con debounce para evitar saltos
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(checkAndFreezeScaling, 50);
    });
    
    window.addEventListener('orientationchange', function() {
        setTimeout(checkAndFreezeScaling, 100);
    });
    
    setTimeout(checkAndFreezeScaling, 100);
    
    setInterval(checkAndFreezeScaling, 500);
}

document.addEventListener('DOMContentLoaded', function() {
    
    setTimeout(handleContainerScaling, 200);
});

window.addEventListener('load', handleContainerScaling);
