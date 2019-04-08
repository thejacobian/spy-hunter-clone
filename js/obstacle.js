/* eslint-disable quote-props */
/* eslint-disable object-property-newline */
/* eslint-disable quotes */

// Terrain such as pothole, road shoulder, road beyond shoulder, water
class Obstacle {
  constructor(type, icon, startX, startY, width, height, color) {
    this.type = type;
    this.icon = icon;
    this.damage = 50;
    this.speed = 0;
    this.hitpoints = 100000000;

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

  populate(tileX, tileY) {
    //place obstacle on canvas
    return this;
  }

  remove(tileX, tileY) {
    // remove obstacle from canvas.
    return this;
  }
}

class CivilianCar extends Obstacle {
  constructor(type, icon) {
    super('civilian car', icon);
    this.hitpoints = 1;
    this.speed = 1;

    // canvas render properties
    this.xInit = 400;
    this.yInit = 300;
    this.x = 400;
    this.y = 300;
    this.width = 25;
    this.height = 50;
    this.color = 'red';
  }

  // canvas draw method
  draw(ctx) {
    makeRectangle(ctx, this.x, this.y, this.width, this.height, this.color, this.color, 1)
  }
  
  populate(tileX, tileY) {
    //place obstacle on canvas
    return this;
  }

  remove(tileX, tileY) {
    // remove obstacle from canvas
    return this;
  }

  move(direction, velocity) {
    // do civilian movement here
    return this;
  }
}

class CivilianMotorbike extends Obstacle {
  constructor(type, icon) {
    super('civilian motorbike', icon);
    this.hitpoints = 1;
    this.speed = 4;
  }

  populate(tileX, tileY) {
    //place obstacle on canvas
    return this;
  }

  remove(tileX, tileY) {
    // remove obstacle from canvas
    return this;
  }

  move(direction, velocity) {
    // do civilian movement here
    return this;
  }
}
