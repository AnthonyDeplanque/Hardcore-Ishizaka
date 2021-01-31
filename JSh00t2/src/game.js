function starsDisplay() {
    for (let i = 0; i < starDust.length; ++i) {
        starDust[i].draw();
        starDust[i].update();
    }
}
function enemyDisplay() {
    for (let i = 0; i < 5; ++i) {
        enemyTest[i].draw();
        enemyTest[i].update();
    }
}
function shootDisplay() {
    for (let i = 0; i < bulletFired.length; ++i) {
        if (bulletFired[i].shot === true) {
            bulletFired[i].draw();
            bulletFired[i].update();
        }
    }
}
function heroDisplay() {
    hero.draw();
    hero.update();
}
