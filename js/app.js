// eslint-disable-next-line no-undef
console.log('Up and running\n\n\n\n\n\n\n');

// Global Variables
let myGame = new Game('Alternating', 'audio/01-SpyHunter-A8-SpyHunterTheme.ogg', '../images/spy-hunter_title_dos.png');

// play any audio file function
const playAudio = (sound) => {
  const playSound = new Audio(sound);
  playSound.play();
  return this;
};

const secondsGoUp = () => {
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

  // handle game state transition for things that happen at 0 min 5 seconds
  if (myGame.minutes === 0 && myGame.seconds === 5) {
    //disable unlimited retry "training" mode and start losing lives
    myGame.stillTrainingFlag = false;
  }

  // handle game state transition for things that happen at 3 mins
  if (myGame.minutes === 3 && myGame.seconds === 0) {
    //perhaps we will update the level here or base it on score?
  }

  // handle increased difficulty and frenzy
  if (myGame.activePlayer.score % 1000 ) { // increment level every 1000 points added to the score
    $('.level-meter').text(myGame.level);
    if (myGame.levelUpFlag) {
      myGame.level++;
      myGame.speedMultiplier += 1;

      // handle things as the level increases
      if (myGame.level === 2) {
        // $('.tamaB').css('visibility', 'visible');
        // message = `Level: ${level} Your ${myTama.type} is getting old. It now frequently gets clogged, does not hold a charge, and generally needs more attention than before.`;
        // $('#nameB').text(prompt(`It's time to get a new ${myTama.type} to help out. What is the name of your new pet ${myTama.type}?`));
        // $(myTama.$commsBar).text(message);
        // console.log(message);
      } else if (myGame.level === 3) {
        // do stuff at level 3
      } else if (myGame.level === 4) {
        // do stuff at level 4
      } else if (myGame.level === 5) {
        // do stuff at level 5
      } else if (myGame.level === 6) {
        // do stuff at level 6
      } else if (myGame.level >= 7) {
        // do stuff at level 7 or greater
      }

      myGame.levelUpFlag = false;
    }
  }

 // do end game logic if player runs out of lives
  if (myGame.activePlayer.lives <= 0) {
    // change player image to dead image/ or explosion animation
    //$('canvas').prop('src', 'images/RoombaInnards.gif');
    
    // handle custom ending depending on level achieved
    if (myGame.level < 2) {
      myGame.message = `Master Spy Driver ${myGame.activePlayer.name} has died and the world was obliterated in a nuclear blast. Game Over!`;
    } else {
      myGame.message = `Master Spy Driver ${myGame.activePlayer.name} has died and the world was obliterated in a nuclear blast. Game Over!`;
    }
    myGame.printSomething(myGame.message);
    //alert(myGame.message);
    clearInterval(myGame.timePassing);
    myGame.timePassing = 0;
    $('#stop').click();
    $('#start').prop('disabled', true);
  }
};

const stopAnimation = () => {
  cancelAnimationFrame(myGame.requestID)
  myGame.animationRunningFlag = false;
};

