//***********************************
// JavaScript Shooter By SETEEMIO
//
//
//


"use strict";
let canvas;
let context;
window.onload = init();

let imgGood = new Image();
let imgBad = new Image();
imgGood.src = "img/heros.png";
imgBad.src = "img/enemy.png";

function randomize(a, b) {
    //a is the lower limit, b is the upper limit of the randomization
    //returning an integer
    return Math.trunc((Math.random() * (b - a)) + a);
}

class Keyboard {
    constructor(left, right, up, down, space) {
        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;
        this.space = false;
    }
}
class Ship {
    constructor(x, y, xSize, ySize, img, speed) {
        this.x = x;
        this.y = y;
        this.xSize = 40;
        this.ySize = 40;
        this.img = imgGood;
        this.speed = 4;
    }
    draw() {
        context.drawImage(this.img, this.x, this.y);
    }
    update() {
        if (key.left) { this.x -= this.speed; }
        if (key.right) { this.x += this.speed; }
        if (key.up) { this.y -= this.speed; }
        if (key.down) { this.y += this.speed; }
        if (this.x < 0) { this.x = 0; }
        if (this.x > canvas.width - this.xSize) { this.x = canvas.width - this.xSize; }
        if (this.y < 0) { this.y = 0; }
        if (this.y > canvas.height - this.ySize) { this.y = canvas.height - this.ySize; }
    }
}
class EnemyShip {
    constructor(x, y, xSize, ySize, img, xSpeed, ySpeed, xUpdate, xDirection, yDirection) {
        this.x = x;
        this.y = y;
        this.xSize = 40;
        this.ySize = 40;
        this.img = imgBad;
        this.xSpeed = 0;
        this.ySpeed = 1;
        this.yDirection = randomize(5,15);
        this.xUpdate = randomize(1,5);
        this.xDirection = 0.5;
    }
    draw() {
        context.drawImage(this.img, this.x - this.xSize / 2, this.y - this.ySize / 2);
    }
    update() {
        this.y = this.y + (this.yDirection/5 * this.ySpeed);
        if (this.y > canvas.height+this.ySize) {
            this.y = 0-this.ySize;
            this.x = randomize(50, canvas.width - 50)
        }
        this.x += this.xUpdate;
        this.xUpdate += this.xDirection;
        if (this.xUpdate > 5) {
            this.xUpdate = 5;
            this.xDirection *= -1;
        }
        if (this.xUpdate < -5) {
            this.xUpdate = -5;
            this.xDirection *= -1;
        }
    }
}
class Stars {
    constructor(x, y, size, speed, colorR, colorG, colorB, color) {
        this.x = x;
        this.y = y;
        this.size = randomize(1, 4);
        this.speed = this.size * 2;
        this.colorR = randomize(150, 255);
        this.colorG = randomize(150, 255);
        this.colorB = randomize(150, 255);
        this.color = 'rgba(' + this.colorR + ',' + this.colorG + ',' + this.colorB + ',0.8)';
    }
    draw() {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x + this.size, this.y + this.size, this.size, 0, Math.PI * 2)
        context.fill();
        context.closePath();
    }
    update() {
        this.y += this.speed;
        if (this.y > canvas.height) {
            this.y = 0;
            this.x = randomize(1, canvas.width)
        }
    }
}
class Bullet {
    constructor(x, y, xSize, ySize, speed) {
        this.x = x;
        this.y = y;
        this.xSize = 4;
        this.ySize = 30;
        this.speed = 5;
    }
    draw() {
        context.fillStyle = "red";
        context.fillRect(this.x, this.y, this.sizeX, this.sizeY);
    }
    update() {
        this.y -= this.speed;
    }
}
let key = new Keyboard;
let hero = new Ship(300,400);
let enemyTest = [];
for (let i = 0; i < 5; ++i) {
    enemyTest[i] = new EnemyShip(randomize(50, canvas.width - 50), 0);
}
let starDust = [];
for (let i = 0; i < randomize(200, 255); ++i) {
    starDust[i] = new Stars(randomize(1, canvas.width), randomize(1, canvas.height));
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
    for (let i = 0; i < starDust.length; ++i) {
        starDust[i].draw();
        starDust[i].update();
    }
    for (let i = 0; i < 5; ++i) {
        enemyTest[i].draw();
        enemyTest[i].update();
    }
    hero.draw();
    hero.update();
    window.requestAnimationFrame(gameLoop);
}
function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}
function keyboardDown(e) { //key pressed.  
    console.log(e.keyCode);
    switch (e.keyCode) {
        case (37)://left
            key.left = true;
            break;
        case (39)://right
            key.right = true;
            break;
        case (38)://up
            key.up = true;
            break;
        case (40)://down
            key.down = true;
            break;
        case (32):
            key.space = true;
            break;
    }
}
function keyboardUp(e) { //key unpressed.  
    switch (e.keyCode) {
        case (37)://left
            key.left = false;
            break;
        case (39)://right
            key.right = false;
            break;
        case (38)://up
            key.up = false;
            break;
        case (40)://down
            key.down = false;
            break;
        case (32):
            key.space = false;
            break;
    }
}
function isColliding(a, b) {
    let r = false;
    if ((a.x >= b.x && a.x <= b.x + b.xSize) || (a.x + a.xSize >= b.x && a.x + a.xSize <= b.x + b.xSize)) {
        if ((a.y >= b.y && a.y <= b.y + b.xSize) || (a.y + a.ySize >= b.y && a.y + a.ySize <= b.y + b.ySize)) {
            r = true;
        }
    }
    return r;
}
