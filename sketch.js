var canvas;

var whiteNoise;

let filter, filterFreq, filterWidth;



function windowResized() {
  //console.log('resized');
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  //canvas.style('z-index', '-1');
  // canvas.position(0,0);
  // canvas.style('z-index', '-1');
  pixelDensity(1);
  // 
  // 
  getAudioContext().suspend();

  filter = new p5.BandPass();
  whiteNoise = new p5.Noise();
  whiteNoise.disconnect(); // Disconnect soundfile from master output...
  filter.process(whiteNoise); // ...and connect to filter so we'll only hear BandPass.
}
function mousePressed() {
  userStartAudio();
  whiteNoise.start();
}

function draw() {
  // let yoff = 0;
  loadPixels();
  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++){
      var index = (x + y * width) * 4;
      var r = random(255);
      pixels[index + 0] = r;
      pixels[index + 1] = r;
      pixels[index + 2] = r;
      pixels[index + 3] = 255;

      
    } 
  }
  updatePixels();
  // noLoop();
  filterFreq = map(mouseX, 0, width, 10, 22050);
  // Map mouseY to resonance/width
  filterWidth = map(mouseY, 0, height, 0, 90);
  // set filter parameters
  filter.set(filterFreq, filterWidth);
}