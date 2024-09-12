import Vec from "./Vec";

let size = 50;
let speed = 20;
let startAlgo = "rand";
let nVectors = 50;
let strokeWeight = 3;
let colour1 = "#ffffff";
let colour2 = "#ffffff";
let loop = true;
const radius = 10;
const margin = 50;

function moveVectors(vectors, lines) {
  let allVectorsFinished = true;
  for(const vector of vectors){
    if(!vector.isFinished) {
      allVectorsFinished = false;
      const line = vector.move();
      if(line){
        lines.push(line);
      }
    }
  }

  return (allVectorsFinished) ? true : false;
}

function indexToPos(index, canvasSize) {
  return 20 + ((canvasSize-40)/(size-1)) * index;
}

function randomStartVectors(size, space, colours){
  let coloursIndex = 0;
  let vectors = [];

  for(let i=0; i<nVectors; i++){
    const randX = Math.floor(Math.random() * size);
    const randY = Math.floor(Math.random() * size);
    const newVec = new Vec(i+1, randX, randY, space, colours[coloursIndex]);
    vectors.push(newVec);
    coloursIndex++;
    coloursIndex = (coloursIndex === colours.length) ?  0 : coloursIndex;
  }

  return vectors;
}

function circularStartVectors(nVectors, r, space, colours) {
  const centreX = Math.floor(space.length / 2);
  const centreY = Math.floor(space[0].length / 2);
  let indexes = [];

  const slice = 2 * Math.PI / nVectors;
  for (let i=0; i<nVectors; i++){
      const angle = slice * i;
      const newX = Math.round((centreX + r * Math.cos(angle)));
      const newY = Math.round((centreY + r * Math.sin(angle)));
      if(!indexes.includes([newX, newY])) indexes.push([newX, newY]);
  }
  
  let coloursIndex = 0;
  let vectors = [];
  for (let i=0; i<indexes.length; i++){
    const newVec = new Vec(i+1, indexes[i][0], indexes[i][1], space, colours[coloursIndex]);
    vectors.push(newVec);
    coloursIndex++;
    coloursIndex = (coloursIndex === colours.length) ?  0 : coloursIndex;
  }
}

function edgeStartVectors(nVectors, space, colours) {
  let availableIndexes = [];
  const xLim = space.length - 1;
  const yLim = space[0].length - 1;

  for(let i=0; i<space.length; i++){
    for(let j=0; j<space[0].length; j++){
      if(i == 0 || j == 0 || i == xLim || j == yLim){
        availableIndexes.push([i, j]);
      }
    }
  }

  let indexes = [];
  let i, arrayLen;
  if(nVectors < indexes.length) {
    arrayLen = nVectors;
  } else {
    arrayLen = availableIndexes.length;
  }
  i = Math.ceil(arrayLen/2);
  let j = i - 1;

  while (j >= 0) {
    indexes.push(availableIndexes[j--]);
    if (i < arrayLen) indexes.push(availableIndexes[i++]);
  }

  let coloursIndex = 0;
  let vectors = [];
  for (let i=0; i<indexes.length; i++){
    const newVec = new Vec(i+1, indexes[i][0], indexes[i][1], space, colours[coloursIndex]);
    vectors.push(newVec);
    coloursIndex++;
    coloursIndex = (coloursIndex === colours.length) ?  0 : coloursIndex;
  }

  return vectors;
}

function drawLine(p, i, lines){
  if(i < lines.length){
    const line = lines[i];
    const x1 = line[0];
    const y1 = line[1];
    const x2 = line[2];
    const y2 = line[3];
    const colour = line[4];

    p.stroke(colour);
    p.line(
      indexToPos(x1, p.width), 
      indexToPos(y1, p.width), 
      indexToPos(x2, p.width), 
      indexToPos(y2, p.width)
    );
  }
}