const animate = () => {
  // code in here will be repeated 60 times/sec (approx)
  myGame.xFrame++; // will allow us to access how many frames
  myGame.animationRunningFlag = true; // this is a flag -- we will use it to prevent running animation more than once

  // move all players on the screen
  myGame.playersArray.forEach(function(player) {
    player.move(myGame.ctx);
  });
  
  // move all enemies on screen
  myGame.enemyArray.forEach(function(enemy) {
    enemy.setDirection();
    enemy.move(myGame.ctx);
  });

  // move all obstacles on screen
  myGame.obstacleArray.forEach(function(obstacle) {
    obstacle.move(myGame.ctx);
  });

  //move and draw all weapon projectiles on screen
  myGame.activePlayer.weaponsArray.forEach(function(weapon) {
    
    // move the weapon projectile across the screen
    weapon.move(myGame.ctx);

    //check if weapon still has property alive and can do damage
    if (weapon.alive) {
      // check for projectile collision with enemy
      myGame.enemyArray.forEach(function(enemy) {
        if (weapon.checkCollision(enemy)) {
          myGame.message = `${weapon.type} has hit ${enemy.type} for ${weapon.damage}!`
          myGame.printSomething(myGame.message);
          enemy.hitpoints -= weapon.damage;
          if (enemy.hitpoints < 0) {
            myGame.activePlayer.score += enemy.points;
            enemy.alive = false;
          }
          weapon.alive = false;
        }
      });
      // check for projectile collision with obstacle (civilian)
      myGame.obstacleArray.forEach(function(obstacle) {
        if (weapon.checkCollision(obstacle)) {
            if (obstacle.type.includes('civilian')) {
              myGame.message = `${weapon.type} has hit ${obstacle.type} for ${weapon.damage}!`
              myGame.printSomething(myGame.message);
              obstacle.hitpoints -= weapon.damage;
              if (obstacle.hitpoints < 0) {
                myGame.activePlayer.score -= obstacle.points;
                obstacle.alive = false;
              }
              weapon.alive = false;
            }
          }
        });
      } 
  });

  // check for collision with obstacles
  myGame.obstacleArray.forEach(function(obstacle) {
    if (myGame.activePlayer.checkCollision(obstacle)) {
      if (!myGame.stillTrainingFlag && !myGame.activePlayer.justDamagedFlag) {
        myGame.printSomething(`Collision with ${obstacle.type}!`);
        myGame.activePlayer.score -= obstacle.damage;
        $('.score-meter').text(myGame.activePlayer.score);
        myGame.activePlayer.hitpoints -= obstacle.damage;
        myGame.activePlayer.justDamagedFlag = true;
        setTimeout(function(){ myGame.activePlayer.justDamagedFlag = false; }, 3000);
      }
    }
  });

  // check for collision with enemies
  myGame.enemyArray.forEach(function(enemy) {
    if (myGame.activePlayer.colCheck(enemy)) {
      if (!myGame.stillTrainingFlag && !myGame.activePlayer.justDamagedFlag) {
        myGame.printSomething(`Collision with ${enemy.type} from ${myGame.activePlayer.colDir}!`);
        myGame.activePlayer.score -= enemy.damage;
        $('.score-meter').text(myGame.activePlayer.score);
        myGame.activePlayer.hitpoints -= enemy.damage;
        enemy.hitpoints -= myGame.activePlayer.collisionDamage;
        myGame.activePlayer.justDamagedFlag = true;

        // handle collision bounce direction
        if (myGame.activePlayer.colDir === 't') {
          myGame.activePlayer.y += 100;
          enemy.y -= 125;
        } else if (myGame.activePlayer.colDir === 'r') {
          myGame.activePlayer.x -= 100;
          enemy.x += 125;
        } else if (myGame.activePlayer.colDir === 'b') {
          myGame.activePlayer.y -= 100;
          enemy.y += 125;
        } else if (myGame.activePlayer.colDir === 'l') {
          myGame.activePlayer.x += 100;
          enemy.x -= 125;
        }

        setTimeout(function(){ myGame.activePlayer.justDamagedFlag = false; }, 500);
      }
      // set enemy's dead flag if hp below 0
      if (enemy.hitpoints < 0) {
        myGame.activePlayer.score += enemy.points;
        enemy.alive = false;
      }
    }
  });

  // remove dead enemies
  myGame.enemyArray = myGame.enemyArray.filter(function(enemy) {
    return enemy.alive === true;
  });

  // remove dead civilians
  myGame.obstacleArray = myGame.obstacleArray.filter(function(obstacle) {
    return obstacle.alive === true;
  });

  // remove dead weapon projectiles
  myGame.activePlayer.weaponsArray = myGame.activePlayer.weaponsArray.filter(function(weapon) {
    return weapon.alive === true;
  });

  // if player's hitpoints reach 0 remove a life
  if (myGame.activePlayer.hitpoints < 1) {
    myGame.activePlayer.lives--;
    $('.lives-meter').text(myGame.activePlayer.lives);
    myGame.activePlayer.hitpoints = 100;
    myGame.message = `You lost a life! Lives remaining: ${myGame.activePlayer.lives}`;
    myGame.printSomething(myGame.message);
  }

  // if player's lives reach 0, stop animationFrame
  if (myGame.activePlayer.lives > 0) {
    // recursion -- you are creating a situation where the function calls itself 
    myGame.requestID = window.requestAnimationFrame(animate);
  }
}

// do stuff that happens on start button click
$('#start').on('click', () => {
  myGame.start();
  myGame.timePassing = setInterval(secondsGoUp, 1000);
  myGame.xFrame = 0;
  animate();
});

