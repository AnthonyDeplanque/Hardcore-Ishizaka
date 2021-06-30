
function keyboardDown(e) {
  //key pressed.
  switch (e.keyCode) {
    case 13: //enter
      key.enter = true;
      break;
    case 37: //left
      key.left = true;
      break;
    case 39: //right
      key.right = true;
      break;
    case 38: //up
      key.up = true;
      break;
    case 40: //down
      key.down = true;
      break;
    case 32: //space
      key.space = true;
      break;
  }
}
function keyboardUp(e) {
  //key unpressed.
  switch (e.keyCode) {
    case 13: //enter
      key.enter = false;
      break;
    case 37: //left
      key.left = false;
      break;
    case 39: //right
      key.right = false;
      break;
    case 38: //up
      key.up = false;
      break;
    case 40: //down
      key.down = false;
      break;
    case 32: //space
      key.space = false;
      break;
  }
}
function isColliding(a, b) {
  //returning if a is colliding with b
  let r = false;
  if (
    (a.x >= b.x && a.x <= b.x + b.xSizeHitbox) ||
    (a.x + a.xSizeHitbox >= b.x && a.x + a.xSizeHitbox <= b.x + b.xSizeHitbox)
  ) {
    if (
      (a.y >= b.y && a.y <= b.y + b.ySizeHitbox) ||
      (a.y + a.ySizeHitbox >= b.y && a.y + a.ySizeHitbox <= b.y + b.ySizeHitbox)
    ) {
      r = true;
    }
  }
  return r;
}
let randomize = (min, max) =>  Math.trunc(Math.random() * (max + 1 - min) + min);

function clearCanvas() {
  //cleaning the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);
}
function debugText(char, variable, y) {
  context.font = "12px Arial";
  context.fillStyle = "#fff";
  context.fillText(char + " = " + variable, 25, y);
}
function Sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function () {
    this.sound.play();
  };
  this.stop = function () {
    this.sound.pause();
  };
}
function patternSinX(param, num1, num2) {
  //sinusoidal movement for enemies
  if (param.xUpdate > num1) {
    param.xUpdate = num1;
    param.xDirection *= -1;
  }
  if (param.xUpdate < num2) {
    param.xUpdate = num2;
    param.xDirection *= -1;
  }
}
function patternSinY(param, num1, num2) {
  //sinusoidal movement for enemies
  if (param.yUpdate > num1) {
    param.yUpdate = num1;
    param.yDirection *= -1;
  }
  if (param.yUpdate < num2) {
    param.yUpdate = num2;
    param.yDirection *= -1;
  }
}
function handleStart(e) {
  //start the touch
  e.preventDefault();
}
function handleEnd(e) {
  //end the touch
  e.preventDefault();
}
function handleMove(e) {
  //touch and move
  e.preventDefault();
}
