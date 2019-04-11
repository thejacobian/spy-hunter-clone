/* eslint-disable quote-props */
/* eslint-disable object-property-newline */
/* eslint-disable quotes */

class Game {
  constructor(type, bgTrack, bgImage) {
    // Variables that do not reset when we switch playeres (static)
    this.type = type; //Alternating or Co-op
    this.bgTrack = bgTrack;
    this.bgImage = bgImage;
    this.$commsBar = $('.game-comms').children('h1').eq(0);
    this.$gameCanvas = $('#game-canvas');
    this.$myPlayerScoreLoc = $('#player-one-score');
    this.gridSize = 25;
    this.ctx = this.$gameCanvas[0].getContext('2d');

    // Variables that reset between player switches
    this.seconds = 0;
    this.minutes = 0;
    this.level = 0;
    this.levelUpFlag = true;
    this.stillTrainingFlag = true;
    this.showStartupMsgFlag = true;
    this.speedUpCtr = 0;
    this.speedUpRatio = 1.0;
    this.playerSpeedAdjust = 1;
    this.timePassing;
    this.message = '';

    // Objects for managing population of screen
    this.leftShoulderArray = [];
    this.leftShoulderTile;
    this.rightShoulderArray = [];
    this.rightShoulderTile;
    this.iceArray = [];
    this.civilianArray = [];
    this.obstacleArray = [];
    this.enemyArray = [];
    this.playersArray = [];
    this.playerOne = new Player ('Player 1', 'images/Spy_Car_1.png');
    this.playerTwo = new Player ('Player 2', 'images/Spy_Car_2.png');
    this.activePlayer = this.playerOne;
    this.requestID;
  
    // Define initial Flags for entities for populating later
    this.enemyRemovedFlag = false;
    this.iceRemovedFlag = false;
    this.civilianRemovedFlag = false;
    this.leftShoulderRemovedFlag = false;
    this.rightShoulderRemovedFlag = false;

    // animation fps and speed up and down key handling
    this.animationRunningFlag = false;
    this.fps = 55;
    this.fpsInterval
    this.startTime;
    this.then
    this.now
    this.elapsed;
    this.xFrame = 0;
  }

