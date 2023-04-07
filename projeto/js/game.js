import TileMap from "./tilemap.js";
import Player from "./player.js";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const tileSize = 32;

const tileMap = new TileMap(tileSize);
const player = new Player(2,10);

let acceptMove = true;

const update = () => {
    tileMap.draw(canvas, ctx, player);
    window.addEventListener('keydown', (e) => {
        
        if(acceptMove == true){
            switch(e.key){
                
                case 'w':
                case 'ArrowUp':
                    tileMap.map[player.y][player.x] = 0;
                    player.moveUp();
                    acceptMove = false;
                    break;

                case 's':
                case 'ArrowDown':
                    tileMap.map[player.y][player.x] = 0;
                    player.moveDown();
                    acceptMove = false;
                    break;

                case 'a':
                case 'ArrowLeft':
                    tileMap.map[player.y][player.x] = 0;
                    player.moveLeft();
                    acceptMove = false;
                    break;

                case 'd':
                case 'ArrowRight':
                    tileMap.map[player.y][player.x] = 0;
                    player.moveRight();
                    acceptMove = false;
                    break;

                default:
                    break;
            }
        }
    })

    window.addEventListener('keyup', (e) => {
        switch(e.key){
            default:
                acceptMove = true;
                break;
        }
    })
}

setInterval(update, 1000/15);