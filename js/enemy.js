/* eslint-disable quote-props */
/* eslint-disable object-property-newline */
/* eslint-disable quotes */

// Basic Enemy Car Class that can be shot or run off the road for points.
class Enemy {
  constructor(name, type, icon) {
    this.name = name;
    this.type =type;
    this.icon = icon;
    this.points = 500;
    this.hitpoints = 5;
    this.speed = 2;
    this.weaponsArr = [];
    this.actionsArr = [];
    this.$locationArr = '';
    this.message = '';

    // canvas render properties
    this.xInit = 250;
    this.yInit = 0;
    this.x = 250;
    this.y = 0;
    this.width = 25;
    this.height = 50;
    this.color = 'blue';
  }

  // canvas draw method
  draw(ctx) {
    makeRectangle(ctx, this.x, this.y, this.width, this.height, this.color, this.color, 1)
  }
  
  move(direction, velocity) {
    // do movement here
    return this;
  }

  attack(weapon, damage) {
    // do attacking here
    return this;
  }
}

// Extended tire slasher car class that must be shot.
class TireSlasher extends Enemy {
  constructor(name, type, icon) {
    super(name, 'tireslasher', icon);
    this.points = 1000;
    this.hitpoints = 10;
    this.speed = 4;
  }

  move(direction, velocity) {
    // custom movement behavior
    return this;
  }

  attack(weapon, damage) {
    // custom attack behavior.
    return this;
  }
}

// Extended Bulletproof Bully class that must be run off the road.
class BulletproofBully extends Enemy {
  constructor(name, type, icon) {
    super(name, 'bulletproof', icon);
    this.points = 1500;
    this.hitpoints = 100000000;
    this.speed = 3;
  }

  move(direction, velocity) {
    // custom movement behavior
    return this;
  }

  attack(weapon, damage) {
    // custom attack behavior.
    return this;
  }
}

class DoubleBarrelAction extends Enemy {
  constructor(name, type, icon) {
    super(name, 'doublebarrel', icon);
    this.points = 2000;
    this.hitpoints = 25;
    this.speed = 2;
  }

  move(direction, velocity) {
    // custom movement behavior
    return this;
  }

  attack(weapon, damage) {
    // custom attack behavior.
    return this;
  }
}

class MasterOfTheSkies extends Enemy {
  constructor(name, type, icon) {
    super(name, 'master', icon);
    this.points = 2500;
    this.hitpoints = 50;
    this.speed = 5;
  }

  move(direction, velocity) {
    // custom movement behavior
    return this;
  }

  attack(weapon, damage) {
    // custom attack behavior.
    return this;
  }
}
