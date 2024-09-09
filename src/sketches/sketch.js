import Vec from "./Vec";

const size = 21;
const strokeWeight = 10;
const radius = 1;
const nVectors = 2;
const colours = [
  [255, 0, 0],
  [255, 255, 255]
];
const margin = 50;

function moveVectors(vectors, space, lines) {
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
  // WEBGL
  // return -(canvasSize-100)/2 + (((canvasSize-100)/size) * index);

  // P2D
  // For some reason 20 and 55 are the offsets with the most equal looking margins
  // TO-DO Investigate why this is
  return 20 + ((canvasSize-40)/(size-1)) * index;
}

function createCircularStartIndexes(space, r) {
  const centreX = Math.floor(space.length / 2);
  const centreY = Math.floor(space[0].length / 2);
  let indexes = []

  for(let i=0; i<space.length; i++){
    for(let j=0; j<space[0].length; j++){
      const a = i - centreX;
      const b = j - centreY;
      if((a*a + b*b) <= (r*r)){
        indexes.push([i, j]);
      }
    }
  }

  return indexes;
}

export default function sketch(p) {
  let space = Array.from({length: size}).map(() => Array.from({length: size}).fill([0, undefined]));
  let vectors = Array();
  let lines = Array();
  let timer = 0;
  let currentLine = 1;
  const canvasSize = (p.windowHeight < p.windowWidth) ? p.windowHeight - margin : p.windowWidth - margin;

  p.setup = () => {
    p.createCanvas(canvasSize, canvasSize, p.P2D);

    let coloursIndex = 0;

    // Circular start position vectors
    const startIndexes = createCircularStartIndexes(space, radius);
    for(let i=0; i<startIndexes.length; i++){
      const newVec = new Vec(i+1, startIndexes[i][0], startIndexes[i][1], space, colours[coloursIndex]);
      vectors.push(newVec);
      coloursIndex++;
      coloursIndex = (coloursIndex == colours.length) ?  0 : coloursIndex;
    }

    // Random start position vectors
    // for(let i=0; i<nVectors; i++){
    //   const randX = Math.floor(Math.random() * size);
    //   const randY = Math.floor(Math.random() * size);
    //   vectors[i] = new Vec(i+1, randX, randY, space, colours[coloursIndex]);
    //   coloursIndex++;
    //   coloursIndex = (coloursIndex == colours.length) ?  0 : coloursIndex;
    // }

    let isFinished;
    do{
      isFinished = moveVectors(vectors, space, lines);
    } while(!isFinished);
  }

  // p.windowResized = () => p.resizeCanvas(500, 500);
  
  p.draw = () => {
    p.background(0);
    p.strokeWeight(strokeWeight);

    for(let i=0; i<currentLine; i++){
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

    if (p.millis() >= 10+timer) {
      currentLine++;
      if(currentLine == lines.length) p.noLoop();
      timer = p.millis();
    }
  };
}