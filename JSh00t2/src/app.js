//*****************************************//
//                                         //
//     JavaScript Shooter By SETEEMIO      //
//                                         //
//*****************************************//

"use strict";
let canvas;
let context;
window.onload = init();

let imgGood = new Image();
let imgBad = new Image();
imgGood.src = "img/heros.png";
imgBad.src = "img/enemy.png";

let key = new Keyboard;
let hero = new Ship(300, 400);
let bulletFired = [];
let maxBullet = 4;
let shotToggle = false;
for (let i=0; i<maxBullet;++i){
    bulletFired[i] = new Bullet();
}
let enemy = [];
for (let i = 0; i < 5; ++i) {
    enemy[i] = new EnemyShip(randomize(50, canvas.width - 50), 0);
}
let starDust = [];
for (let i = 0; i < randomize(200, 255); ++i) {
    starDust[i] = new Stars(randomize(1, canvas.width), randomize(1, canvas.height));
}

let lives = 3;
let gameOn = false;

function init() {
    // Get a reference to the canvas
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    window.requestAnimationFrame(gameLoop);
    document.addEventListener("keydown", keyboardDown);
    document.addEventListener("keyup", keyboardUp);
}
function gameLoop(timeStamp) {
    clearCanvas();
    starsDisplay();
    enemyDisplay();
    isShooting();
    heroDisplay();
    enemyShot();
    window.requestAnimationFrame(gameLoop);
}
