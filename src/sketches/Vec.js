export default class Vec {
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