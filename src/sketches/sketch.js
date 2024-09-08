const size = 20;
const nVectors = 12;
const strokeWeight = 10;
const colours = [
  [255, 0, 0], 
  "white"
];

class Vec {
  constructor(x, y, space, colour){
    this.x = x;
    this.y = y;
    this.randomiseDir();
    this.space = space;
    this.isStuck = false;
    this.colour = colour;
  }

  isPosValid(x, y){
    const xLim = this.space.length - 1;
    const yLim = this.space[0].length - 1;
    if(x > xLim || y > yLim || x < 0 || y < 0){
      return false;
    }
    return this.space[x][y] == 0;
  }

  rotate45Clockwise(){ // TO-DO: find a neat formula for this
    if (this.dir[0] == 0 && this.dir[1] == 1){
      this.dir = [1, 1];
    } else if (this.dir[0] == 1 & this.dir[1] == 1){
      this.dir = [1, 0];
    } else if (this.dir[0] == 1 & this.dir[1] == 0){
      this.dir = [1, -1];
    } else if (this.dir[0] == 1 & this.dir[1] == -1){
      this.dir = [0, -1];
    } else if (this.dir[0] == 0 & this.dir[1] == -1){
      this.dir = [-1, -1];
    } else if (this.dir[0] == -1 & this.dir[1] == -1){
      this.dir = [-1, 0];
    } else if (this.dir[0] == -1 & this.dir[1] == 0){
      this.dir = [-1, 1];
    } else if (this.dir[0] == -1 & this.dir[1] == 1){
      this.dir = [0, 1];
    } else {
      this.dir = [0, 0];
    }
  }

  randomiseDir(){
    this.dir = [-1 + Math.floor(Math.random() * 3), -1 + Math.floor(Math.random() * 3)];
  }

  moveInDir(){
    const oldX = this.x;
    const oldY = this.y;
    this.x = this.x + this.dir[0];
    this.y = this.y + this.dir[1];
    return [oldX, oldY, this.x, this.y, this.colour];
  }

  move(){
    if(!this.isStuck){
      if(this.isPosValid(this.x + this.dir[0], this.y + this.dir[1])){
        return this.moveInDir();
      }
      else {
        let rotateCount = 0;
        while(rotateCount < 8){
          this.rotate45Clockwise();
          if(this.isPosValid(this.x + this.dir[0], this.y + this.dir[1])){
            return this.moveInDir();
          }
          rotateCount++;
        }
        this.isStuck = true;
      }
    }
  }
}

export default function sketch(p){
  const refresh = (vectors, space, lines) => {
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

  const indexToPos = (index) => -(p.windowHeight-100)/2 + (((p.windowHeight-100)/size) * index);

  const getCircularStartIndexes = (space, r) => {
    const centreX = Math.round(space.length / 2);
    const centreY = Math.round(space[0].length / 2);
    let indexes = []

    for(let i=0; i<space.length; i++){
      for(let j=0; j<space[0].length; j++){
        const a = i - centreX;
        const b = j - centreY;
        if((a*a + b*b) <= (r*r)){
          indexes.push([i, j])
        }
      }
    }

    return indexes;
  }
   
  let space = Array.from({length: size}).map(() => Array.from({length: size}).fill(0));
  let vectors = Array();
  let lines = Array();
  let timer = 0;

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    let coloursIndex = 0;

    // Circular start position vectors
    const startIndexes = getCircularStartIndexes(space, 1);
    for(let i=0; i<startIndexes.length; i++){
      vectors[i] = new Vec(startIndexes[i][0], startIndexes[i][1], space, colours[coloursIndex]);
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
        indexToPos(line[0]), 
        indexToPos(line[1]), 
        indexToPos(line[2]), 
        indexToPos(line[3])
      );
    }

    if (p.millis() >= 1+timer) {
      const isFinished = refresh(vectors, space, lines);
      if(isFinished) p.noLoop();
      timer = p.millis();
      // console.log(p.frameRate());
    }
  };
}