import TileMap from "./tilemap.js";
import Player from "./player.js";
import Box from "./box.js";
import Goal from "./goal.js";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const tileSize = 32;

const levelDisplay = document.getElementById('level');

const tileMap = new TileMap(tileSize);
const player = new Player(8, 13);

let acceptMove = true;

const allowedTiles = [0, 4];

var currLevel = 1;

const boxes = [];

const goals = [];


const setLevel = (level=1, player, boxes, goals) => {
    switch(level){

        default:
        case 1:
            tileMap.map = tileMap.maps[0];
            player.x = 8;
            player.y = 13;
            boxes.push(new Box(5, 6));
            boxes.push(new Box(14, 6));
            boxes.push(new Box(18, 5));
            boxes.push(new Box(17, 9));
            goals.push(new Goal(1, 1));
            goals.push(new Goal(4, 1));
            goals.push(new Goal(15, 1));
            goals.push(new Goal(18, 1));
            break;
        
        case 2:
            tileMap.map = tileMap.maps[1];
            player.x = 8;
            player.y = 13;
            boxes.push(new Box(3, 9));
            boxes.push(new Box(3, 10));
            boxes.push(new Box(8, 6));
            boxes.push(new Box(10, 6));
            boxes.push(new Box(15, 6));
            boxes.push(new Box(16, 4));
            goals.push(new Goal(2, 1));
            goals.push(new Goal(3, 1));
            goals.push(new Goal(16, 1));
            goals.push(new Goal(17, 1));
            goals.push(new Goal(9, 7));
            goals.push(new Goal(10, 7));
            break;

        case 3:
            tileMap.map = tileMap.maps[2];
            player.x = 10;
            player.y = 7;
            boxes.push(new Box(9,7));
            boxes.push(new Box(10,8));
            boxes.push(new Box(9,13));
            boxes.push(new Box(1,8));
            goals.push(new Goal(10,13));
            goals.push(new Goal(1,7));
            goals.push(new Goal(18,9));
            goals.push(new Goal(1,2));
            break;
        
        case 4:
            tileMap.map = tileMap.maps[3];
            break;
    }
}

const resetAllObjects = () => {
    tileMap.map[player.y][player.x] = 0;
    for(let i=0; i<boxes.length; i++){
        tileMap.map[boxes[i].y][boxes[i].x] = 0;
    }
    for(let i=0; i<goals.length; i++){
        tileMap.map[goals[i].y][goals[i].x] = 0;
    }
    boxes.splice(0, boxes.length);
    goals.splice(0, goals.length);
}

// const b1 = document.querySelector('#b1');
// const b2 = document.querySelector('#b2');
// const b3 = document.querySelector('#b3');
// const b4 = document.querySelector('#b4');

setLevel(1, player, boxes, goals);

// b1.addEventListener('click', (e) => {
//     currLevel = 1;
//     document.activeElement.blur();
//     resetAllObjects();
//     setLevel(1, player, boxes, goals);
// });

// b2.addEventListener('click', (e) => {
//     currLevel = 2;
//     document.activeElement.blur();
//     resetAllObjects();
//     setLevel(2, player, boxes, goals);
// });

// b3.addEventListener('click', (e) => {
//     currLevel = 3;
//     document.activeElement.blur();
//     resetAllObjects();
//     setLevel(3, player, boxes, goals);
// });

// b4.addEventListener('click', (e) => {
//     currLevel = 4;
//     document.activeElement.blur();
//     resetAllObjects();
//     setLevel(4, player, boxes, goals);
// })

const refreshLevelDisplay = () => {
    if(currLevel == 4){
        levelDisplay.innerHTML = `CONGRATS`;
        levelDisplay.style.color = "#2eff2e";
        return;
    }
    levelDisplay.style.color = "#fff";
    levelDisplay.innerHTML = `LEVEL ${currLevel}`;
}

const checkComplete = () => {
    if(goals.length >= 1){
        let count = 0;
        for(let i=0; i<goals.length; i++){
            if(goals[i].ok)
                count++;
        }

        if(count === goals.length && currLevel < 4){
            currLevel++;
            document.activeElement.blur();
            resetAllObjects();
            setLevel(currLevel, player, boxes, goals);
        }
    }
    
}

const update = () => {

    refreshLevelDisplay();
    checkComplete();

    for(let i=0; i<goals.length; i++){
        for(let j=0; j<boxes.length; j++){

            if(goals[i].x === boxes[j].x && goals[i].y === boxes[j].y && boxes[j].direction === 0){
                goals[i].ok = true;
            }

        }
    }

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

    tileMap.draw(canvas, ctx, player, boxes, goals);

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