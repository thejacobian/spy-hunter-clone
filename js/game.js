/* eslint-disable quote-props */
/* eslint-disable object-property-newline */
/* eslint-disable quotes */

class Game {
  constructor(type, bgTrack, bgImage) {
    this.bgTrack = bgTrack;
    this.bgAudio = new Audio(bgTrack);
    this.bgImage = bgImage;
    this.level = 1;
    this.seconds = 0;
    this.minutes = 0;
    this.stillTrainingFlag = true;
    this.showStartupMsgFlag = true;
    this.speedUpCtr = 0;
    this.speedUpRatio = 1.0;
    this.playerSpeedAdjust = 1;
    this.dropEntitySpeedAdjust = 1;
    this.timePassing;
    this.message = '';
    this.$commsBar = $('.game-comms').children('h1').eq(0);
    this.type = type; //Alternating or Co-op


    // objects for handling population of screen
    this.$gameCanvas = $('#game-canvas');
    this.gridSize = 25;
    this.ctx = this.$gameCanvas[0].getContext('2d');
    this.leftShoulderArray = [];
    this.rightShoulderArray = [];
    this.potholeArray = [];
    this.civilianArray = [];
    this.obstacleArray = [];
    this.enemyArray = [];
    this.playersArray = [];
    this.playerOne;
    this.playerTwo;
    this.activePlayer;
    this.requestID;
  
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
  };

  initializePlayers() {
    this.playerOne = new Player ('Player 1', 'images/Spy_Car_1.png');
    this.playerTwo = new Player ('Player 2', 'images/Spy_Car_2.png');
    if (this.type === 'Alternating') {
      this.playersArray.push(this.playerOne);
    } else if (this.type === 'Co-op') {
      this.playersArray.push(this.playerOne);
      this.playersArray.push(this.playerTwo);
    }
    this.activePlayer = this.playerOne;
  }

