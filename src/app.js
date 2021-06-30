//*****************************************//
//                                         //
//     JavaScript Shooter By SETEEMIO      //
//                                         //
//*****************************************//

// latest version 03.03.2021
"use strict";
let canvas;
let context;
let stamp = 0;
let limit = 75;
window.onload = init();
const imgGood = new Image();
const imgBad = new Image();
const imgBoss = new Image();
imgGood.src = "img/Ship_hero.png";
imgBad.src = "img/Ship_enemy.png";
imgBoss.src = "img/Ship_boss.png";

let xEnemyCreation = new Position();
let bossLife = 90;
let enemyForBoss = 250;
const initX = canvas.width / 2; // Initial position of the hero's ship (x)
const initY = (canvas.height / 4) * 3; // Initial position of the hero's ship (y)
let maxBullet = 3;
let maxEnemies = 8;
let lives = 3;
let score = 0;
let scoreForLives = 0; // score to get an extra life
let multiplier = 1;
let kills = 0;
let killForRun = 0;

let timerForBegin = false; // boolean to set the beginning of the enemy swarm
let shotToggle = false; //toggle to know if the player is firing or not
let bossShotToggle = false;
let bossDisplayToggle = false;
let gameOn = false; //toggle to know if the game is on or not
let blink = false; //toggle to know if the hero is colliding with an enemy or not
let win = false;

let key = new Keyboard(); //toggle to know what key you are pressing
let hero = new Ship(initX, initY); //the player's spaceShip
const begin1 = new Text(
	"Destroy Ishizaka",
	40,
	"white",
	canvas.width / 4 + 35,
	canvas.height / 2 - 40
);
const begin2 = new Text(
	"Press Enter to play",
	40,
	"white",
	canvas.width / 4 + 30,
	canvas.height / 2 + 40
);
const gameover1 = new Text(
	"You died. Game Over",
	40,
	"white",
	canvas.width / 4,
	canvas.height / 2
);
let gameover2 = new Text(
	"",
	40,
	"white",
	canvas.width / 3,
	canvas.height / 2 + 40
);
const gameover3 = new Text(
	"Press enter to retry",
	40,
	"white",
	canvas.width / 4,
	canvas.height / 2 + 80
);
const win1 = new Text(
	"You defeated the evil Ishizaka",
	40,
	"white",
	canvas.width / 5,
	canvas.height / 2
);

let bulletFired = []; //array for the bullets fired
for (let i = 0; i < maxBullet; ++i) {
	bulletFired[i] = new Bullet();
}
let bulletBoss = [];
for (let i = 0; i < maxBullet * 2; ++i) {
	bulletBoss[i] = new Bullet();
	bulletBoss[i].color = "green";
	bulletBoss[i].speed *= -0.5;
}
let boss = new BossShip(245, 149, imgBoss, bossLife);
let enemy = []; //array for the enemies
for (let i = 0; i < maxEnemies; ++i) {
	enemy[i] = new EnemyShip(
		randomize(limit, canvas.width - limit),
		0,
		29,
		30,
		imgBad
	);
}
let starDust = []; //array for the stars in the background
for (let i = 0; i < randomize(200, 255); ++i) {
	starDust[i] = new Stars(
		randomize(1, canvas.width),
		randomize(1, canvas.height)
	);
}
let explosion = []; //array for the explosions when an enemy is destroyed
for (let i = 0; i < maxEnemies * maxEnemies; ++i) {
	explosion[i] = new Fireball();
}
function init() {

  // Get a reference to the canvas
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");
  window.requestAnimationFrame(gameLoop);
  document.addEventListener("keydown", keyboardDown);
  document.addEventListener("keyup", keyboardUp);
//  canvas.addEventListener("touchstart", handleStart)
//  canvas.addEventListener("touchend", handleEnd)
//  canvas.addEventListener("touchmove", handleMove)
}
function gameLoop(timeStamp) {
//  ++stamp;
  clearCanvas();
  gameOn = toggleKey(key.enter, gameOn);
  if (gameOn) {
    gameIsOn();
  } else {
    beginDisplay();
  }
  window.requestAnimationFrame(gameLoop);
}
function gameIsOn() {
  callOfTheBoss();
  starsDisplay();
  scoreShow();
  livesShow();
  xEnemyCreation.update();
  heroIsShooting();
  heroDisplay();
  heroTouched();
  if (bossDisplayToggle) {
    bossDisplay();
    if (win) {
      endGameDisplay();
      if (key.enter) {
        window.location.reload();
      }
    }
  } else {
    timerBegin();
    enemyShot();
  }
  if (timerForBegin) {
    enemyDisplay();
  }
  explosionDisplay();
  if (lives == 0) {
    gameoverDisplay();
    if (key.enter) {
      window.location.reload();
    }
  }

}
