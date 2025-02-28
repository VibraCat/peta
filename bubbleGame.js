// Aquest mòdul s’encarrega de crear la graella de bombolles i gestionar el seu comportament





 
  

  export function initBubbleGame(dispositiu) {
    const bubbleContainer = document.getElementById('bubble-container');
    const restartBtn = document.getElementById('restart-btn');
  
    // Ara les rutes dels sons inclouen el subdirectori audios
    const popSoundsSrc = ['audios/bombolla-peta-0.mp3', 
                          'audios/bombolla-peta-1.mp3', 
                          'audios/bombolla-peta-2.mp3', 
                          'audios/bombolla-peta-3.mp3',
                          'audios/bombolla-peta-4.mp3',
                          'audios/bombolla-peta-5.mp3',
                          'audios/bombolla-peta-6.mp3',
                         ];
    const popSoundsVolum = [0.9, 
                            0.9, 
                            0.9, 
                            0.9,
                            0.2,
                            0.2,
                            0.2,
                           ];
    const popSounds = popSoundsSrc.map(src => new Audio(src));



    const backgroundSound = new Audio("audios/soroll-plastic-fons.mp3");
    backgroundSound.volume = 0.5
    backgroundSound.loop = true;
    backgroundSound.play();

    let totalBubbles = 0;
    let poppedCount = 0;
  
    function createResponsiveBubbleLayout() {
      bubbleContainer.innerHTML = '';
  
      const header = document.querySelector('header');
      const footer = document.querySelector('footer');
      const headerHeight = header ? header.getBoundingClientRect().height : 0;
      const footerHeight = footer ? footer.getBoundingClientRect().height : 0;
  
      document.documentElement.style.setProperty('--header-height', headerHeight + 'px');
      document.documentElement.style.setProperty('--footer-height', footerHeight + 'px');
  
      const availableWidth = window.innerWidth;
      const availableHeight = window.innerHeight - headerHeight - footerHeight;
  
      const gap = 5; 
      const minBubbleSize = 30;
      const maxBubbleSize = 80;
  
      let bubbleSize = maxBubbleSize;
      let rows = 0;
      let cols = 0;
  
      for (let size = maxBubbleSize; size >= minBubbleSize; size--) {
        const possibleCols = Math.floor((availableWidth - gap * 2) / (size + gap));
        const possibleRows = Math.floor((availableHeight - gap * 2) / (size + gap));
        if (possibleCols > 0 && possibleRows > 0) {
          bubbleSize = size;
          rows = possibleRows;
          cols = possibleCols;
          break;
        }
      }
  
      if (rows === 0 || cols === 0) return;
  
      document.documentElement.style.setProperty('--bubble-size', bubbleSize + 'px');
  
      totalBubbles = rows * cols;
      poppedCount = 0; 
      restartBtn.style.display = 'none';
  
      for (let r = 0; r < rows; r++) {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('row');
        if (r % 2 === 1) {
            rowDiv.classList.add('odd-row');
          } else {
              rowDiv.classList.add('even-row');            
          }
  
        for (let c = 0; c < cols; c++) {
          const bubble = document.createElement('div');
          bubble.classList.add('bubble');
          bubble.addEventListener('click', onBubbleClick);
          rowDiv.appendChild(bubble);
        }
  
        bubbleContainer.appendChild(rowDiv);
      }
    }
  
    function onBubbleClick(e) {
      const bubble = e.currentTarget;
      if (!bubble.classList.contains('popped')) {
        backgroundSound.pause()
        backgroundSound.currentTime = 0;


        bubble.classList.add('popped');
        poppedCount++;
  
        // Seleccionem un so aleatòriament
        const randomIndex = Math.floor(Math.random() * popSounds.length);
        const chosenSound = popSounds[randomIndex];

        chosenSound.currentTime = 0;
        chosenSound.volume = popSoundsVolum[randomIndex];
        chosenSound.play();
  
        if (poppedCount === totalBubbles) {
          restartBtn.style.display = 'block';
          backgroundSound.currentTime = 0;
          backgroundSound.loop = true;
          backgroundSound.play();
        }
      }
    }
  
    function restartGame() {
      createResponsiveBubbleLayout();
    }
  
    restartBtn.addEventListener('click', restartGame);
  
    createResponsiveBubbleLayout();
    window.addEventListener('resize', createResponsiveBubbleLayout);
  }
  
