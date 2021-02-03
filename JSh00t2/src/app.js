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

let lives = 3;
let score = 0;
let scoreForLives = 0; // score to get an extra life
let multiplier = 1;
let kills = 0;
let killForRun = 0;
let timerForBegin = false; // boolean to set the beginning of the enemy swarm
let gameOverKill = new String();

let key = new Keyboard; //toggle to know what key you are pressing
let hero = new Ship(initX, initY); //the player's spaceShip
const begin1 = new Text("Shooter Game", 40, "white", canvas.width / 3, canvas.height / 2);
const begin2 = new Text("Press Enter to play", 40, "white", canvas.width / 3, (canvas.height / 2) + 40);
const gameover1 = new Text("Game Over", 40, "white", canvas.width / 3, canvas.height / 2);
let gameover2 = new Text("", 40, "white", canvas.width / 3, (canvas.height / 2) + 40);
const gameover3 = new Text("Press enter to retry", 40, "white", canvas.width / 3, (canvas.height / 2) + 80);

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
for (let i = 0; i < maxEnemies * maxEnemies; ++i) {
    explosion[i] = new Fireball();
}
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
    gameOn = toggleKey(key.enter, gameOn);
    if (gameOn) { gameIsOn(); } else {
        beginDisplay();
    }
    window.requestAnimationFrame(gameLoop);
}
function gameIsOn() {
    timerBegin();
    starsDisplay();
    if (timerForBegin) { 
        enemyDisplay(); 
    }
    isShooting();
    heroDisplay();
    enemyShot();
    heroTouched();
    scoreShow();
    livesShow();
//    debugText("killForRun",killForRun,10);
//    debugText("kills",kills,30);
//    debugText("multiplier",multiplier,50);
//    debugText("scoreForLives",scoreForLives,70);
    if (lives == 0) {
        gameoverDisplay();
        if (key.enter) { window.location.reload(); }
    }
    explosionDisplay();
}
