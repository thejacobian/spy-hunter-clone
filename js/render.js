const renderCanvas = (ctx) => {
    // the "context" is what you actually draw on -- you basically always need it
    // console.log(ctx); // cool, our rendering context is set up

    // clears the canvas
    clearCanvas(ctx);

    // // draw left road shoulder obstacle
    // myGame.leftShoulderArray.forEach(function(leftShoulderTile) {
    //   leftShoulderTile.draw(ctx);
    // });

    // // draw right road shoulder obstacle
    // myGame.rightShoulderArray.forEach(function(rightShoulderTile) {
    //   rightShoulderTile.draw(ctx);
    // });

    // draw all obstacles including civilions
    myGame.obstacleArray.forEach(function(obstacle) {
      obstacle.draw(ctx);
    });

    // draw enemies on screen
    myGame.enemyArray.forEach(function(enemy) {
      enemy.draw(ctx);
    });

    // // draw civilians
    // myGame.civilianArray.forEach(function(civilian) {
    //   civilian.draw(ctx);
    // });

    // draw the spy car players on screen
    myGame.playersArray.forEach(function(player) {
      player.draw(ctx);
    });

    // draw the gun bullets on screen
    myGame.activePlayer.weaponsArray.forEach(function(projectile) {
      projectile.draw(ctx);
    });

    // // draw the missiles on screen
    // myGame.activePlayer.fireMissileArray.forEach(function(missile) {
    //   missile.draw(ctx);
    // });

    // // draw the oils on screen
    // myGame.activePlayer.dropOilArray.forEach(function(oil) {
    //   oil.draw(ctx);
    // });

    // // draw a circle
    // makeCircle(this.ctx, 75, 325, 71, 0, Math.PI * 2, 'orange', 2);

    // draw grid for visual layout
    makeGrid(ctx, myGame.gridSize, 'rgb(255, 255, 255)', 2);
        // draw center vertical line
    makeLine(ctx, 300, 0, 300, 600, 'rgb(255, 0, 255)', 2)
    // draw center horizontal line
    makeLine(ctx, 0, 300, 600, 300, 'rgb(255, 0, 255)', 2)
  };


const makeLine = (ctx, startX, startY, endX, endY, strokeColor, lineThickness) => {
  // style your stroke -- any valid CSS color value can go here
  ctx.strokeStyle = strokeColor;
  // this will "stick" until you change it 
  ctx.lineWidth = lineThickness;
  // "hey i'm about to draw a new line"
  ctx.beginPath();
  // "start the line here"
  ctx.moveTo(startX, startY); // pass in coords starting from top left corner: x, then y.
  // "the line should end here"
  ctx.lineTo(endX, endY);
  // "actually draw the line"
  ctx.stroke();
  return this;
};

const makeGrid = (ctx, boxSize, gridColor, lineThickness) => {
  // draw vertical lines
  for(let i = 0; i <= ctx.canvas.width; i += boxSize) {
    makeLine(ctx, i,0,i, ctx.canvas.height, gridColor, lineThickness);
  }
  // draw horizontal lines
  for(let i = 0; i <= ctx.canvas.height; i += boxSize) {
    makeLine(ctx, 0, i, ctx.canvas.width, i, gridColor, lineThickness);
  }
  return this;
};

const makeRectangle = (ctx, startX, startY, width, height, strokeColor, fillColor, lineThickness) => {
  
  // make a rectangle
  ctx.beginPath();

  // set styles
  if (strokeColor != 'none') {
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = lineThickness;
  }
  // this is the method for rectangles of any shape
  // it takes 4 parameters, here they are in order
  // 1. x coord of the UPPER LEFT HAND CORNER of the rectangle
  // 2. y coord of the UPPER LEFT HAND CORNER of the rectangle
  // 3. width of rect
  // 4. height of rect
  ctx.rect(startX, startY, width, height);
  // draw outline
  ctx.stroke()
  if (fillColor != 'none') {
    // set the fill color 
    ctx.fillStyle = fillColor;
    // use fill instead of stroke to get shape filled in
    ctx.fill()
  }
  return this;
};

const clearRectangle = (ctx, startX, startY, width, height) => {
    // clears a rectangle per the dimensions passed in
    ctx.beginPath();
    ctx.clearRect(startX, startY, width, height);
    return this;
};

const makeCircle = (ctx, centerX, centerY, radius, startAngle, endAngle, strokeColor, fillColor, lineThickness) => {
  ctx.beginPath();
  // set styles
  if (strokeColor != 'none') {
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = lineThickness;
  }z
  // to draw a circle, use .arc() -- params are of a different nature
  // x: the x coord fo the CENTER of the circle
  // y: the y coord of the CENTER of the circle
  // radius: 
  // start: "start angle", we'll keep it simple and just always set this to zero
  // end: "end angle": how much of the circle you want to actually draw in RADIANS (Note 2π radians is 360°), starting from start angle.
  ctx.arc(centerX, centerY, radius, startAngle, endAngle);
  ctx.stroke();
  if (fillColor != 'none') {
    ctx.fillStyle = fillColor;
    ctx.fill();
  }
  return this;
}

  const clearCanvas = (ctx) => {
      //clears the entire canvas rectangle
      clearRectangle(ctx, 0, 0, ctx.canvas.width, ctx.canvas.height);
  }