// do stuff that happens on pause button click
$('#pause').on('click', () => {
  myGame.pause();
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

// do stuff that happens on start-over button click
$('#start-over').on('click', () => {
    myGame.reset();
    myGame = new Game('Alternating', 'audio/01-SpyHunter-A8-SpyHunterTheme.ogg', 'images/spy-hunter_title_dos.png');
    $('#pause').click();
    $('#start').click();
});

$(document).on('keydown', (e) => {
  //console.log(e);
  if(myGame.activePlayer) {
    //myGame.activePlayer.move(myGame.ctx, e.key, myGame.gridSize);
    if(['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'].includes(e.key)) {
      myGame.activePlayer.setDirection(e.key);
    }

    // if player presses Up Key we speed up background
    if (['ArrowUp'].includes(e.key)) {
      // if (myGame.animationRunningFlag) {
      //   animate();
      // }
    }

    // if player presses Down Key we slow background
    if (['ArrowDown'].includes(e.key)) {
      // if (myGame.animationRunningFlag) {
      //   stopAnimation();
      // }
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
    
    // handle spacebar key release to shoot machine gun
    if ([' '].includes(e.key)) {
      myGame.activePlayer.attack('gun');
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
        myGame.activePlayer.attack('oil');
      }
    }
  }
});

// $('window').keydown(function() {
//   alert( "Handler for .keydown() called." );
// });
// /* <div class = "game-square"
//     x = 0
//     y = -1 */}
// // 1) Generate a grid

// // make 10 rows by 10 cols with an x and y attribute
// function generateBoardSquares = () => {
//   for (let y = 9; y >= 00; y--) {
//     console.log('Making Row' + y)
//     $('#gameboard').append(`<div class='row' row=${y} ></div>`)
//     for(let x = 9; x >= 00; x--) {
//       console.log('Making Col' + x)
//       $('#gameboard').append(`<div class='row' row=${x} ></div>`)

//       // make a square with the right coordinates
//       const $gameSquare = $(`<div class='game-square' x=${x} y=${y}`)
      
//       // add the square to the current row
//       $('div[row="${y}"]').append('gameSquare');
//     }
//   }
// };

// generateBoardSquares();

// class Laser {
//   constructor(x) {
//     this.x = x;
//     this.y = 0;
//     lasers.push(this); // add the new laser to the array of lasers (factory)
//     this.move() // when a laser gets created put it in the array and move it.
//   }

//   move() {
//     console.log("Moving");
//     console.log(this); // not sure what this will be...
//     this.y++
//     if(this.y < 11) {
//       const thisLaser = this;
//       setTimeout(()=>{
//         thisLaser.move();
//         }, 15);
//     }
//   },

//   render(){
//     console.log("RENDERING LASER");
//     $(`.game-square[x="${this.x}"])[y="${this.y - 1}"]`.removeClass('laser');
//     $(`.game-square[x="${this.x}"])[y="${this.y}"]`.addClass('laser');
//     });
//     lasers = lasers.filter((laser => layer.y <= 9)); // purge lasers not on grid (may now want to do each time)
//   }
// }

// // 2) Place a ship
// const ship: {
//   x: 5,
//   y: 0
//   render() {
//     // clear current div
//     $('.ship').removeClass('ship');
//     // put it on the new square
//     $(`.game-square[x={this.x}][y=${this.y}]`).addClass('ship');
//   },
//   move(direction) {
//     if(direction === 'left' && this.x > 0) {
//         this.x--;
//     } else if (direction === 'right' && this.x < 9) {
//         this.x++
//     }
//     this.render();
//   },

//   // 3) Ship fires laser up
//   fireTheLaser(){
//     console.log(`FireTheLasers on Col ${this.y}!`);
//     const myLaser = new Laser();
//   }
// }
// ship.render()

// //  - Ship moves right/left
// // look for KeyCode
// $('body').keyup((e)=>{
//   console.log(e.KeyCode)

// if(e.KeyCode === 37)
//   ship.move("left");
// } else if (e.KeyCode === 39)
//   ship.move("right");

// //4) Aliens appear
// // If div has a class already === 'alien' then collision has occurred.

// // Global Variables
// const $bgMusic = $('.bg-music').prop({ src: 'audio/01-SpyHunter-A8-SpyHunterTheme.ogg', preload: 'auto' });

// // $(document).ready(() => {
// // });

// $('form').on('submit', (e) => {
//   e.preventDefault();
//     playAudio();
// });