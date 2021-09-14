const colorDivs = document.querySelectorAll('.color');
const generateBtn = document.querySelector('.generate');
const sliders = document.querySelectorAll('input[type="range"]');
const currentHexes = document.querySelectorAll('.color h2');
let initialColor;

// Events
sliders.forEach(slide => {
  slide.addEventListener('input', hslControls)
});

function generateHex() {
  const hexColor = chroma.random();
  return hexColor;
}

function randomColors(){
  colorDivs.forEach((div) => {
    const hexText = div.children[0];
    const adjustText = div.children[1].children[0];
    const lockText = div.children[1].children[1];
    const randomColor = generateHex();

    div.style.backgroundColor = randomColor;
    hexText.innerText = randomColor;

    checkTextContrast(randomColor, [hexText,adjustText,lockText]);

    const color = chroma(randomColor);
    const sliders = div.querySelectorAll('.sliders input');
    const hue = sliders[0];
    const brightness = sliders[1];
    const saturation = sliders[2];

    colorizeCliders(color, hue, brightness, saturation)
  })
}

function checkTextContrast(color, arr){
  arr.forEach((element) => {
    const luminance = chroma(color).luminance();
    if(luminance > 0.5){
      element.style.color = "black";
    } else {
      element.style.color = "white"
    }
  })
}

function colorizeCliders(color, hue, brightness, saturation){
  // Scale Saturation
  const fullSaturation = color.set('hsl.s', 1);
  const noSaturation = color.set('hsl.s', 0);
  const scaleSaturation = chroma.scale([noSaturation, color, fullSaturation]);
  // Scale Brightness
  const midBright = color.set('hsl.l', 0.5);
  const scaleBright = chroma.scale(['black', midBright, 'white'])

  // Update Inputs
  saturation.style.backgroundImage = `linear-gradient(to right, ${scaleSaturation(0)}, ${scaleSaturation(1)})`;
  brightness.style.backgroundImage = `linear-gradient(to right, ${scaleBright(0)},${scaleBright(0.5)}, ${scaleBright(1)})`;
  hue.style.backgroundImage = `linear-gradient(to right, rgb(204, 75, 75), rgb(204, 204, 75), rgb(75, 204, 75), rgb(75, 204, 204), rgb(75, 75, 204), rgb(204, 75 ,204), rgb(204, 75, 75))`;
}

//update colors from inputs
function hslControls(e) {
  const index =
    e.target.getAttribute('data-brightness') ||
    e.target.getAttribute('data-saturation') ||
    e.target.getAttribute('data-hue');

  let sliders = e.target.parentElement.querySelectorAll('input[type="range"]');
  
  const hue = sliders[0];
  const brightness = sliders[1];
  const saturation = sliders[2];

  console.log(e.target.parentElement.querySelectorAll('input[type="range"]'));
  // console.log(sliders[1]);
  // console.log(sliders[2]);

  const bgColor = colorDivs[index].querySelector('h2').innerText;

  let color = chroma(bgColor)
                    .set('hsl.l', brightness.value)
                    .set('hsl.s', saturation.value)
                    .set('hsl.h', hue.value);

  colorDivs[index].style.backgroundColor = color;
}

randomColors()
