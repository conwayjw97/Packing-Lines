import Vec from "./Vec";

const size = 21;
const nVectors = 4;
const strokeWeight = 5;
const radius = 1;
const colours = [
  [255, 0, 0],
  [255, 255, 255]
];

function refresh(vectors, space, lines) {
  let allVectorsStuck = true;
  for(const vector of vectors){
    if(!vector.isStuck) {
      allVectorsStuck = false;
      const line = vector.move();
      if(line){
        lines.push(line);
      }
      space[vector.x][vector.y] = 1;
    }
  }

  return (allVectorsStuck) ? true : false;
}

function indexToPos(index, windowHeight) {
  return -(windowHeight-100)/2 + (((windowHeight-100)/size) * index);
}

function createCircularStartIndexes(space, r) {
  const centreX = Math.floor(space.length / 2);
  const centreY = Math.floor(space[0].length / 2);
  console.log([space.length, centreX])
  let indexes = []

  for(let i=0; i<space.length; i++){
    for(let j=0; j<space[0].length; j++){
      const a = i - centreX;
      const b = j - centreY;
      if((a*a + b*b) <= (r*r)){
        indexes.push([i, j])
        space[i][j] = 1;
      }
    }
  }

  return indexes;
}

export default function sketch(p) {
  let space = Array.from({length: size}).map(() => Array.from({length: size}).fill(0));
  let vectors = Array();
  let lines = Array();
  let timer = 0;

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    let coloursIndex = 0;

    // Central start position vectors
    // const centreX = Math.round(space.length / 2) - 1;
    // const centreY = Math.round(space[0].length / 2) - 1;
    // for(let i=0; i<nVectors; i++){
    //   let dir = [0, -1];
    //   vectors[i] = new Vec(centreX, centreY, dir, space, colours[coloursIndex]);
    //   coloursIndex++;
    //   coloursIndex = (coloursIndex == colours.length) ?  0 : coloursIndex;
    // }

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
    //   vectors[i] = new Vec(randX, randY, space, colours[coloursIndex]);
    //   coloursIndex++;
    //   coloursIndex = (coloursIndex == colours.length) ?  0 : coloursIndex;
    // }
  }

  p.windowResized = () => p.resizeCanvas(p.windowWidth, p.windowHeight);
  
  p.draw = () => {
    p.background(0);
    p.strokeWeight(strokeWeight);

    for(const line of lines){
      p.stroke(line[4]);
      p.line(
        indexToPos(line[0], p.windowHeight), 
        indexToPos(line[1], p.windowHeight), 
        indexToPos(line[2], p.windowHeight), 
        indexToPos(line[3], p.windowHeight)
      );
    }

    if (p.millis() >= 10+timer) {
      const isFinished = refresh(vectors, space, lines);
      if(isFinished) p.noLoop();
      timer = p.millis();
      // console.log(p.frameRate());
    }
  };
}