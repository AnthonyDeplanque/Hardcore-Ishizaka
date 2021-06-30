
// each visual object classes contain functions called draw and update
// draw show the object on the canvas
// update is updating each parameters of the object
// We have to call each functions in our gameLoop functionS
// latest update : hitboxes
class Position {
  constructor(x, xDirection) {
    this.x = limit;
    this.xDirection = 1;
  }
  draw() {
    context.fillStyle = "red";
    context.fillRect(this.x, limit, 3, 3);
  }
  update() {
    this.x += this.xDirection;
    if (this.x < limit) {
      this.x = limit;
      this.xDirection *= -1;
    }
    if (this.x > canvas.width - limit) {
      this.x = canvas.width - limit;
      this.xDirection *= -1;
    }
  }
}
class Keyboard {
  constructor(left, right, up, down, space, enter) {
    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;
    this.space = false;
    this.enter = false;
  }
}
class Ship {
  constructor(x, y, xSize, ySize, img, speed) {
    this.x = x;
    this.y = y;
    this.xSize = 31;
    this.ySize = 31;
    this.xSizeHitbox = this.xSize;
    this.ySizeHitbox = this.ySize;
    this.img = imgGood;
    this.speed = 4;
  }
  draw() {
    context.drawImage(this.img, this.x, this.y);
  }
  drawHitbox() {
    context.fillStyle = "rgba(0,255,0,0.5)";
    context.fillRect(this.x, this.y, this.xSizeHitbox, this.ySizeHitbox);
  }
  update() {
    if (key.left) {
      this.x -= this.speed;
    }
    if (key.right) {
      this.x += this.speed;
    }
    if (key.up) {
      this.y -= this.speed;
    }
    if (key.down) {
      this.y += this.speed;
    }
    if (this.x < 0) {
      this.x = 0;
    }
    if (this.x > canvas.width - this.xSize) {
      this.x = canvas.width - this.xSize;
    }
    if (this.y < 0) {
      this.y = 0;
    }
    if (this.y > canvas.height - this.ySize) {
      this.y = canvas.height - this.ySize;
    }
  }
}
class EnemyShip {
  constructor(
    x,
    y,
    xSize,
    ySize,
    xSizeHitbox,
    ySizeHitbox,
    img,
    xSpeed,
    ySpeed,
    xUpdate,
    yUpdate,
    xDirection,
    yDirection,
    pattern
  ) {
    this.x = x;
    this.y = y;
    this.xSize = xSize;
    this.ySize = ySize;
    this.xSizeHitbox = xSize;
    this.ySizeHitbox = ySize;
    this.img = imgBad;
    this.xSpeed = 10;
    this.ySpeed = 1;
    this.xUpdate = randomize(1, 5);
    this.yUpdate = 0.5;
    this.yDirection = 0.5;
    this.xDirection = 0.5;
    this.pattern = randomize(1, 3);
  }
  draw() {
    context.drawImage(this.img, this.x, this.y);
  }
  drawHitbox() {
    context.fillStyle = "rgba(255,0,0,0.5)";
    context.fillRect(this.x, this.y, this.xSizeHitbox, this.ySizeHitbox);
  }
  update() {
    if (this.y > canvas.height + this.ySize) {
      if (bossDisplayToggle === false) {
        this.y = 0 - this.ySize;
        this.x = xEnemyCreation.x;
      }
    }
    this.y = this.y + (this.yUpdate / 5) * this.ySpeed;
    this.x += (this.xUpdate * this.xSpeed) / 10;
    this.yUpdate += this.yDirection;
    this.xUpdate += this.xDirection;
    if (this.pattern == 1) {
      patternSinX(this, 5, -5);
      patternSinY(this, 5, 2);
    }
    if (this.pattern == 2) {
      this.ySpeed = 2;
      patternSinX(this, 1, -1);
      patternSinY(this, 10, -1);
    }
    if (this.pattern == 3) {
      patternSinX(this, 5, -1);
      patternSinY(this, 3, -1);
      this.x += (this.xUpdate * this.xSpeed) / 15;
    }
    if (this.x < 0 || this.x > canvas.width - this.xSize) {
      this.xSpeed *= -1;
    }
  }
}
class BossShip {
  constructor(
    xSize,
    ySize,
    xSizeHitbox,
    ySizeHitbox,
    img,
    life,
    x,
    y,
    xSpeed,
    ySpeed,
    xUpdate,
    yUpdate,
    xDirection,
    yDirection,
    pattern,
    alive
  ) {
    this.xSize = xSize;
    this.ySize = ySize;
    this.xSizeHitbox = xSize;
    this.ySizeHitbox = ySize - 25;
    this.img = imgBoss;
    this.life = bossLife;
    this.x = canvas.width / 2 - this.xSize / 2;
    this.y = 0 - this.ySize / 2;
    this.xSpeed = 10;
    this.ySpeed = 0.5;
    this.xUpdate = randomize(1, 5);
    this.yUpdate = 0.5;
    this.yDirection = 0.5;
    this.xDirection = 0.5;
    this.pattern = false;
    this.alive = true;
  }
  draw() {
    context.drawImage(this.img, this.x, this.y);
  }
  drawHitbox() {
    context.fillStyle = "rgba(255,0,0,0.5)";
    context.fillRect(this.x, this.y, this.xSizeHitbox, this.ySizeHitbox);
  }
  update() {
    if (this.life > 0) {
      if (this.alive) {
        if (this.y > limit) {
          this.pattern = true;
        }
        if (this.pattern === false) {
          this.y += this.ySpeed;
        } else if (this.pattern) {
          this.y = this.y + (this.yUpdate / 5) * this.ySpeed;
          this.x += (this.xUpdate * this.xSpeed) / 10;
          this.yUpdate += this.yDirection;
          this.xUpdate += this.xDirection;
          this.ySpeed = 2;
          patternSinX(this, 15, -4);
          patternSinY(this, 15, -15);
          if (this.x < 0 || this.x > canvas.width - this.xSize) {
            this.xSpeed *= -1;
          }
          if (this.y < 0 || this.y > canvas.height - this.ySize) {
            this.ySpeed *= -1;
          }
        }
      }
    } else {
      this.alive = false;
    }
    if (this.alive === false) {
      this.pattern = false;
      this.yUpdate = 0.5;
      this.yDirection = 0.5;
      this.ySpeed = 1;
      this.y += this.ySpeed;
    }
  }
  hpDraw() {
    let hpSize = bossLife;
    context.fillStyle = "white";
    context.fillRect(
      canvas.width / 6 - 1,
      canvas.height / 9 - 1,
      (canvas.width / 6) * 4 + 2,
      canvas.height / 40 + 2
    );
    context.fillStyle = "red";
    context.fillRect(
      canvas.width / 6,
      canvas.height / 9,
      (canvas.width / 6) * 4,
      canvas.height / 40
    );
    if (this.life >= 0) {
      context.fillStyle = "green";
      context.fillRect(
        canvas.width / 6,
        canvas.height / 9,
        ((canvas.width / 6) * 4 * this.life) / hpSize,
        canvas.height / 40
      );
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
    this.color =
      "rgba(" + this.colorR + "," + this.colorG + "," + this.colorB + ",0.8)";
  }
  draw() {
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(
      this.x + this.size,
      this.y + this.size,
      this.size / 2,
      0,
      Math.PI * 2
    );
    context.fill();
    context.closePath();
  }
  update() {
    this.y += this.speed;
    if (this.y > canvas.height) {
      this.y = 0;
      this.x = randomize(1, canvas.width);
    }
  }
}
class Bullet {
  constructor(x, y, xSize, ySize, speed, shot, snd, color) {
    this.x = x;
    this.y = y;
    this.xSize = 4;
    this.ySize = 30;
    this.xSizeHitbox = this.xSize;
    this.ySizeHitbox = this.ySize;
    this.speed = 15;
    this.shot = false;
    this.snd = new Sound("snd/laser.wav");
    this.color = "red";
  }
  draw() {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.xSize, this.ySize);
  }
  update() {
    if (this.shot) {
      this.y -= this.speed;
    }
    if (this.y < 0 || this.y > canvas.width) {
      this.shot = false;
    }
  }
}
class Fireball {
  constructor(
    x,
    y,
    size,
    maxSize,
    direction,
    exist,
    colorR,
    colorG,
    colorB,
    color,
    snd
  ) {
    this.x = x;
    this.y = y;
    this.size = 1;
    this.maxSize = 40;
    this.direction = 2;
    this.exist = false;
    this.colorR = randomize(200, 255);
    this.colorG = randomize(150, 255);
    this.colorB = 0;
    this.color =
      "rgba(" + this.colorR + "," + this.colorG + "," + this.colorB + ",0.8)";
    this.snd = new Sound("snd/boom.wav");
  }
  draw() {
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    context.fill();
    context.closePath();
  }
  update() {
    this.colorR = randomize(200, 255);
    this.colorG = randomize(150, 255);
    this.color =
      "rgba(" + this.colorR + "," + this.colorG + "," + this.colorB + ",0.8)";
    this.size += this.direction;
    this.y += 0.1;
    if (this.size >= this.maxSize) {
      this.direction *= -1;
    }
    if (this.size < 0) {
      this.exist = false;
      this.x = 0;
      this.y = 0;
      this.direction = 2;
      this.size = 1;
    }
  }
}
class Text {
  constructor(message, size, color, x, y, str, iterator, textOutput) {
    this.message = message;
    this.size = size;
    this.color = color;
    this.x = x;
    this.y = y;
    this.str = message.split("");
    this.iterator = 0;
    this.textOutput = "";
  }
  draw() {
    context.font = this.size + "px Arial";
    context.fillStyle = this.color;
    context.fillText(this.textOutput, this.x, this.y);
  }
  update() {
    if (this.iterator < this.str.length) {
      this.textOutput += this.str[this.iterator];
      ++this.iterator;
    }
  }
}

