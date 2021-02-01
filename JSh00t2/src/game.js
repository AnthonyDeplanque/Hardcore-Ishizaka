function starsDisplay() { 
    for (let i = 0; i < starDust.length; ++i) {
        starDust[i].draw();
        starDust[i].update();
    }
}
function enemyDisplay() {
    for (let i = 0; i < enemy.length; ++i) {
        enemy[i].draw();
        enemy[i].update();
    }
}
function heroDisplay() {
    if (blink === false) {
        hero.draw();
        hero.update();
    }
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
                    kills++;
                    score += multiplier;
                    scoreForLives += multiplier;
                    multiplier += kills % 10;
                    if (scoreForLives >= 5000) {
                        scoreForLives -= 5000;
                        ++lives;
                    }
                    explosionShow(enemy[i]);
                    enemy[i].x = randomize(50, canvas.width - 50);
                    enemy[i].y = 0;
                    if (enemy[i].xSpeed < 50) {
                        enemy[i].xSpeed++;
                    }
                    if (enemy[i].ySpeed < 3) {
                        enemy[i].ySpeed += 0.2;
                    }
                    bulletFired[j].shot = false;
                }
            }
        }
    }
}
function heroTouched() {
    for (let i = 0; i < enemy.length; ++i) {
        if (isColliding(hero, enemy[i])) {
            lives--;
            multiplier = 1;
            blink = true;
            explosionShow(hero)
            hero.x = -100000;
            hero.y = -100000;
            if (lives > 0) {
                window.setTimeout(function () {
                    blink = false;
                    hero.x = initX;
                    hero.y = initY;
                    for (let j = 0; j < enemy.length; ++j) {
                        enemy[j].x = randomize(50, canvas.width - 50)
                        enemy[j].y = 0;
                        enemy[j].xSpeed = 10;
                        enemy[j].ySpeed = 1;
                    }
                }, 1000);
            }
            break;
        }
    }
}
function scoreShow() {
    context.font = '16px Arial';
    context.fillStyle = '#fff';
    context.fillText('Score = ' + score, canvas.width - 150, 20);
}
function livesShow() {
    context.font = '16px Arial';
    context.fillStyle = '#fff';
    context.fillText('Lives = ' + lives, canvas.width - 150, canvas.height - 20);
}
function explosionDisplay() {
    for (let i = 0; i < explosion.length; ++i) {
        if (explosion[i].exist) {
            explosion[i].draw();
            explosion[i].update();
        }
    }
}
function explosionShow(param) {
    for (let i = 0; i < explosion.length; ++i) {
        if (explosion[i].exist === false) {
            explosion[i].exist = true;
            explosion[i].x = param.x;
            explosion[i].y = param.y;
            break;
        }
    }
}
function timerBegin() {
    window.setTimeout(function () {
        timerForBegin = true;
    }, 2000);
}
