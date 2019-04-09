/* eslint-disable quote-props */
/* eslint-disable object-property-newline */
/* eslint-disable quotes */

// Basic Enemy Car Class that can be shot or run off the road for points.
class Enemy {
  constructor(type, icon) {
    this.type =type;
    this.icon = icon;
    this.points = 500;
    this.hitpoints = 49;
    this.speed = 2;
    this.damage = 20;
    this.weaponsArr = [];
    this.actionsArr = [];
    this.message = '';
    this.alive = true;

    // canvas render properties
    this.xInit = 250;
    this.yInit = 0;
    this.x = 250;
    this.y = 0;
    this.width = 25;
    this.height = 50;
    this.color = 'blue';
    this.direction = {
      up: false,
      right: false,
      down: false,
      left: false,
    };
  }

  // canvas draw method
  draw(ctx) {
    makeRectangle(ctx, this.x, this.y, this.width, this.height, 'none', this.color, 1)
  }
  
  setDirection() {
    // set vertical movement direction for enemy
    if(myGame.activePlayer.y < this.y) {
      this.direction.up = true;
      this.direction.down = false;
    } else if(myGame.activePlayer.y > this.y) {
      this.direction.up = false;
      this.direction.down = true;
    }

   // set horizontal movement direction for enemy
    if(myGame.activePlayer.x < this.x) {
      this.direction.left = true;
      this.direction.right = false;
    } else if(myGame.activePlayer.x > this.x) {
      this.direction.left = false;
      this.direction.right = true;
    }
  }

  move(ctx) {
    // clear it first, then move it.
    renderCanvas(ctx); //, this.x, this.y, this.width, this.height);
    // move it if it should be moving
    // remember -- this will be called every 1/60th of a second 
    this.y += 1;
    if(this.direction.up && this.y > 5) this.y -= this.speed * 0.75;
    if(this.direction.right && this.x < (ctx.canvas.width  - this.width - 5)) this.x += this.speed * 0.5;
    if(this.direction.down && this.y < (ctx.canvas.height - this.height - 5)) this.y += (this.speed * myGame.playerSpeedAdjust);;
    if(this.direction.left && this.x > 5) this.x -= this.speed * 0.5;
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
  constructor(type, icon) {
    super('tireslasher', icon);
    this.points = 1000;
    this.hitpoints = 100;
    this.speed = 4;
    this.damage = 100;
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
  constructor(type, icon) {
    super('bulletproof bully', icon);
    this.points = 1500;
    this.hitpoints = 100000000;
    this.speed = 3;
    this.damage = 20;
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
  constructor(type, icon) {
    super('doublebarrel action', icon);
    this.points = 2000;
    this.hitpoints = 250;
    this.speed = 2;
    this.damage = 50;
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
  constructor(type, icon) {
    super('master of the skies', icon);
    this.points = 2500;
    this.hitpoints = 50;
    this.speed = 5;
    this.damage = 100;
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
