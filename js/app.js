// eslint-disable-next-line no-undef
console.log('Up and running\n\n\n\n\n\n\n');

// Global myGame Object instantiated from Class
let myGame = new Game('Alternating', 'audio/01-SpyHunter-A8-SpyHunterTheme.ogg', '../images/spy-hunter_title_dos.png');

const secondsGoUp = () => {

  //increment the seconds
  myGame.seconds++;
  
  // format the clock with minutes and seconds
  if (myGame.seconds < 10) {
    $('.sec').text(`0${myGame.seconds}`);
  } else {
    $('.sec').text(myGame.seconds);
  }

  // do stuff every 60 seconds like update the mins.
  if (myGame.seconds % 60 === 0) {
    myGame.minutes++; // increment minutes
    $('.min').text(myGame.minutes);
    myGame.seconds = '00';
    $('.sec').text(myGame.seconds);
  }

  // format lives meter red if down to 1
  if (myGame.activePlayer.lives <= 1) {
    $('.lives-meter').css('color', 'red');
  }

  // format missiles meter red if down to 1
  if (myGame.activePlayer.lives <= 3) {
    $('.missiles-meter').css('color', 'red');
  }

  // format oils meter red if down to 1
  if (myGame.activePlayer.lives <= 3) {
    $('.oils-meter').css('color', 'red');
  }

  // do stuff every 30 secs like increment the level and therefore the number and type of badguys
  if (myGame.seconds % 30 === 0) {
    if (myGame.levelUpFlag) {
      myGame.level++;
      $('.level-meter').text(myGame.level);
      // handle things as the level increases
      if (myGame.level === 2) {
        //myGame.numCivilians++;
        //myGame.numIces++;
      } else if (myGame.level === 3) {
        //myGame.numCivilians++;
        //myGame.numIces++;
        //myGame.numEnemies++;
      } else if (myGame.level === 4) {
        //myGame.numCivilians++;
        //myGame.numIces++;
        //myGame.numEnemies++;
      } else if (myGame.level === 5) {
        //myGame.numCivilians++;
        //myGame.numIces++;
        //myGame.numEnemies++;
      } else if (myGame.level === 6) {
        //myGame.numIces++;
      } else if (myGame.level >= 7) {
        //myGame.numIces++;
      }

      myGame.message = `Congratulations! You have reached level ${myGame.level}!`;
      $('.level-meter').text(myGame.level);
      myGame.$commsBar.css('color', 'yellow');
      myGame.printSomething(myGame.message);
      
      myGame.levelUpFlag = false;
    }
  }

  // do stuff every 31 seconds like reset the levelUpFlag
  if (myGame.seconds % 31 === 0) {
    myGame.levelUpFlag = true;
  }

  // disable classic TRAINING MODE at 0 min 15 seconds
  if (myGame.minutes === 0 && myGame.seconds === 15) {
    //disable unlimited retry "training" mode and start losing lives
    myGame.stillTrainingFlag = false;
    $('.high-scores h1').text('HIGH SCORES');
    $('.high-scores h1').css('color', 'white');
  }

  // handle awarding an extra life every 1000 points scaling with level.
  if (myGame.activePlayer.score > 0 && myGame.activePlayer.score % (5000 * myGame.level) === 0) {
    myGame.activePlayer.lives++;
    $('.lives-meter').text(myGame.activePlayer.lives);
    myGame.message = `You have earned an extra life! Number of Lives remaining: ${myGame.activePlayer.lives}`;
    myGame.$commsBar.css('color', 'yellow');
    myGame.printSomething(myGame.message);
  }

  // handle awarding extra Oil Slicks every 2000 points scaling with level.
  if (myGame.activePlayer.score > 0 && myGame.activePlayer.score % (7500 * myGame.level) === 0) {
    myGame.activePlayer.oils += 5;
    $('.oil-meter').text(myGame.activePlayer.oils);
    myGame.message = `You have earned an extra 5 oil slicks! Number of Oil Slicks remaining: ${myGame.activePlayer.oils}`;
    myGame.$commsBar.css('color', 'yellow');
    myGame.printSomething(myGame.message);
  }

  // handle awarding extra Missiles every 3000 points scaling with level.
  if (myGame.activePlayer.score > 0 && myGame.activePlayer.score % (10000 * myGame.level) === 0) {
    myGame.activePlayer.missiles += 5;
    $('.missile-meter').text(myGame.activePlayer.missiles);
    myGame.message = `You have earned an extra 5 missiles! Number of Missiles remaining: ${myGame.activePlayer.missiles}`;
    myGame.$commsBar.css('color', 'yellow');    
    myGame.printSomething(myGame.message);
  }

 // do end game logic if player runs out of lives
  if (myGame.activePlayer.lives <= 0) {
    // change player image to dead image/ or explosion animation

    // update high score leaderboard and display custom game over message
    if (myGame.activePlayer.name === myGame.playerOne.name) {
      myGame.message = `Master Spy Driver ${myGame.activePlayer.name} has died, refresh to play again as 1P or click NEXT PLAYER for 2P!`;
      myGame.$myPlayerScoreLoc = $('#player-one-score');
      myGame.printSomething(myGame.message);
    } else {
      myGame.message = `Despite a team effort ${myGame.activePlayer.name} has also died and the world was obliterated in a nuclear blast. Game Over! Refresh.`;
      myGame.$myPlayerScoreLoc = $('#player-two-score');
      myGame.printSomething(myGame.message);
    }
    if (Number(myGame.$myPlayerScoreLoc.text()) < myGame.activePlayer.score) {
      myGame.$myPlayerScoreLoc.text(myGame.activePlayer.score);
    }
    myGame.$commsBar.css('color', 'red');
    $('#pause').click();
    $('#start').prop('disabled', true);
  }
};