function interpolateColours(colour1, colour2, percent) {
  // Convert the hex colors to RGB values
  const r1 = parseInt(colour1.substring(1, 3), 16);
  const g1 = parseInt(colour1.substring(3, 5), 16);
  const b1 = parseInt(colour1.substring(5, 7), 16);

  const r2 = parseInt(colour2.substring(1, 3), 16);
  const g2 = parseInt(colour2.substring(3, 5), 16);
  const b2 = parseInt(colour2.substring(5, 7), 16);

  // Interpolate the RGB values
  const r = Math.round(r1 + (r2 - r1) * percent);
  const g = Math.round(g1 + (g2 - g1) * percent);
  const b = Math.round(b1 + (b2 - b1) * percent);

  // Convert the interpolated RGB values back to a hex color
  const outColour = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  return outColour;
}

export default function sketch(p) {
  let space, vectors, lines, timer, pause, lineStep, reverse, colours;
  let canvasSize = (p.windowHeight < p.windowWidth) ? p.windowHeight - margin : p.windowWidth - margin;

  p.updateWithProps = props => {
    if (props.size) size = Number(props.size);
    if (props.speed) speed = Number(props.speed);
    if (props.nVectors) nVectors = Number(props.nVectors);
    if (props.lineWidth) strokeWeight = Number(props.lineWidth);
    if (props.colour1) colour1 = "#" + props.colour1;
    if (props.colour2) colour2 = "#" + props.colour2;
    if (props.startAlgo) startAlgo = props.startAlgo;
    if (props.loop) loop = (props.loop === "true");
    p.setup();
  };

  p.setup = () => {
    p.createCanvas(canvasSize, canvasSize, p.P2D);
    space = Array.from({length: size}).map(() => Array.from({length: size}).fill([0, undefined]));
    vectors = [];
    lines = [];
    timer = 0;
    pause = false;
    lineStep = 0;
    reverse = false;
    colours = [];

    const percent = 1 / nVectors;
    let i = 0;
    while(i <= 1){
      colours.push(interpolateColours(colour1, colour2, i));
      i += percent;
    }

    let coloursIndex = 0;
    let vectorsIndex = 0;

    switch(startAlgo){
      case "rand":
        vectors = randomStartVectors(size, space, colours);
        break;
      case "circ":
        vectors = circularStartVectors(nVectors, radius, space, colours);
        break;
      case "edge":
        vectors = edgeStartVectors(nVectors, space, colours);
        break;
      default:
        break;
    }
  
    let isFinished;
    do{
      isFinished = moveVectors(vectors, lines);
    } while(!isFinished);
  
    // Remaining start position vectors
    for(let i=0; i<space.length; i++){
      for(let j=0; j<space[0].length; j++){
        if(space[i][j][0] === 0){
          vectorsIndex++;
          const cleanupVector = new Vec(vectorsIndex, i, j, space, colours[coloursIndex]);
          coloursIndex++;
          coloursIndex = (coloursIndex === colours.length) ?  0 : coloursIndex;
  
          let isFinished;
          do{
            isFinished = moveVectors([cleanupVector], lines);
          } while(!isFinished);
        }
      }
    }
  
    p.background(0);
    p.strokeWeight(strokeWeight);
  }

  p.windowResized = () => {
    canvasSize = (p.windowHeight < p.windowWidth) ? p.windowHeight - margin : p.windowWidth - margin;
    p.resizeCanvas(canvasSize, canvasSize)
  }
  
  p.draw = () => {
    if(!pause){
      p.clear();
      
      if(lineStep < 0){
        lineStep = 0;
        reverse = false;
        pause = true;
        timer = p.millis();
      } 
      if(lineStep > lines.length){
        lineStep = lines.length;
        reverse = true;
        pause = true;
        timer = p.millis();
      }

      for(let i=0; i<lineStep; i++){
        drawLine(p, i, lines);
      }

      if(!reverse){
        lineStep += speed;
      } else {
        lineStep -= speed;
      }
    }

    if(pause && p.millis() >= 1000+timer && loop) {
      pause = false;
    }
  };
}