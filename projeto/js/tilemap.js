import Player from "./player.js";

export default class TileMap{

    constructor(tileSize){
        this.tileSize = tileSize;
        this.wallSprite = this.#sprite('./assets/wall.png');
        this.playerSprite = this.#sprite('./assets/player.png');
        this.voidSprite = this.#sprite('./assets/void.png');
    }

    #sprite(path){
        const image = new Image();
        image.src = path;
        return image;
    }

    map = [
        [1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    ]

    draw(canvas, ctx, player){
        this.#setCanvasSize(canvas);
        this.#clearCanvas(canvas, ctx);
        this.#drawMap(ctx, player);
    }

    #setCanvasSize(canvas){
        canvas.height = this.map.length * this.tileSize;
        canvas.width = this.map[0].length * this.tileSize;
    }

    #clearCanvas(canvas, ctx){
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    #drawMap(ctx, player){
        if(this.map[player.y][player.x] == 0){
            this.map[player.y][player.x] = 2; 
        }
        for(let i=0; i<this.map.length; i++){
            for(let j=0; j<this.map[i].length; j++){
                const tile = this.map[i][j];

                let image = null;
                switch(tile){
                    case 0:
                        image = this.voidSprite;
                        break;

                    case 1:
                        image = this.wallSprite;
                        break;

                    case 2:
                        image = this.playerSprite;
                        break;

                    default:
                        image = this.voidSprite;
                        break;
                }

                
                ctx.drawImage(image, j * this.tileSize, i * this.tileSize,
                              this.tileSize, this.tileSize);
                

            }
        }
    }

}