  // Get Random Int between two numbers (inclusive)
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // Get Random Float between two numbers (inclusive)
  getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
  }

  // create new road shoulder obstacles
  newShoulderTiles(type) {

    const newLeftShoulderY = this.leftShoulderArray[this.leftShoulderArray.length - 1].height + 1;
    const newRightShoulderY = this.rightShoulderArray[this.rightShoulderArray.length - 1].height + 1;
    
    // let randomVariability = this.getRandomFloat(0.7, 1.3);
    // if (this.rightShoulderArray[this.rightShoulderArray.length - 1].width >= 250 && randomVariability > 1) {
    //   randomVariability = this.getRandomFloat(0.4, 0.9);
    // } else if (this.rightShoulderArray[this.rightShoulderArray.length - 1].width <= 50 && randomVariability < 1) {
    //   randomVariability = this.getRandomFloat(1.1, 1.4);
    // }
    // const randomWidthSizeChange = randomVariability * this.rightShoulderArray[this.rightShoulderArray.length - 1].width;
    // const newRightShoulderX = this.ctx.canvas.width - randomWidthSizeChange;
    // let newShoulderTile = new Obstacle (type, 'left_shoulder_terrain.png', 0, -newLeftShoulderY, randomWidthSizeChange, 600, 'rgb(0, 255, 255)');
    // this.leftShoulderArray.push(newShoulderTile);
    // this.obstacleArray.push(newShoulderTile);
    // newShoulderTile = new Obstacle (type, 'right_shoulder_terrain.png', newRightShoulderX, -newRightShoulderY, randomWidthSizeChange, 600, 'rgb(255, 255, 0)');
    // this.rightShoulderArray.push(newShoulderTile); 
    // this.obstacleArray.push(newShoulderTile);

    let randomVariability = this.getRandomFloat(0.7, 1.3);
    if (this.rightShoulderArray[this.rightShoulderArray.length - 1].width >= 250 && randomVariability > 1) {
      randomVariability = this.getRandomFloat(0.4, 0.9);
    } else if (this.rightShoulderArray[this.rightShoulderArray.length - 1].width <= 50 && randomVariability < 1) {
      randomVariability = this.getRandomFloat(1.1, 1.4);
    }
    const randomWidthSizeChange = randomVariability * this.rightShoulderArray[this.rightShoulderArray.length - 1].width;
    const newRightShoulderX = this.ctx.canvas.width - randomWidthSizeChange;
    let newShoulderTile = new Obstacle (type, 'left_shoulder_terrain.png', 0, -newLeftShoulderY, randomWidthSizeChange, 600, 'rgb(0, 255, 255)');
    this.leftShoulderArray.push(newShoulderTile);
    this.obstacleArray.push(newShoulderTile);
    newShoulderTile = new Obstacle (type, 'right_shoulder_terrain.png', newRightShoulderX, -newRightShoulderY, randomWidthSizeChange, 600, 'rgb(255, 255, 0)');
    this.rightShoulderArray.push(newShoulderTile); 
    this.obstacleArray.push(newShoulderTile);

    return this;
  }

  initialState() {

    // create first left road shoulder obstacle
    const leftShoulderTile = new Obstacle ('left shoulder', 'left_shoulder_terrain.png', 0, 0, 100, 600, 'rgb(0, 255, 255)');
    this.leftShoulderArray.push(leftShoulderTile);
    this.obstacleArray.push(leftShoulderTile);
    // create first right road shoulder obstacle
    const rightShoulderTile = new Obstacle ('right shoulder', 'shoulder_terrain.png', 500, 0, 100, 600, 'rgb(0, 255, 255)')
    this.rightShoulderArray.push(rightShoulderTile);
    this.obstacleArray.push(rightShoulderTile);
    this.newShoulderTiles(); // creates another right road shoulder and pushes into arrays

    // create initial pothole obstacle
    const firstPothole = new Obstacle ('pothole', 'pothole_icon_1.png', 225, 225, 25, 25, 'green');
    this.potholeArray.push(firstPothole);
    this.obstacleArray.push(firstPothole);

    // create initial enemy
    const firstEnemy = new Enemy ('basic badguy', 'baddie_icon_1.png');
    this.enemyArray.push(firstEnemy);     

    // create initial civilian obstacle
    const firstCivilian = new CivilianCar ('civilian car', 'civvie_icon_1.png');
    this.civilianArray.push(firstCivilian);
    this.obstacleArray.push(firstCivilian);

    // create spy car box
    //this.playersArray[0];

    // draw visual layout
    renderCanvas(this.ctx);
  }

  pause() {
    this.bgAudio.pause();
    $('#start').prop('disabled', false);
    $('#shoot-gun').prop('disabled', true);
    $('#fire-missile').prop('disabled', true);
    $('#drop-oil').prop('disabled', true);
    return this;
  }

  start() {
    // show initial startup message an prologue
    if (this.showStartupMsgFlag) {
      this.initializePlayers();

      // this.message = `The badguys have just stolen the nuclear launchcodes and are making their escape in a getaway car. You are a Master Spy Driver who must chase them down, while fending off the minions with your G-6155 Interceptor spy-mobile.\n\nWhat is your codename?`;
      $('#player-name').text('Jake Spy'); // prompt(this.message));
      if (this.playerOne.name === 'Player 1') {
        this.activePlayer = this.playerOne;
      } else if (playerTwo.name === 'Player 2') {
        this.acivePlayer = this.playerTwo;
      }
      this.activePlayer.name = $('#player-name').text();
      this.showStartupMsgFlag = false;
    }

    // start playing background audio on a loop;
    this.bgAudio.loop = true;
    //this.bgAudio.play();
  
    // display initial message
    this.message = `Agent ${this.activePlayer.name} reporting for duty. In pursuit of target...`;
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

  reset() {
    this.message = '`You started over. The fate of the world is in your hands, good luck!';
    this.printSomething(this.message);
    clearInterval(this.timePassing);
    this.initializePlayers();
    this.activePlayer = this.playerOne;
    this.timePassing = 0;
    this.seconds = 0;
    this.minutes = 0;
    this.level = 1;
    this.speedMultiplier = 1;
    $('.sec').text(`0${this.seconds}`);
    $('.min').text(`${this.minutes}`);
    $('.score-meter').text(0);
    $('.level-meter').text(this.level);
    $('.missile-meter').text(`${this.playerOne.missiles}`);
    $('.missile-meter').css('color', 'white');
    $('.oil-meter').text(`${this.playerOne.oils}`);
    $('.oil-meter').css('color', 'white');
    $('.lives-meter').text(`${this.playerOne.lives}`);
    $('.lives-meter').css('color', 'white');
    $('.player-name').text('Player 1');
    this.showStartupMsg = true;
    this.bgAudio.pause();
    this.bgAudio.loop =true;
    this.xFrame = 0;
    this.requestID = null;
    this.animationRunningFlag = false;
    this.showStartupMsgFlag = true;
    this.start();
    return this;
  }
}