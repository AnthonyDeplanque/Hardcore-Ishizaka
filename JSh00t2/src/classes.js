// each classes contain a function called draw and update
// draw show the object on the canvas
// update is updating each parameters of the object
// We have to call each function in our gameLoop

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
        this.xSpeed = 10;
        this.ySpeed = 1;
        this.yDirection = randomize(5, 15);
        this.xUpdate = randomize(1, 5);
        this.xDirection = 0.5;
    }
    draw() {
        context.drawImage(this.img, this.x, this.y);
    }
    update() {
        this.y = this.y + (this.yDirection / 5 * this.ySpeed);
        if (this.y > canvas.height + this.ySize) {
            this.y = 0 - this.ySize;
            this.x = randomize(50, canvas.width - 50)
        }
        this.x += this.xUpdate *this.xSpeed/10;
        this.xUpdate += this.xDirection ;
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
        context.arc(this.x + this.size, this.y + this.size, this.size / 2, 0, Math.PI * 2)
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
    constructor(x, y, xSize, ySize, speed, shot) {
        this.x = x;
        this.y = y;
        this.xSize = 4;
        this.ySize = 30;
        this.speed = 10;
        this.shot = false;
    }
    draw() {
        context.fillStyle = "red";
        context.fillRect(this.x, this.y, this.xSize, this.ySize);
    }
    update() {
        if (this.shot) { this.y -= this.speed; }
        if (this.y < 0) { this.shot = false; }
    }
}
