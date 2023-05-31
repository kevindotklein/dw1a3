export default class TileMap{

    constructor(tileSize){
        this.tileSize = tileSize;
        this.wallSprite = this.#sprite('./assets/wall.png');
        this.playerDownSprite = this.#sprite('./assets/playerDown.png');
        this.playerUpSprite = this.#sprite('./assets/playerUp.png');
        this.playerLeftSprite = this.#sprite('./assets/playerLeft.png');
        this.playerRightSprite = this.#sprite('./assets/playerRight.png');
        this.voidSprite = this.#sprite('./assets/void.png');
        this.boxSprite = this.#sprite('./assets/box.png');
    }

    maps = [
        [
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [1,1,0,1,1,1,0,0,1,0,0,0,1,1,1,1,1,1,1,1],
            [1,1,0,1,1,1,0,0,1,0,0,0,1,1,1,1,1,1,1,1],
            [1,1,0,1,1,1,0,1,1,0,0,0,1,1,1,1,1,1,1,1],
            [1,1,0,1,1,1,0,0,1,0,0,0,1,1,0,1,1,1,1,1],
            [1,1,0,1,1,1,0,0,0,0,0,0,1,1,0,1,1,1,1,1],
            [1,1,0,1,1,1,0,0,0,0,0,0,1,1,0,1,1,1,1,1],
            [1,1,0,1,1,1,1,1,1,0,0,1,1,1,0,0,1,1,1,1],
            [1,1,0,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1],
            [1,1,0,1,1,1,1,1,1,0,1,0,1,0,0,0,1,1,1,1],
            [1,1,0,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1],
            [1,1,0,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1],
            [1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        ],


        [
            [1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
            [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
            [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
            [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
            [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
            [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
            [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
            [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
            [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
            [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
            [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
            [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
            [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
            [1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        ],
    ]

    #sprite(path){
        const image = new Image();
        image.src = path;
        return image;
    }

    map = this.maps[0];

    draw(canvas, ctx, player, boxes){
        this.#setCanvasSize(canvas);
        this.#clearCanvas(canvas, ctx);
        this.#drawMap(ctx, player, boxes);
    }

    #setCanvasSize(canvas){
        canvas.height = this.map.length * this.tileSize;
        canvas.width = this.map[0].length * this.tileSize;
    }

    #clearCanvas(canvas, ctx){
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    #drawMap(ctx, player, boxes){
        if(this.map[player.y][player.x] == 0){
            this.map[player.y][player.x] = 2; 
        }
        
        for(let i=0; i<boxes.length; i++){
            this.map[boxes[i].y][boxes[i].x] = 3;
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
                        switch(player.direction){
                            case 0:
                            case 3:
                                image = this.playerDownSprite;
                                break;
                            
                            case 1:
                                image = this.playerUpSprite;
                                break;
                            
                            case 2:
                                image = this.playerRightSprite;
                                break;
                            
                            case 4:
                                image = this.playerLeftSprite;
                                break;

                            default:
                                image = this.playerDownSprite;
                                break;
                        }
                        break;

                    case 3:
                        image = this.boxSprite;
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