function keyboardDown(e) {
    //key pressed.   
    switch (e.keyCode) {
        case (13): //enter
            key.enter = true;
            break;
        case (37): //left
            key.left = true;
            break;
        case (39): //right
            key.right = true;
            break;
        case (38): //up
            key.up = true;
            break;
        case (40): //down
            key.down = true;
            break;
        case (32):
            key.space = true;
            break;
    }
}

function keyboardUp(e) {
    //key unpressed.  
    switch (e.keyCode) {
        case (13): //enter
            key.enter = false;
            break;
        case (37): //left
            key.left = false;
            break;
        case (39): //right
            key.right = false;
            break;
        case (38): //up
            key.up = false;
            break;
        case (40): //down
            key.down = false;
            break;
        case (32):
            key.space = false;
            break;
    }
}

function isColliding(a, b) {
    //returning if a is colliding with b
    let r = false;
    if ((a.x >= b.x && a.x <= b.x + b.xSize) || (a.x + a.xSize >= b.x && a.x + a.xSize <= b.x + b.xSize)) {
        if ((a.y >= b.y && a.y <= b.y + b.xSize) || (a.y + a.ySize >= b.y && a.y + a.ySize <= b.y + b.ySize)) {
            r = true;
        }
    }
    return r;
}

function randomize(a, b) {
    //returning a random integer between a and b
    return Math.trunc((Math.random() * (b - a)) + a);
}

function clearCanvas() {
    //cleaning the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
}