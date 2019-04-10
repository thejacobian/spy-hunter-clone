/* eslint-disable quote-props */
/* eslint-disable object-property-newline */
/* eslint-disable quotes */

// Terrain such as pothole, road shoulder, road beyond shoulder, water
class Obstacle {
  constructor(type, icon, startX, startY, width, height, color) {
    this.type = type;
    this.icon = icon;
    this.damage = 25;
    this.speed = 1;
    this.points = 0;
    this.hitpoints = 100000000;
    this.alive = true;

    // canvas render properties
    this.xInit = startX;
    this.yInit = startY;
    this.x = startX;
    this.y = startY;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  // canvas draw method
  draw (ctx) {
    makeRectangle(ctx, this.x, this.y, this.width, this.height, 'none', this.color, 1)
  }

  move(ctx) {
    // adjusts the vertical location by player's car speed.
    this.y += (this.speed * myGame.playerSpeedAdjust);
    // clears the canvas and draws the new location
    renderCanvas(ctx);
    // remember -- this will be called every 1/60th of a second 
    return this;
  }
}

class CivilianCar extends Obstacle {
  constructor(type, icon, startX, startY, width, height, color)  {
    super('civilian car', icon, startX, startY, width, height, color);
    this.hitpoints = 1;
    this.speed = 1.5;
    this.points = 100;
  }
}

class CivilianBike extends Obstacle {
  constructor(type, icon, startX, startY, width, height, color) {
    super('civilian bike', icon, startX, startY, width, height, color);
    this.hitpoints = 1;
    this.speed = 1.75;
    this.points = 200;
  }
}