const stopAnimation = () => {
  cancelAnimationFrame(myGame.requestID)
  myGame.animationRunningFlag = false;
};

function startAnimation() {
    myGame.fpsInterval = 1000 / myGame.fps;
    myGame.then = Date.now();
    myGame.startTime = myGame.then;
    animate();
}

const animate = () => {
  // if player's lives reach 0, stop animationFrame
  if (myGame.activePlayer.lives > 0) {
    // recursion -- you are creating a situation where the function calls itself 
    
    // request another frame
    myGame.requestID = requestAnimationFrame(animate);

    // calc elapsed time since last loop
    myGame.now = Date.now();
    myGame.elapsed = myGame.now - myGame.then;

    // if enough time has elapsed, draw the next frame
    if (myGame.elapsed > myGame.fpsInterval) {
      // Get ready for next frame by setting then=now, but also adjust for your
      // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
      myGame.then = myGame.now - (myGame.elapsed % myGame.fpsInterval);

      // Put your drawing code here
      // code in here will be repeated 60 times/sec (approx)
      myGame.xFrame++; // will allow us to access how many frames
      myGame.animationRunningFlag = true; // this is a flag -- we will use it to prevent running animation more than once

      // move all players on the screen
      myGame.playersArray.forEach(function(player) {
        player.move(myGame.ctx);
      });

      // move all left shoulders on screen
      myGame.leftShoulderArray.forEach(function(leftShoulder) {
        // flag for removal any obstacles no longer on the screen
        if (leftShoulder.y > myGame.ctx.canvas.height) {
          leftShoulder.alive = false;
          myGame.leftShoulderRemovedFlag = true;
        } else {
          // otherwise move the obstacle
          leftShoulder.move(myGame.ctx);
        }
      });

      // move all right shoulders on screen
      myGame.rightShoulderArray.forEach(function(rightShoulder) {
        // flag for removal any obstacles no longer on the screen
        if (rightShoulder.y > myGame.ctx.canvas.height) {
          rightShoulder.alive = false;
          myGame.rightShoulderRemovedFlag = true;
        } else {
          // otherwise move the obstacle
          rightShoulder.move(myGame.ctx);
        }
      });

      // move all Ices on screen
      myGame.iceArray.forEach(function(ice) {
        // flag for removal any obstacles no longer on the screen
        if (ice.y > myGame.ctx.canvas.height) {
          ice.alive = false;
          myGame.iceRemovedFlag = true;
        } else {
          // otherwise move the obstacle
          ice.move(myGame.ctx);
        }
      });

      // move all civilians on screen
      myGame.civilianArray.forEach(function(civilian) {
        // flag for removal any obstacles no longer on the screen
        if (civilian.y > myGame.ctx.canvas.height) {
          civilian.alive = false;
          myGame.civilianRemovedFlag = true;
        } else {
          // otherwise move the obstacle
          civilian.move(myGame.ctx);
        }
      });

      // move all enemies on screen
      myGame.enemyArray.forEach(function(enemy) {
        // flag for removal any enemies no longer on the scren
        if (enemy.y > myGame.ctx.canvas.height) {
          enemy.alive = false;
          myGame.enemyRemovedFlag = true;
        } else {
          enemy.setDirection();
          enemy.move(myGame.ctx);
        }
      });

      //move and draw all weapon projectiles on screen
      myGame.activePlayer.weaponsArray.forEach(function(weapon) {
        // flag for removal any weapons no longer on the screen
        if (weapon.y < 0) {
          weapon.alive = false;
        } else {
          // otherwise move the obstacle
          weapon.move(myGame.ctx);
        }
        //check if weapon still is still "alive" and can do damage
        if (weapon.alive) {
          // check for projectile collision with enemy
          myGame.enemyArray.forEach(function(enemy) {
            if (weapon.checkCollision(enemy)) {
              myGame.message = `${weapon.type} has hit ${enemy.type} for ${weapon.damage}!`
              myGame.$commsBar.css('color', 'white');
              myGame.printSomething(myGame.message);
              enemy.hitpoints -= weapon.damage;
              if (enemy.hitpoints < 0) {
                myGame.activePlayer.score += (enemy.points * myGame.playerSpeedAdjust);
                $('.score-meter').text(myGame.activePlayer.score);
                enemy.alive = false;
                myGame.enemyRemovedFlag = true;
              }
              weapon.alive = false;
            }
          });
          // check for projectile collision with (civilian)
          myGame.civilianArray.forEach(function(civilian) {
            if (weapon.checkCollision(civilian)) {
              myGame.message = `${weapon.type} has hit ${civilian.type} for ${weapon.damage}!`
              myGame.$commsBar.css('color', 'white');
              myGame.printSomething(myGame.message)
              civilian.alive = false;
              myGame.civilianRemovedFlag = true;
              weapon.alive = false;
            }  
          });
        }
      });

      // check for collision with obstacles
      myGame.obstacleArray.forEach(function(obstacle) {
        // check for player collision with obstacle
        if (myGame.activePlayer.checkCollision(obstacle)) {
          if (!myGame.stillTrainingFlag && !myGame.activePlayer.justDamagedFlag) {
            myGame.message = `Player took some damage from collision with ${obstacle.type}!`;
            myGame.$commsBar.css('color', 'red');
            myGame.printSomething(myGame.message);
            myGame.activePlayer.score -= obstacle.damage;
            $('.score-meter').text(myGame.activePlayer.score);
            myGame.activePlayer.hitpoints -= obstacle.damage;
            obstacle.hitpoints -= myGame.activePlayer.collisionDamage;
            myGame.activePlayer.justDamagedFlag = true;
            setTimeout(function(){ myGame.activePlayer.justDamagedFlag = false; }, 2000); //invincible for 2 secs
          }
        }
        // check for enemy collision with obstacle
        myGame.enemyArray.forEach(function(enemy) {
          if (enemy.checkCollision(obstacle)) {
            if (!enemy.justDamagedFlag) {
              myGame.message = `${enemy.type} collided with ${obstacle.type}!`;
              myGame.$commsBar.css('color', 'white');
              myGame.printSomething(myGame.message);
              if (enemy.type === 'bulletproof bully') {
                enemy.hitpoints -= 50000000;
              } else if (enemy.type === 'master of the skies') {
                //do nothing because flying enemies are not damaged by obstacles
              } else {
                enemy.hitpoints -= obstacle.damage;
              }
              myGame.activePlayer.score += enemy.points;
              $('.score-meter').text(myGame.activePlayer.score);
              obstacle.hitpoints -= enemy.damage;
              enemy.justDamagedFlag = true;
              setTimeout(function(){ myGame.activePlayer.justDamagedFlag = false; }, 1000); //invincible for 1 secs
            }
          }
        });
        // set obstacle's/civilian's dead flag if hp below 0
        if (obstacle.hitpoints < 0) {
          obstacle.alive = false;
          myGame.civilianRemovedFlag = true;
        }
      });

      // check for collision with enemies
      myGame.enemyArray.forEach(function(enemy) {
        if (myGame.activePlayer.checkCollisionDirection(enemy)) {
          if (!myGame.stillTrainingFlag && !myGame.activePlayer.justDamagedFlag) {
            if (enemy.type === 'bulletproof bully') {
              enemy.hitpoints -= 50000000;
              myGame.activePlayer.score += enemy.points;
            } else {
              myGame.activePlayer.score -= (enemy.damage * myGame.playerSpeedAdjust);
              myGame.activePlayer.hitpoints -= enemy.damage;
            }
            myGame.message = `Player took some damage from collision with ${enemy.type}!`
            myGame.$commsBar.css('color', 'red');
            myGame.printSomething(myGame.message);
            
            $('.score-meter').text(myGame.activePlayer.score);
            enemy.hitpoints -= myGame.activePlayer.collisionDamage;
            myGame.activePlayer.justDamagedFlag = true;

            // handle collision bounce effect for enemies that are not the helicopter (master of the skies)
            if (enemy.type !== 'master of the skies') {
              if (myGame.activePlayer.colDir === 't') {
                if (myGame.activePlayer.y < 490) {
                  myGame.activePlayer.y += 100;
                }
                enemy.y -= 125;
              } else if (myGame.activePlayer.colDir === 'r') {
                myGame.activePlayer.x -= 100;
                enemy.x += 125;
              } else if (myGame.activePlayer.colDir === 'b') {
                if (myGame.activePlayer.y > 110) {
                  myGame.activePlayer.y -= 100;
                }
                enemy.y += 125;
              } else if (myGame.activePlayer.colDir === 'l') {
                myGame.activePlayer.x += 100;
                enemy.x -= 125;
              }
            }
            setTimeout(function(){ myGame.activePlayer.justDamagedFlag = false; }, 500); //can't bounce for 0.5 secs
          }
          // set enemy's dead flag if hp below 0
          if (enemy.hitpoints < 0) {
            myGame.activePlayer.score += (enemy.points * myGame.playerSpeedAdjust);
            $('.score-meter').text(myGame.activePlayer.score);
            enemy.alive = false;
            myGame.enemyRemovedFlag = true;
          }
        }
      });

      // remove dead left road shoulders
      myGame.leftShoulderArray = myGame.leftShoulderArray.filter(function(leftShoulder) {
        return leftShoulder.alive === true;
      });
      // add a new left shoulder if one was removed from the array offscreen
      if (myGame.leftShoulderRemovedFlag) {
        myGame.newLeftShoulderTile();
      }

      // remove dead right road shoulders
      myGame.rightShoulderArray = myGame.rightShoulderArray.filter(function(rightShoulder) {
        return rightShoulder.alive === true;
      });
      // add a new right shoulder if one was removed from the array offscreen
      if (myGame.rightShoulderRemovedFlag) {
        myGame.newRightShoulderTile();
      }

      // remove dead Ices
      myGame.iceArray = myGame.iceArray.filter(function(ice) {
        return ice.alive === true;
      });
      // add a new ice if one was removed from the array offscreen
      if (myGame.iceRemovedFlag) {
        myGame.newIceTile();
      }

      // remove dead civilians
      myGame.civilianArray = myGame.civilianArray.filter(function(civilian) {
        return civilian.alive === true;
      });
      // add a new ice if one was removed from the array offscreen
      if (myGame.civilianRemovedFlag) {
        myGame.newCivilianTile();
      }

      // remove dead obstacles
      myGame.obstacleArray = myGame.obstacleArray.filter(function(obstacle) {
        return obstacle.alive === true;
      }); // no need to repopulate as other specific loops handle this

      // remove dead enemies
      myGame.enemyArray = myGame.enemyArray.filter(function(enemy) {
        return enemy.alive === true;
      });
      // add a new enemy if one was removed from the array offscreen
      if (myGame.enemyRemovedFlag) {
        myGame.newEnemyTile();
      }

      // remove dead weapon projectiles
      myGame.activePlayer.weaponsArray = myGame.activePlayer.weaponsArray.filter(function(weapon) {
        return weapon.alive === true;
      }); // no need to repopulate as the player does this with the keyboard

      // if player's hitpoints reach 0 remove a life
      if (myGame.activePlayer.hitpoints < 1) {
        myGame.activePlayer.lives--;
        $('.lives-meter').text(myGame.activePlayer.lives);
        myGame.activePlayer.hitpoints = 100;
        myGame.message = `You lost a life! Lives remaining: ${myGame.activePlayer.lives}`;
        myGame.$commsBar.css('color', 'red');
        myGame.printSomething(myGame.message);
      }
    }
  }
}

