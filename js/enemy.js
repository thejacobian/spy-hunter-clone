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
    this.hitpoints = 50;
    this.speed = 2;
    this.weaponsArr = [];
    this.actionsArr = [];
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
    makeRectangle(ctx, this.x, this.y, this.width, this.height, 'none', this.color, 1)
  }
  
  setDirection() {
    // pressing a key means we should be moving in that direction
    // remember -- move will be called every 1/60th of a second regardless
    if(myGame.activePlayer.y < this.y) this.direction.up = true;
    if(myGame.activePlayer.x < this.x) this.direction.left = true;
    if(myGame.activePlayer.y > this.y) this.direction.down = true;
    if(myGame.activePlayer.x > this.x) this.direction.right = true;
  }

  unsetDirection(key) {
    // releasing a key means we should no longer be moving in that direction
    // remember -- move will be called every 1/60th of a second regardless
    // remember -- move will be called every 1/60th of a second regardless
    // if(key === "ArrowUp") this.direction.up = false;
    // if(key === "ArrowLeft") this.direction.left = false;
    // if(key === "ArrowDown") this.direction.down = false;
    // if(key === "ArrowRight") this.direction.right = false;
  }

  move(ctx) {
    // clear it first, then move it.
    renderCanvas(ctx); //, this.x, this.y, this.width, this.height);
    // move it if it should be moving
    // remember -- this will be called every 1/60th of a second 
    if(this.direction.up && this.y > 5) this.y -= this.speed;
    if(this.direction.right && this.x < (ctx.canvas.width  - this.width - 5)) this.x += this.speed;
    if(this.direction.down && this.y < (ctx.canvas.height - this.height - 5)) this.y += this.speed;
    if(this.direction.left && this.x > 5) this.x -= this.speed;
    return this;
  }

  checkCollision(thing) {
    if(
      this.x + this.width > thing.x &&
      this.x < thing.x + thing.width &&
      thing.y < this.y + this.height && 
      thing.y + thing.height > this.y
    ) {
      return true;
    } else {
      return false;
    }
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
    this.hitpoints = 100;
    this.speed = 4;
  }

  // move(direction, velocity) {
  //   // custom movement behavior
  //   return this;
  // }

  // attack(weapon, damage) {
  //   // custom attack behavior.
  //   return this;
  // }
}

// Extended Bulletproof Bully class that must be run off the road.
class BulletproofBully extends Enemy {
  constructor(name, type, icon) {
    super(name, 'bulletproof', icon);
    this.points = 1500;
    this.hitpoints = 100000000;
    this.speed = 3;
  }

  // move(direction, velocity) {
  //   // custom movement behavior
  //   return this;
  // }

  // attack(weapon, damage) {
  //   // custom attack behavior.
  //   return this;
  // }
}

class DoubleBarrelAction extends Enemy {
  constructor(name, type, icon) {
    super(name, 'doublebarrel', icon);
    this.points = 2000;
    this.hitpoints = 250;
    this.speed = 2;
  }

  // move(direction, velocity) {
  //   // custom movement behavior
  //   return this;
  // }

  // attack(weapon, damage) {
  //   // custom attack behavior.
  //   return this;
  // }
}

class MasterOfTheSkies extends Enemy {
  constructor(name, type, icon) {
    super(name, 'master', icon);
    this.points = 2500;
    this.hitpoints = 50;
    this.speed = 5;
  }

  // move(direction, velocity) {
  //   // custom movement behavior
  //   return this;
  // }

  // attack(weapon, damage) {
  //   // custom attack behavior.
  //   return this;
  // }
}
