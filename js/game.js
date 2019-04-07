/* eslint-disable quote-props */
/* eslint-disable object-property-newline */
/* eslint-disable quotes */

class Game {
  constructor(type, bgTrack, bgImage) {
    this.level = 1;
    this.seconds = 0;
    this.minutes = 0;
    this.playerOne = new Player ('Player 1', 'images/SpyCar1.png');
    this.playerTwo = new Player ('Player 2', 'images/SpyCar2.png');
    this.activePlayer = this.playerOne;
    this.stillTrainingFlag = false;
    this.showStartupMsgFlag = true;
    this.speedMultiplier = 1;
    this.timePassing;
    this.stateArr = [];
    this.message = '';
    this.type = type;
    this.bgTrack = bgTrack;
    this.bgAudio = new Audio(bgTrack);
    this.bgImage = bgImage;
    this.$gameCanvas = $('#game-canvas');
  }

  reset() {
    $(this.$commsBar).text(`You started over. The fate of the world is in your hands, good luck!`);
    clearInterval(this.timePassing);
    this.playerOne = new Player('Player 1', 'images/SpyCar1.png'); // Want to implement Type:'Co-op'
    this.playerTwo = new Player('Player 2', 'images/SpyCar2.png'); // Want to implement Type:'Co-op'
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
    //$('canvas').clear();
    this.showStartupMsg = true;
    this.bgAudio.pause();
    this.bgAudio.loop =true;
    this.start();
    return this;
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
      this.message = `The badguys have just stolen the nuclear launchcodes and are making their escape in a getaway car. You are a Master Spy Driver who must chase them down, while fending off the minions with your G-6155 Interceptor spy-mobile.\n\nWhat is your codename?`;
      $('#player-name').text(prompt(this.message));
      if (this.playerOne.name === 'Player 1') {
        this.activePlayer = this.playerOne;
      } else if (playerTwo.name === 'Player 2') {
        this.acivePlayer = this.playerTwo;
      }
      this.activePlayer.name = $('#player-name').text();
      this.showStartupMsgFlag = false;
    }

    // start playing background audio on a loop;
    this.bgAudio.loop =true;
    this.bgAudio.play();
  
    // display initial message
    this.message = `Agent ${this.activePlayer.name} reporting for duty. In pursuit of target...`;
    $(this.$commsBar).text(this.message);
    console.log(this.message);

    // change button states
    $('#start').prop('disabled', true);
    $('#shoot-gun').prop('disabled', false);
    $('#fire-missile').prop('disabled', false);
    $('#drop-oil').prop('disabled', false);

    this.renderCanvas();

    return this;
  }

  renderCanvas(){

    // makes a grid of 1px black lines with 49px between each parallel line
    function makeGrid( gridWidth) {
      ctx.strokeStyle = "rgb(255, 255, 255)'";
      ctx.lineWidth = 1

      // draw vertical lines
      for(let i = 0; i <= ctx.width; i += gridWidth) {
          ctx.beginPath();
          ctx.moveTo(i, 0);
          ctx.lineTo(i, ctx.height);
          ctx.stroke();
      }
      // draw horizontal lines
      for(let i = 0; i <= ctx.height; i +=gridWidth) {
          ctx.beginPath();
          ctx.moveTo(0, i);
          ctx.lineTo(ctx.width, i);
          ctx.stroke();
      }

    }

    console.log(this.$gameCanvas);

    // the "context" is what you actually draw on -- you basically always need it
    const ctx = this.$gameCanvas[0].getContext('2d');
    console.log(ctx); // cool, our rendering context is set up

    // style your stroke -- any valid CSS color value can go here
    ctx.strokeStyle = 'rgb(255,255,0)';

    // this will "stick" until you change it 
    ctx.lineWidth = 6

    // "hey i'm about to draw a new line"
    ctx.beginPath()

    // "start the line here"
    ctx.moveTo(100, 100) // pass in coords starting from top left corner: x, then y.

    // "the line should end here"
    ctx.lineTo(300, 300)

    // "actually draw the line"
    ctx.stroke();

    // draw grid with 50px boxes
    makeGrid(50);
  }
}