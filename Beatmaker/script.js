class DrumKit {
  constructor() {
    this.muteBtns = document.querySelectorAll('.mute');
    this.pads = document.querySelectorAll('.pad');
    this.selects = document.querySelectorAll('select');
    
    this.playBtn = document.querySelector('.play');
    this.kickAudio = document.querySelector('.kick-sound');
    this.snareAudio = document.querySelector('.snare-sound');
    this.hihatAudio = document.querySelector('.hihat-sound');
    this.tempoSlider = document.querySelector('.tempo-slider');
    this.tempoText = document.querySelector('.tempo-value');

    this.tempoText.innerText = this.tempoSlider.value;

    this.currentKick = './allSounds/kick-classic.wav';
    this.currentSnare = './allSounds/snare-acoustic01.wav';
    this.currentHihat = './allSounds/hihat-acoustic01.wav';

    this.index = 0;
    this.bpm = 150;
    this.isPlaying = null;

    // --> Проверить разницу в использовании <--
    // this.playBtn.addEventListener('click', () => {
    //   drumKit.start();
    //   drumKit.updateBtn();
    // });
  }

  repeat() {
    let step = this.index % 8;
    const activePad = document.querySelectorAll(`.b${step}`);
    activePad.forEach((pad) => {
      pad.style.animation = `0.3s ease 0s alternate 2 playTrack`;
      if (pad.classList.contains('active')) {
        if (pad.classList.contains('kick-pad')) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (pad.classList.contains('snare-pad')) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if (pad.classList.contains('hihat-pad')) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
      }
    });
    this.index++;
  }

  start() {
    const interval = (60 / this.bpm) * 1000;
    if (this.isPlaying) {
      clearInterval(this.isPlaying);
      this.isPlaying = null;
      this.index = 0;
      this.playBtn.textContent = 'Play';
    } else {
      this.isPlaying = setInterval(() => {
        this.repeat()
      }, interval);
      this.playBtn.textContent = 'Stop';
    }
  }

  updateBtn() {
    if (this.isPlaying) {
      this.playBtn.textContent = 'Stop';
      this.playBtn.classList.add('playing');
    } else {
      this.playBtn.textContent = 'Play';
      this.playBtn.classList.remove('playing');
    }
  }

  changeSound(e) {
    const selectedName = e.target.name;
    const selectedValue = e.target.value;
    switch (selectedName) {
      case "kick-select":
        this.kickAudio.src = selectedValue;
        break;
      case "snare-select":
        this.snareAudio.src = selectedValue;
        break;
      case "hihat-select":
        this.hihatAudio.src = selectedValue;
        break;
    }
  }

  mute(e) {
    const muteAudio = e.target.getAttribute('data-track');
    e.target.classList.toggle('active');
    if (e.target.classList.contains('active')) {
      switch (muteAudio) {
        case "0":
          this.kickAudio.volume = 0;
          break;
        case "1":
          this.snareAudio.volume = 0;
          break;
        case "2":
          this.hihatAudio.volume = 0;
          break;
      }
    } else {
      switch (muteAudio) {
        case "0":
          this.kickAudio.volume = 1;
          break;
        case "1":
          this.snareAudio.volume = 1;
          break;
        case "2":
          this.hihatAudio.volume = 1;
          break;
      }
    }
  }

  changeTempo(e) {
    this.tempoText.innerText = e.target.value;
    this.bpm = e.target.value;
    console.log(this.bpm);
    clearInterval(this.isPlaying);
    this.isPlaying = null;
    if (this.playBtn.classList.contains('playing')) {
      this.start();
    }
  }

  // updateTempo() {
  //   clearInterval(this.isPlaying);
  //   this.isPlaying = null;
  //   const playBtn = document.querySelector('.play');
  //   if (playBtn.classList.contains('playing')) {
  //     this.start();
  //   }
  // }

}

const drumKit = new DrumKit();

drumKit.pads.forEach((pad) => {
  pad.addEventListener('click', () => pad.classList.toggle('active'));
  pad.addEventListener('animationend', () => pad.style.animation = '');
});

drumKit.playBtn.addEventListener('click', () => {
  drumKit.start();
  drumKit.updateBtn();
});

drumKit.selects.forEach((select) => {
  select.addEventListener('change', (e) => {
    drumKit.changeSound(e);
  });
});

drumKit.muteBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    drumKit.mute(e);
  });
});

drumKit.tempoSlider.addEventListener('input', (e) => {
  drumKit.changeTempo(e);
});

// drumKit.tempoSlider.addEventListener('change', () => {
//   drumKit.updateTempo();
// });