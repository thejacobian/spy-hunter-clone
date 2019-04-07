/* eslint-disable quote-props */
/* eslint-disable object-property-newline */
/* eslint-disable quotes */

// Terrain such as pothole, road shoulder, road beyond shoulder, water
class Obstacle {
  constructor(type, icon) {
    this.type = type;
    this.icon = icon;
    this.damage = 50;
    this.speed = 0;
    this.hitpoints = 100000000;
    this.$locationArr = '';
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
  constructor(name, type, icon) {
    super(name, 'civilian car', icon);
    this.hitpoints = 1;
    this.speed = 1;
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
  constructor(name, type, icon) {
    super(name, 'civilian motorbike', icon);
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
