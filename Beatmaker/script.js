class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll('.pad');
    this.playBtn = document.querySelector('.play');
    this.kickAudio = document.querySelector('.kick-sound');
    this.snareAudio = document.querySelector('.snare-sound');
    this.hihatAudio = document.querySelector('.hihat-sound');
    this.index = 0;
    this.bpm = 80;
  }

  addClass() {
    console.log(this);
  }

  repeat() {
    let step = this.index % 8;
    const activePad = document.querySelectorAll(`.b${step}`);
    console.log(activePad);
    this.index++;
  }

  start() {
    const interval = (60 / this.bpm) * 1000;
    setInterval(() => {
      this.repeat()
    }, interval)
  }

}

const drumKit = new DrumKit();

drumKit.pads.forEach((pad) => {
  pad.addEventListener('click', () => pad.classList.toggle('active'))
})
drumKit.playBtn.addEventListener('click', () => drumKit.start())
