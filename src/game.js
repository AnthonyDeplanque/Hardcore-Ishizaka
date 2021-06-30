
function starsDisplay() {
  for (let i = 0; i < starDust.length; ++i) {
    starDust[i].draw();
    starDust[i].update();
  }
}
function enemyDisplay() {
  for (let i = 0; i < enemy.length; ++i) {
    //  enemy[i].drawHitbox();
    enemy[i].draw();
    enemy[i].update();
  }
}
function heroDisplay() {
  if (blink === false) {
    //  hero.drawHitbox();
    hero.draw();
    hero.update();
  }
}
function shootDisplay(bullet) {
  for (let i = 0; i < bullet.length; ++i) {
    if (bullet[i].shot) {
      bullet[i].draw();
      bullet[i].update();
    } else if (bullet[i] === false) {
      bullet[i].y = canvas.width * 10;
    }
  }
}
function heroIsShooting() {
  shootDisplay(bulletFired);
  if (key.space) {
    if (shotToggle == false) {
      shotToggle = true;
      for (let i = 0; i < bulletFired.length; ++i) {
        if (bulletFired[i].shot === false) {
          bulletFired[i].x = hero.x + hero.xSize / 2 - bulletFired[i].xSize / 2;
          bulletFired[i].y = hero.y;
          bulletFired[i].shot = true;
          bulletFired[i].snd.play();
          break;
        }
      }
      window.setTimeout(function () {
        shotToggle = false;
      }, 150);
    }
  }
}
function scoring() {
  killForRun++;
  score += multiplier;
  scoreForLives += multiplier;
  if (Math.trunc(killForRun / 5) < 1) {
    multiplier = 1;
  } else {
    multiplier = Math.trunc(killForRun / 5) + 1;
  }
  if (scoreForLives >= 2000) {
    scoreForLives = 0;
    ++lives;
  }
}
function enemyShot() {
  for (let i = 0; i < enemy.length; ++i) {
    for (let j = 0; j < bulletFired.length; ++j) {
      if (isColliding(bulletFired[j], enemy[i])) {
        if (bulletFired[j].shot) {
          kills++;
          scoring();
          explosionShow(enemy[i]);
          enemy[i].x = xEnemyCreation.x;
          enemy[i].y = 0;
          enemy[i].pattern = randomize(1, 3);
          if (enemy[i].xSpeed < 30) {
            enemy[i].xSpeed++;
          }
          if (enemy[i].ySpeed < 6) {
            enemy[i].ySpeed += 0.2;
          }
          if (
            xEnemyCreation.xDirection < -20 ||
            xEnemyCreation.xDirection > 20
          ) {
            xEnemyCreation.xDirection *= 1.05;
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
      heroDie();
      if (lives > 0) {
        window.setTimeout(function () {
          blink = false;
          hero.x = initX;
          hero.y = initY;
          for (let j = 0; j < enemy.length; ++j) {
            enemy[j].x = randomize(limit, canvas.width - limit);
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
  context.font = "16px Arial";
  context.fillStyle = "#fff";
  context.fillText("Score = " + score, canvas.width - 150, 20);
}
function livesShow() {
  context.font = "16px Arial";
  context.fillStyle = "#fff";
  context.fillText("Lives = " + lives, canvas.width - 150, canvas.height - 20);
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
      explosion[i].x = randomize(param.x, (param.x + param.xSize));
      explosion[i].y = randomize(param.y, (param.y + param.ySize));
      explosion[i].snd.play();
      break;
    }
  }
}
function timerBegin() {
  window.setTimeout(function () {
    timerForBegin = true;
  }, 2000);
}
function toggleKey(keyPressed, bool) {
  if (keyPressed == true && bool == false) {
    bool = true;
  }
  return bool;
}
function textShow(param) {
  param.draw();
  param.update();
}
function beginDisplay() {
  textShow(begin1);
  textShow(begin2);
}
function gameoverDisplay() {
  textShow(gameover1);
  textShow(gameover2);
  textShow(gameover3);
}
function endGameDisplay() {
  textShow(win1);
  textShow(gameover2);
  textShow(gameover3);
}
function backgroundRadial() {
  //useless
  let x, y;
  x = -50;
  y = -50;
  let radial = context.createRadialGradient(x, y, 50, 200, 150, 775);
  radial.addColorStop(0, "#AAAA88");
  radial.addColorStop(0.25, "black");
  context.beginPath();
  context.fillStyle = radial;
  context.arc(x, y, 335, 0, 2 * Math.PI);
  context.fill();
}
function bossShot() {
  for (let i = 0; i < bulletFired.length; ++i) {
    if (isColliding(bulletFired[i], boss)) {
      if (boss.pattern) {
        if (boss.life > 0) {
          boss.life--;
          explosionShow(bulletFired[i]);
          scoring();
        }
        if (boss.life == 0) {
          kills++;
        }
        bulletFired[i].shot = false;
        bulletFired[i].x = canvas.width * 10;
      }
    }
  }
}
function bossShootCollideHero() {
  for (let i = 0; i < bulletBoss.length; ++i) {
    if (isColliding(bulletBoss[i], hero)) {
      if (boss.life > 0) {
        explosionShow(bulletBoss[i]);
        bulletBoss[i].shot = false;
        bulletBoss[i].x = canvas.width * 10;
        heroDie();
        if (lives > 0) {
          window.setTimeout(function () {
            blink = false;
            hero.x = initX;
            hero.y = initY;
            boss.x = canvas.width / 2 - boss.xSize / 2;
            boss.y = 0 - boss.ySize / 2;
            boss.pattern = false;
            boss.xSpeed = 10;
            boss.ySpeed = 0.5;
            boss.xUpdate = randomize(1, 5);
            boss.yUpdate = 0.5;
            boss.yDirection = 0.5;
            boss.xDirection = 0.5;
            boss.alive = true;
            boss.life = bossLife;
          }, 1000);
        }
      }
    }
  }
}
function bossIsShooting() {
  if (boss.life > 0) {
    shootDisplay(bulletBoss);
    if (bossShotToggle === false) {
      bossShotToggle = true;
      for (let i = 0; i < bulletBoss.length; ++i) {
        if (bulletBoss[i].shot === false) {
          bulletBoss[i].x = boss.x + boss.xSize / 2 - bulletBoss[i].xSize / 2;
          bulletBoss[i].y = boss.y;
          bulletBoss[i].shot = true;
          bulletBoss[i].snd.play();
          break;
        }
      }

      window.setTimeout(function () {
        bossShotToggle = false;
      }, 500);
    }
  }
}
function bossDisplay() {
  if (boss.y < canvas.height + boss.ySize) {
    bossShot();
    bossDie();
    bossShootCollideHero();
    if (boss.pattern) {
      bossIsShooting();
    }
    boss.draw();
    //    boss.drawHitbox(); //permits to show the boss hitbox
    boss.update();
    boss.hpDraw();
    if (isColliding(hero, boss)) {
      if (boss.life > 0) {
        heroDie();
        if (lives > 0) {
          window.setTimeout(function () {
            blink = false;
            hero.x = initX;
            hero.y = initY;
            boss.x = canvas.width / 2 - boss.xSize / 2;
            boss.y = 0 - boss.ySize / 2;
            boss.pattern = false;
            boss.xSpeed = 10;
            boss.ySpeed = 0.5;
            boss.xUpdate = randomize(1, 5);
            boss.yUpdate = 0.5;
            boss.yDirection = 0.5;
            boss.xDirection = 0.5;
            boss.alive = true;
            boss.life = bossLife;
          }, 1000);
        }
      }
    }
  }
}
function bossDie() {
  if (boss.alive === false) {
    win = true;
    const hasExplosionRunning = explosion.filter(e => e.exist === true).length > 0;
//    console.log(hasExplosionRunning);
    if (!hasExplosionRunning) {
      explosion = [];
      Array.from({ length: 3 }).forEach(() => {
        explosion.push(new Fireball());
        explosionShow(boss);
      });
    }
  }
  gameover2.message = "Total Score =" + score;
  gameover2.str = gameover2.message.split();
}
function heroDie() {
  lives--;
  multiplier = 1;
  killForRun = 0;
  blink = true;
  explosionShow(hero);
  hero.x = -100000;
  hero.y = -100000;
  gameover2.message = "Total Score =" + score;
  gameover2.str = gameover2.message.split();
}
function callOfTheBoss() {
  if (kills >= enemyForBoss) {
    bossDisplayToggle = true;
    for (let i = 0; i < enemy.length; ++i) {
      enemy[i].ySpeed *= -1.5;
    }
  }
}
