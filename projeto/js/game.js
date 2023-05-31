import TileMap from "./tilemap.js";
import Player from "./player.js";
import Box from "./box.js";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const tileSize = 32;

const tileMap = new TileMap(tileSize);
const player = new Player(2,2);

let acceptMove = true;

const allowedTiles = [0];

const boxes = [
    new Box(10, 2),
];

//test

const b1 = document.querySelector('#b1');
const b2 = document.querySelector('#b2');

b1.addEventListener('click', (e) => {

    tileMap.map[player.y][player.x] = 0;
    player.x = 2;
    player.y = 2;
    tileMap.map = tileMap.maps[0];
});

b2.addEventListener('click', (e) => {
    tileMap.map[player.y][player.x] = 0;
    player.x = 5;
    player.y = 5;
    tileMap.map = tileMap.maps[1];
});

//

const update = () => {

    for(let i=0; i<boxes.length; i++){
        switch(boxes[i].direction){
            case 0:
                break;

            case 1:
                if(boxes[i].y > 0 && allowedTiles.includes(tileMap.map[boxes[i].y-1][boxes[i].x])){
                    tileMap.map[boxes[i].y][boxes[i].x] = 0;
                    boxes[i].moveUp();
                }else{
                    boxes[i].direction = 0;
                }
                break;

            case 2:
                if(boxes[i].x < tileMap.map[0].length && allowedTiles.includes(tileMap.map[boxes[i].y][boxes[i].x+1])){
                    tileMap.map[boxes[i].y][boxes[i].x] = 0;
                    boxes[i].moveRight();
                }else{
                    boxes[i].direction = 0;
                }
                break;

            case 3:
                if(boxes[i].y+1 < tileMap.map.length && allowedTiles.includes(tileMap.map[boxes[i].y+1][boxes[i].x])){
                    tileMap.map[boxes[i].y][boxes[i].x] = 0;
                    boxes[i].moveDown();
                }else{
                    boxes[i].direction = 0;
                }
                break;

            case 4:
                if(boxes[i].x > 0 && allowedTiles.includes(tileMap.map[boxes[i].y][boxes[i].x-1])){
                    tileMap.map[boxes[i].y][boxes[i].x] = 0;
                    boxes[i].moveLeft();
                }else{
                    boxes[i].direction = 0;
                }
                break;

            default:
                break;
        }
    }

    tileMap.draw(canvas, ctx, player, boxes);

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

                case ' ':
                    for(let i=0; i<boxes.length; i++){
                        if(boxes[i].x-1 >= 0 && tileMap.map[boxes[i].y][boxes[i].x-1] === 2){
                            boxes[i].direction = 2;
                        }else if(boxes[i].x+1 < tileMap.map[0].length && tileMap.map[boxes[i].y][boxes[i].x+1] === 2){
                            boxes[i].direction = 4;
                        }else if(boxes[i].y+1 < tileMap.map.length && tileMap.map[boxes[i].y+1][boxes[i].x] === 2){
                            boxes[i].direction = 1;
                        }else if(boxes[i].y-1 >= 0 && tileMap.map[boxes[i].y-1][boxes[i].x] === 2){
                            boxes[i].direction = 3;
                        }
                    }
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