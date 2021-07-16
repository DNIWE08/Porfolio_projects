class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll('.pad');
    this.playBtn = document.querySelector('.play');
    this.kickAudio = document.querySelector('.kick-sound');
    this.snareAudio = document.querySelector('.snare-sound');
    this.hihatAudio = document.querySelector('.hihat-sound');
    this.index = 0;
    this.bpm = 150;
    this.isPlaying = null;
  }

  repeat() {
    let step = this.index % 8;
    const activePad = document.querySelectorAll(`.b${step}`);
    activePad.forEach((pad) => {
      pad.style.animation = `0.3s ease 0s alternate 2 playTrack`;
      if(pad.classList.contains('active')){
        if(pad.classList.contains('kick-pad')) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if(pad.classList.contains('snare-pad')) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if(pad.classList.contains('hihat-pad')) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
      }
    });
    this.index++;
  }

  start() {
    const interval = (60 / this.bpm) * 1000;
    if(this.isPlaying) {
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
    console.log(this.isPlaying);
    if(this.isPlaying) {
      this.playBtn.textContent = 'Stop';
      this.playBtn.classList.remove('playing');
    } else {
      this.playBtn.textContent = 'Play';
      this.playBtn.classList.add('playing');
    }
  }

}

const drumKit = new DrumKit();

drumKit.pads.forEach((pad) => {
  pad.addEventListener('click', () => pad.classList.toggle('active'));
  pad.addEventListener('animationend', () => pad.style.animation = '');
})
drumKit.playBtn.addEventListener('click', () => {
  drumKit.start();
  drumKit.updateBtn();
});