// do stuff that happens on start button click
$('#start').on('click', () => {
  // start playing background audio on a loop;
  myGame.bgAudio = new Audio(myGame.bgTrack);
  myGame.bgAudio.loop = true;
  myGame.bgAudio.play();
  // jump to myGame.start()method for additional initializations
  myGame.start();
  // setInterval timer for every second to handle some game state transitions
  myGame.timePassing = setInterval(secondsGoUp, 1000);
  // reset xFrame counter for FPS downscaler (if desired) and start animation
  myGame.xFrame = 0;
  startAnimation();
});

// do stuff that happens on pause button click
$('#pause').on('click', () => {
  myGame.pause();
  myGame.bgAudio.pause();
  clearInterval(myGame.timePassing);
  stopAnimation();
});

// do stuff that happens on shoot-gun button click
$('#shoot-gun').on('click', () => {
  myGame.activePlayer.attack('gun');
});

// do stuff that happens on fire-missile button click
$('#fire-missile').on('click', () => {
  myGame.activePlayer.attack('missile');
});

// do stuff that happens on drop-oil button click
$('#drop-oil').on('click', () => {
  myGame.activePlayer.attack('oil');
});

// do stuff that happens on next-player button click
$('#next-player').on('click', () => {
    myGame.nextPlayer();
    myGame.bgAudio.pause();
    myGame.bgAudio.currentTime = 0;
    $('#start').click();
    // change button states
    $('#next-player').prop('disabled', true);
});