  printSomething() {
    console.log(this.message);
    $(this.$commsBar).text(this.message);
  }
    // Get Random Int between two numbers (inclusive)
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // Get Random Float between two numbers (inclusive)
  getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
  }

  // create new road left shoulder tile
  newLeftShoulderTile() {
    const newLeftShoulderY = this.leftShoulderArray[this.leftShoulderArray.length - 1].height; //+ 1;

    // nudge the runaway shoulder tile sizes back towards desired size
    let randomVariability = this.getRandomFloat(0.6, 1.4);
    if (this.leftShoulderArray[this.leftShoulderArray.length - 1].width >= 225 && randomVariability > 1) {
      randomVariability = this.getRandomFloat(0.4, 0.9);
    } else if (this.leftShoulderArray[this.leftShoulderArray.length - 1].width <= 75 && randomVariability < 1) {
      randomVariability = this.getRandomFloat(1.1, 1.4);
    }
    // create an exit when wide right shoulder extends beyond center of road
    if (this.rightShoulderTile.width > 300) {
      randomVariability = this.getRandomFloat(0.2, 0.6);
    }

    const randomWidthSizeChange = Math.floor(randomVariability * this.leftShoulderArray[this.leftShoulderArray.length - 1].width);
    this.leftShoulderTile = new Obstacle ('left shoulder', 'left_shoulder_terrain.png', 0, -newLeftShoulderY, randomWidthSizeChange, 600, 'rgb(255, 0, 255)');
    this.leftShoulderArray.push(this.leftShoulderTile);
    this.obstacleArray.push(this.leftShoulderTile);
    this.leftShoulderRemovedFlag = false;

    return this;
  }

  // create new road right shoulder tile
  newRightShoulderTile() {
    const newRightShoulderY = (this.rightShoulderArray[this.rightShoulderArray.length - 1].height) + 60 //+ 1;
    const newRightShoulderHeight = 660;

    // nudge the runaway shoulder tile sizes back towards desired size
    let randomVariability = this.getRandomFloat(0.6, 1.4);
    if (this.rightShoulderArray[this.rightShoulderArray.length - 1].width >= 225 && randomVariability > 1) {
      randomVariability = this.getRandomFloat(0.4, 0.9);
    } else if (this.rightShoulderArray[this.rightShoulderArray.length - 1].width <= 75 && randomVariability < 1) {
      randomVariability = this.getRandomFloat(1.1, 1.4);
    }
    // create an exit when wide left shoulder extends beyond center of road
    if (this.leftShoulderTile.width > 300) {
      randomVariability = this.getRandomFloat(0.2, 0.6);
    }

    const randomWidthSizeChange = Math.floor(randomVariability * this.rightShoulderArray[this.rightShoulderArray.length - 1].width);

    const newRightShoulderX = this.ctx.canvas.width - randomWidthSizeChange;
    this.rightShoulderTile = new Obstacle ('right shoulder', 'right_shoulder_terrain.png', newRightShoulderX, -newRightShoulderY, randomWidthSizeChange, newRightShoulderHeight, 'rgb(255, 255, 0)');
    this.rightShoulderArray.push(this.rightShoulderTile); 
    this.obstacleArray.push(this.rightShoulderTile);
    this.rightShoulderRemovedFlag = false;

    return this;
  }

  // create new ice tile
  newIceTile() {

    // populate up to as many ices as the game level (even appearing in the shoulder)
    let randomNumIces = Math.floor(Math.random()* myGame.level) + 1;
    let randomX;
    let iceTile;
    for (let i = 0; i < randomNumIces; i++) {
      randomX = this.getRandomInt(0, 575);
      iceTile = new Obstacle ('ice', 'ice_icon_1.png', randomX, 0, 25, 25, 'teal');
      this.iceArray.push(iceTile);
      this.obstacleArray.push(iceTile);
    }
    this.iceRemovedFlag = false;

    return this;
  }

  // create new civilian tile
  newCivilianTile() {

    // populate up to as many civilians as the game level (appearing only in the road)
    const randomNumCivilians = Math.floor(Math.random()* myGame.level) + 1;
    let randomChance;
    let randomX;
    let civilianTile;
    if (this.civilianArray < 5) {
      for (let i = 0; i < randomNumCivilians; i++) {
        randomChance = Math.random(); // used for probability if conditionals
        randomX = this.getRandomInt(myGame.leftShoulderTile.width + 50, myGame.rightShoulderTile.x - 50); 
        if (randomChance < 0.6) {
          civilianTile = new CivilianCar ('civilian car', 'civilian_car_icon.png', randomX, 0);
        } else {
          civilianTile = new CivilianBike ('civilian bike', 'civilian_bike_icon.png', randomX, 0);
        }
        this.civilianArray.push(civilianTile);
        this.obstacleArray.push(civilianTile);
      }
      this.civilianRemovedFlag = false;
    }

    return this;
  }

  // create new enemy tile
  newEnemyTile() {
    // populate up to as many enemys as the game level (appearing only in the road)
    const randomNumEnemies = Math.floor(Math.random()* myGame.level) + 1;
    let randomChance;
    let randomX;
    let enemyTile;
    if (this.enemyArray < 5) {
      for (let i = 0; i < randomNumEnemies; i++) {
        randomChance = Math.random(); // used for differing rate of enemy appearance below
        randomX = this.getRandomInt(myGame.leftShoulderTile.width + 50, myGame.rightShoulderTile.x - 50);
        if (randomChance < 0.01 * myGame.level) {
          enemyTile = new MasterOfTheSkies ('master of the skies', 'master_of_the_skies_icon.png', randomX, 0);
        } else if (randomChance < 0.02 * myGame.level) {
          enemyTile = new DoubleBarrelAction ('doublebarrel action', 'doublebarel_action_icon.png', randomX, 0);
        } else if (randomChance < 0.08 * myGame.level) {
          enemyTile = new BulletproofBully ('bulletproof bully', 'bulletproof_bully_icon.png', randomX, 0);
        } else if (randomChance < 0.10 * myGame.level) {
          enemyTile = new Tireslasher ('tireslasher', 'tireslasher_icon.png', randomX, 0);
        } else {
          enemyTile = new Enemy ('basic enemy', 'basic_enemy_icon.png', randomX, 0);
        }
        this.enemyArray.push(enemyTile);
      }
      this.enemyRemovedFlag = false;
    }

    return this;
  }

  //create initial visibile game board (which will push first/second items into arrays and act as catalyst)
  initialState() {

    // set training mode for first few seconds of initial state
    $('.high-scores h1').text('TRAINING MODE');
    $('.high-scores h1').css('color', 'red');

    // create initial left road shoulder obstacle
    this.leftShoulderTile = new Obstacle ('left shoulder', 'left_shoulder_terrain.png', 0, 0, 100, 600, 'rgb(255, 0, 255)');
    this.leftShoulderArray.push(this.leftShoulderTile);
    this.obstacleArray.push(this.leftShoulderTile);

    // create initial right road shoulder obstacle
    this.rightShoulderTile = new Obstacle ('right shoulder', 'shoulder_terrain.png', 500, 0, 100, 600, 'rgb(255, 255, 0)')
    this.rightShoulderArray.push(this.rightShoulderTile);
    this.obstacleArray.push(this.rightShoulderTile);

    this.newLeftShoulderTile(); // creates another left road shoulder and pushes into arrays
    this.newRightShoulderTile(); // creates another right road shoulder and pushes into arrays

    // create initial ice obstacle
    const firstIce = new Obstacle ('ice', 'ice_icon.png', 225, 225, 25, 25, 'teal');
    this.iceArray.push(firstIce);
    this.obstacleArray.push(firstIce);    

    // create initial civilian obstacle
    const firstCivilian = new CivilianCar ('civilian car', 'civilian_car_icon.png', 300, 400);
    this.civilianArray.push(firstCivilian);
    this.obstacleArray.push(firstCivilian);

    // create initial enemy
    const firstEnemy = new Enemy ('basic enemy', 'basic_enemy_icon.png', 250, 0);
    this.enemyArray.push(firstEnemy); 

    // the initial playe spy car is known and will be drawn in the renderCanvas() animation
    //this.playersArray[0];

    // draw visual layout
    renderCanvas(this.ctx);
  }

  // pause function from button click
  pause() {
    this.bgAudio.pause();
    $('#start').prop('disabled', false);
    $('#shoot-gun').prop('disabled', true);
    $('#fire-missile').prop('disabled', true);
    $('#drop-oil').prop('disabled', true);
    return this;
  }

  // initialize players
  initializePlayers() {
    if (this.type === 'Alternating') {
      if (this.xFrame === 0 && this.playerOne.score === 0) {
        this.playersArray.push(this.playerOne);
      } else {
        this.playersArray.push(this.playerTwo);
        this.activePlayer = this.playerTwo;
      }
    } else if (this.type === 'Co-op') {
      this.playersArray.push(this.playerOne);
      this.playersArray.push(this.playerTwo);
    }
  }

  // start method from button clicks (called by NEXT PLAYER)
  start() {
    // show initial startup message an prologue
    if (this.showStartupMsgFlag) {
      this.initializePlayers();

      this.message = `An evil mastermind has just stolen the nuclear launchcodes and they are making their escape in a getaway car. You are a Master Spy Driver who must chase them down, while fending off the minions with your G-6155 Interceptor Spy-Mobile.\n\nWhat is your codename?`;
      if (this.activePlayer.name ===  this.playerOne.name) {
        this.playerOne.name = prompt(this.message);
        this.activePlayer.name = this.playerOne.name;
        $('#player-one-name').text(this.playerOne.name);
      } else {
        this.playerTwo.name = prompt(this.message);
        this.activePlayer.name = this.playerTwo.name;
        $('#player-two-name').text(this.playerTwo.name);
      }
      this.showStartupMsgFlag = false;
    }
  
    // display initial message
    this.message = `Special Agent ${this.activePlayer.name} reporting for duty. In pursuit of enemy threats...`;
    $(this.$commsBar).text(this.message);
    console.log(this.message);

    // change button states
    $('#start').prop('disabled', true);
    $('#shoot-gun').prop('disabled', false);
    $('#fire-missile').prop('disabled', false);
    $('#drop-oil').prop('disabled', false);

    // instantiate initial game state conditions and draw
    this.initialState();

    return this;
  }

  // nextPlayer method from button click
  nextPlayer() {
    this.message = `It's the next player's turn. The fate of the world is in your hands, good luck!`;
    this.printSomething(this.message);
    myGame.$commsBar.css('color', 'white');
    // clear the setInterval clock for the next player.
    clearInterval(this.timePassing);

    // Reset variables that reset between player switches
    this.seconds = 0;
    this.minutes = 0;
    this.level = 0;
    this.levelUpFlag = true;
    this.stillTrainingFlag = true;
    this.showStartupMsgFlag = true;
    this.speedUpCtr = 0;
    this.speedUpRatio = 1.0;
    this.playerSpeedAdjust = 1;
    // this.timePassing = 0;
    this.message = '';

    // Reset objects for managing population of screen
    this.leftShoulderArray = [];
    this.leftShoulderTile;
    this.rightShoulderArray = [];
    this.rightShoulderTile;
    this.iceArray = [];
    this.civilianArray = [];
    this.obstacleArray = [];
    this.enemyArray = [];
    this.playersArray = [];
    this.requestID = 0;
  
    // Reset initial Flags for entities for populating later
    this.enemyRemovedFlag = false;
    this.iceRemovedFlag = false;
    this.civilianRemovedFlag = false;
    this.leftShoulderRemovedFlag = false;
    this.rightShoulderRemovedFlag = false;

    // Reset animation fps and speed up and down key handling
    this.animationRunningFlag = false;
    this.fps = 55;
    this.fpsInterval = 0;
    this.startTime = 0;
    this.then = 0;
    this.now = 0;
    this.elapsed = 0;
    // this.xframe is not cleared to 0 here as we use it before we clear in initializePlayer()

    // Initialize for Player 2's turn, which will be initialized when we call start() after returning
    this.activePlayer = this.playerTwo;

    // Clear some html counters and css from Player 1.
    $('.sec').text(`0${this.seconds}`);
    $('.min').text(`${this.minutes}`);
    $('.score-meter').text(0);
    $('.level-meter').text(this.level);
    $('.missile-meter').text(`${this.activePlayer.missiles}`);
    $('.missile-meter').css('color', 'white');
    $('.oil-meter').text(`${this.activePlayer.oils}`);
    $('.oil-meter').css('color', 'white');
    $('.lives-meter').text(`${this.activePlayer.lives}`);
    $('.lives-meter').css('color', 'white');
    $('.high-scores h1').text('TRAINING MODE');
    $('.high-scores h1').css('color', 'red');

    // starting the game happens after we return in start() button click event
    return this;
  }
}