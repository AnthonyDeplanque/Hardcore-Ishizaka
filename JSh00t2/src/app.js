//*****************************************//
//                                         //
//     JavaScript Shooter By SETEEMIO      //
//                                         //
//*****************************************//

"use strict";
let canvas;
let context;
window.onload = init();

const imgGood = new Image();
const imgBad = new Image();
imgGood.src = "img/heros.png";
imgBad.src = "img/enemy.png";

//initial position of the hero's ship
const initX = canvas.width / 2;
const initY = (canvas.height / 4) * 3;

let maxBullet = 4;
let maxEnemies = 5;
let shotToggle = false; //toggle to know if the player is firing or not

let gameOn = false; //toggle to know if the game is on or not
let blink = false; //toggle to know if the hero is colliding with an enemy or not

let key = new Keyboard; //toggle to know what key you are pressing
let hero = new Ship(initX, initY); //the player's spaceShip

let bulletFired = []; //array for the bullets fired
for (let i = 0; i < maxBullet; ++i) {
    bulletFired[i] = new Bullet();
}

let enemy = []; //array for the enemies
for (let i = 0; i < maxEnemies; ++i) {
    enemy[i] = new EnemyShip(randomize(50, canvas.width - 50), 0);
}

let starDust = []; //array for the stars in the background
for (let i = 0; i < randomize(200, 255); ++i) {
    starDust[i] = new Stars(randomize(1, canvas.width), randomize(1, canvas.height));
}
let explosion = []; //array for the explosions when an enemy is destroyed
for (let i = 0; i < maxEnemies * 2; ++i) {
    explosion[i] = new Fireball();
}

let lives = 3;
let score = 0;
let scoreForLives; // score to get an extra life
let multiplier = 1;
let kills = 0;
let timerForBegin = false; // boolean to set the beginning of the enemy swarm

function init() {
    // Get a reference to the canvas
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    window.requestAnimationFrame(gameLoop);
    document.addEventListener("keydown", keyboardDown);
    document.addEventListener("keyup", keyboardUp);
}
function gameLoop(timeStamp) {
    timerBegin();
    clearCanvas();
    starsDisplay();
    if (timerForBegin) { enemyDisplay(); }
    isShooting();
    heroDisplay();
    enemyShot();
    heroTouched();
    scoreShow();
    livesShow();
    explosionShow();
    window.requestAnimationFrame(gameLoop);
}
