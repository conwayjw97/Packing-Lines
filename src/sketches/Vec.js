const directions = [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]];

export default class Vec {
    constructor(id, x, y, space, colour, dir=null){
      this.id = id;
      this.x = x;
      this.y = y;
      this.space = space;
      this.space[x][y] = id;
      this.colour = colour;
      if(dir){
        this.dir = dir;
      } else {
        this.randomiseDir();
      }
      this.isStuck = false;
    }

    isDirectionDiagonal(){
      return (this.dir[0]!=0 && this.dir[1]!=0);
    }

    isDiagonalLineAhead(){ 
      const spaceToCheck1 = this.space[this.x + this.dir[0]][this.y];
      const spaceToCheck2 = this.space[this.x][this.y + this.dir[1]];
      const space1IsTaken = spaceToCheck1 != 0;
      const space2IsTaken = spaceToCheck2 != 0;
      const spacesAreSameVectors = spaceToCheck1 == spaceToCheck2;
      return space1IsTaken && space2IsTaken && spacesAreSameVectors;
    }
  
    isNextPosValid(){
      const newX = this.x + this.dir[0];
      const newY = this.y + this.dir[1];
      const xLim = this.space.length - 1;
      const yLim = this.space[0].length - 1;
      if(newX > xLim || newY > yLim || newX < 0 || newY < 0){
        return false;
      }
      if(this.isDirectionDiagonal()){
        if(this.isDiagonalLineAhead()){
          return false;
        }
      }
      return this.space[newX][newY] == 0;
    }
  
    rotate45Clockwise(){ // TO-DO: find a neat formula for this
      this.dir = directions[(directions.indexOf(this.dir) + 1) % directions.length];
    }
  
    randomiseDir(){
      this.dir = [-1 + Math.floor(Math.random() * 3), -1 + Math.floor(Math.random() * 3)];
      if(this.dir == [0, 0]) this.randomiseDir();
    }
  
    moveInDir(){
      const oldX = this.x;
      const oldY = this.y;
      this.x = this.x + this.dir[0];
      this.y = this.y + this.dir[1];
      this.space[this.x][this.y] = this.id;
      return [oldX, oldY, this.x, this.y, this.colour];
    }
  
    move(){
      if(!this.isStuck){
        if(this.isNextPosValid()){
          return this.moveInDir();
        }
        else {
          let rotateCount = 0;
          while(rotateCount < 8){
            this.rotate45Clockwise();
            if(this.isNextPosValid()){
              return this.moveInDir();
            }
            rotateCount++;
          }
          this.isStuck = true;
        }
      }
    }
  }