import TileMap from "./tilemap.js";
import Player from "./player.js";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const tileSize = 32;

const tileMap = new TileMap(tileSize);
const player = new Player(2,10);

let acceptMove = true;

let allowedTiles = [0];

const update = () => {
    tileMap.draw(canvas, ctx, player);

    window.addEventListener('keydown', (e) => {
        
        if(acceptMove == true){
            switch(e.key){
                
                case 'w':
                case 'ArrowUp':
                    if(player.y-1<0) break;
                    if(allowedTiles.includes(tileMap.map[player.y-1][player.x]) && player.y >= 0){
                        tileMap.map[player.y][player.x] = 0;
                        player.moveUp();
                    }
                    acceptMove = false;
                    player.direction = 1;
                    break;
                    
                case 's':
                case 'ArrowDown':
                    if(player.y+1>=tileMap.map.length) break;
                    if(allowedTiles.includes(tileMap.map[player.y+1][player.x]) && player.y < tileMap.map.length){
                        tileMap.map[player.y][player.x] = 0;
                        player.moveDown();
                    }
                    acceptMove = false;
                    player.direction = 3;
                    break;

                case 'a':
                case 'ArrowLeft':
                    if(allowedTiles.includes(tileMap.map[player.y][player.x-1]) && player.x >= 0){
                        tileMap.map[player.y][player.x] = 0;
                        player.moveLeft();
                    }
                    acceptMove = false;
                    player.direction = 4;
                    break;

                case 'd':
                case 'ArrowRight':
                    if(allowedTiles.includes(tileMap.map[player.y][player.x+1]) && player.x < tileMap.map[0].length){
                        tileMap.map[player.y][player.x] = 0;
                        player.moveRight();
                    }
                    acceptMove = false;
                    player.direction = 2;
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