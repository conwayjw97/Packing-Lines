const directions = [[-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1]];

export default class Vec {
    constructor(id, x, y, space, colour, dir=null){
      this.id = id;
      this.start = [x, y];
      this.x = x;
      this.y = y;
      this.space = space;
      this.colour = colour;
      this.step = 0;
      if(dir){
        this.dir = dir;
      } else {
        this.randomiseDir();
      }
      this.space[x][y] = [id, this.step];
      this.isStuck = false;
      this.hasReturnedToStart = false;
      this.isFinished = false;
    }

    returnToStart(){
      this.isStuck = false;
      this.hasReturnedToStart = true;
      this.x = this.start[0];
      this.y = this.start[1];
    }

    isDirectionDiagonal(){
      return (this.dir[0]!=0 && this.dir[1]!=0);
    }

    isDiagonalLineAhead(){ 
      const space1 = [this.x + this.dir[0], this.y]
      const space2 = [this.x, this.y + this.dir[1]]
      const spaceToCheck1 = this.space[space1[0]][space1[1]];
      const spaceToCheck2 = this.space[space2[0]][space2[1]];
      const space1IsTaken = spaceToCheck1[0] != 0;
      const space2IsTaken = spaceToCheck2[0] != 0;
      if (space1IsTaken && space2IsTaken){
        const spacesAreSameVectors = spaceToCheck1[0] == spaceToCheck2[0];
        if(spacesAreSameVectors){
          const spacesAreCoveredInSequence = Math.abs(spaceToCheck1[1] - spaceToCheck2[1]) == 1;
          if(spacesAreCoveredInSequence){
            return true;
          }
        }
      }
      return false;
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
      return this.space[newX][newY][0] == 0;
    }
  
    rotate45Clockwise(){ 
      this.dir = directions[(directions.indexOf(this.dir) + 1) % directions.length];
    }
  
    randomiseDir(){
      this.dir = directions[Math.floor(Math.random() * directions.length)];
    }
  
    moveInDir(){
      this.step++;
      const oldX = this.x;
      const oldY = this.y;
      this.x = this.x + this.dir[0];
      this.y = this.y + this.dir[1];
      this.space[this.x][this.y] = [this.id, this.step];
      return [oldX, oldY, this.x, this.y, this.colour];
    }
  
    move(){
      if(this.isStuck && !this.hasReturnedToStart){
        this.returnToStart();
      }
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
      if(this.isStuck && this.hasReturnedToStart){
        this.isFinished = true;
      }
    }
  }