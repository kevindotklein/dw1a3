import TileMap from "./tilemap.js";
import Player from "./player.js";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const tileSize = 32;

const tileMap = new TileMap(tileSize);
const player = new Player(2,2);

const update = () => {
    tileMap.draw(canvas, ctx, player);
}

setInterval(update, 1000);