const size = 20;
const nVectors = 20;

class Vec {
  constructor(x, y, space){
    this.x = x;
    this.y = y;
    this.randomiseDir();
    this.space = space;
    this.isStuck = false;
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
    return [oldX, oldY, this.x, this.y];
  }

  move(){
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

export default function sketch(p){
  const refresh = (vectors, space, lines) => {
    for(const vector of vectors){
      const line = vector.move();
      if(line){
        lines.push(line);
      }
      space[vector.x][vector.y] = 1;
    }
  }

  const indexToPos = (index) => -p.windowHeight/2 + ((p.windowHeight/size) * index);
   
  let space = Array.from({length: size}).map(() => Array.from({length: size}).fill(0));
  let vectors = Array.from({length: nVectors});
  let lines = Array();
  let timer = 0;

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    for(let i=0; i<nVectors; i++){
      const randX = Math.floor(Math.random() * size);
      const randY = Math.floor(Math.random() * size);
      vectors[i] = new Vec(randX, randY, space);
    }
  }

  p.windowResized = () => p.resizeCanvas(p.windowWidth, p.windowHeight);
  
  p.draw = () => {
    p.background(0);
    p.stroke("white");
    p.strokeWeight(1);

    for(const line of lines){
      p.line(
        indexToPos(line[0]), 
        indexToPos(line[1]), 
        indexToPos(line[2]), 
        indexToPos(line[3])
      );
    }

    if (p.millis() >= 1+timer) {
      refresh(vectors, space, lines);
      timer = p.millis();
    }
  };
}