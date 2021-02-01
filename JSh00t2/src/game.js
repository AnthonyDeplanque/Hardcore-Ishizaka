function starsDisplay() {
    for (let i = 0; i < starDust.length; ++i) {
        starDust[i].draw();
        starDust[i].update();
    }
}
function enemyDisplay() {
    for (let i = 0; i < 5; ++i) {
        enemy[i].draw();
        enemy[i].update();
    }
}

function heroDisplay() {
    hero.draw();
    hero.update();
}
function shootDisplay() {
    for (let i = 0; i < bulletFired.length; ++i) {
        if (bulletFired[i].shot) {
            bulletFired[i].draw();
            bulletFired[i].update();
        }
    }
}
function isShooting() {
    shootDisplay();
    if (key.space) {
        if (shotToggle == false) {
            shotToggle = true;
            console.log('shot!');
            for (let i = 0; i < bulletFired.length; ++i) {
                if (bulletFired[i].shot === false) {
                    bulletFired[i].x = (hero.x + (hero.xSize / 2) - (bulletFired[i].xSize / 2));
                    bulletFired[i].y = hero.y;
                    bulletFired[i].shot = true;
                    break;
                }
            }
            window.setTimeout(function () {
                shotToggle = false;
            }, 200);
        }
    }
}
function enemyShot() {
    for (let i = 0; i < enemy.length; ++i) {
        for (let j = 0; j < bulletFired.length; ++j) {
            if (isColliding(bulletFired[j], enemy[i])) {
                if (bulletFired[j].shot) {
                    enemy[i].x = randomize(50, canvas.width - 50);
                    enemy[i].y = 0;
                    if (enemy[i].xSpeed < 50) {
                        enemy[i].xSpeed++;
                    }
                    if (enemy[i].ySpeed < 5) {
                        enemy[i].ySpeed++;
                    }
                    bulletFired[j].shot = false;
                }
            }
        }
    }
}
