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

  // format livesNum meter red if down to 1
  if (myGame.activePlayer.livesNum <= 1) {
    $('.lives-meter').css('color', 'red');
  }

  // handle game state transition for things that happen at 1 min
  if (myGame.minutes === 1 && myGame.seconds === 0) {
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
      myGame.speedMultiplier += 2;

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
      myGame.message = `*** Master Spy Driver Man ${myGame.activePlayer.name} has died and the world was obliterated in a nuclear apocalypse. Game Over! ***`;
    } else {
      myGame.message = `*** Master Spy Driver Man ${myGame.activePlayer.name} has died and the world was obliterated in a nuclear apocalypse. Game Over! ***`;
    }
    console.log(myGame.message);
    $(myGame.$commsBar).text(myGame.message);
    alert(myGame.message);
    clearInterval(mygame.timePassing);
    myGame.timePassing = 0;
    $('#stop').click();
    $('#start').prop('disabled', true);
  }
};

// do stuff that happens on start button click
$('#start').on('click', () => {
  myGame.start();
  myGame.timePassing = setInterval(secondsGoUp, 1000);
});

// do stuff that happens on pause button click
$('#pause').on('click', () => {
  myGame.pause();
  clearInterval(myGame.timePassing);
});

// do stuff that happens on shoot-gun button click
$('#shoot-gun').on('click', () => {
  // myTama.feed(feedWeight);
  // $('.hunger-meter').text(`${myTama.hunger}`);
  // $('.tamagotchi').prop('src', 'images/RoombaFull.png');
});

// do stuff that happens on fire-missile button click
$('#fire-missile').on('click', () => {
  // myTama.sleep(sleepWeight);
  // $('.sleep-meter').text(`${myTama.sleepiness}`);
  // $('.tamagotchi').prop('src', 'images/RoombaCharge.gif');
});

// do stuff that happens on drop-oil button click
$('#drop-oil').on('click', () => {
  // myTama.play(playWeight);
  // $('.boredom-meter').text(`${myTama.boredom}`);
  // $('.tamagotchi').prop('src', 'images/RoombaPlay.png');
});

// do stuff that happens on start-over button click
$('#start-over').on('click', () => {
    myGame.reset();
    myGame = new Game('Alternating', 'audio/01-SpyHunter-A8-SpyHunterTheme.ogg', 'images/spy-hunter_title_dos.png');
});

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