$(document).on('keydown', (e) => {
  //console.log(e);
  if(myGame.activePlayer) {
    //myGame.activePlayer.move(myGame.ctx, e.key, myGame.gridSize);
    if(['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'].includes(e.key)) {
      myGame.activePlayer.setDirection(e.key);
    }

    // so that we can restart animation 
    if(e.key === "1") {
      if(!myGame.animationRunningFlag) animate();
      else console.log("nope");
    }
    if(e.key === "2") {
      stopAnimation();
    }
  }
});

$(document).on('keyup', (e) => {
  //console.log(e);
  if(myGame.activePlayer) {
    if(['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'].includes(e.key)) {
      myGame.activePlayer.unsetDirection(e.key);
    }
    
    // if player releases Up Key we speed up background
    if (['ArrowUp'].includes(e.key)) {
      if (myGame.animationRunningFlag && myGame.speedUpCtr >= 0 && myGame.speedUpCtr < 4) {
        myGame.playerSpeedAdjust = (myGame.playerSpeedAdjust + myGame.speedUpCtr * myGame.speedUpRatio);
        myGame.speedUpCtr++;
      }
    }

    // if player presses Down Key we slow background
    if (['ArrowDown'].includes(e.key)) {
      if (myGame.animationRunningFlag && myGame.speedUpCtr > 0 && myGame.speedUpCtr <= 4) {
        myGame.speedUpCtr--;
        myGame.playerSpeedAdjust = (myGame.playerSpeedAdjust - myGame.speedUpCtr * myGame.speedUpRatio);
      }
    }

    // handle spacebar key release to shoot machine gun
    if (['v'].includes(e.key)) {
      myGame.activePlayer.attack('machine gun');
    }

    // handle c key release to fire missile
    if (['c'].includes(e.key)) {
      if (myGame.activePlayer.missiles > 0) {
        myGame.activePlayer.attack('missile');
      }
    }

    // handle x key release to drop oil slick
    if (['x'].includes(e.key)) {
      if (myGame.activePlayer.oils > 0) {
        myGame.activePlayer.attack('oil slick');
      }
    }
  }
});
