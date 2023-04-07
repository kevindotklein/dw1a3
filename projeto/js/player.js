export default class Player{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.direction = 0;
    }

    moveUp(){
        this.y--;    
    }

    moveDown(){
        this.y++;
    }

    moveLeft(){
        this.x--;
    }

    moveRight(){
        this.x++;
    }

}