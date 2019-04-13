/* eslint-disable quote-props */
/* eslint-disable object-property-newline */
/* eslint-disable quotes */

// Basic gun weapon shoots in front of Player vehicle.
class Weapon {
  constructor(type, icon, sound) {
    this.type = type;
    this.icon = icon;
    this.damage = 25;
    this.speed = 10;
    this.alive = true;
    this.sound = sound;

    // canvas render properties
    this.x = myGame.activePlayer.x + 11; // start bullets in front of car
    this.y = myGame.activePlayer.y - 10; // start bullets in front of car
    this.width = 2;
    this.height = 10;
    this.color = 'orange';
  }

  // canvas draw method
  draw(ctx) {
    makeRectangle(ctx, this.x, this.y, this.width, this.height, 'none', this.color, 1)
  }
  
  move(ctx) {
    // clear it first, then move it.
    renderCanvas(ctx); //, this.x, this.y, this.width, this.height);
    // move it if it should be moving
    // remember -- this will be called every 1/60th of a second 
    this.y -= (this.speed);;
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
}

// Extended  weapon to implement missile
class Missile extends Weapon {
  constructor(type, icon, sound) {
    super('missile', icon, sound);
    this.color = 'purple';
    this.damage = 200;
    this.speed = 18;

    // canvas render properties
    this.x = myGame.activePlayer.x + 9; // start bullets in front of car
    this.y = myGame.activePlayer.y - 22; // start bullets in front of car
    this.width = 6;
    this.height = 22;
  }
}

// Extended weapon to implement oil slick
class OilSlick extends Weapon {
  constructor(type, icon, sound) {
    super('oil slick', icon, sound);
    this.color = 'black';
    this.damage = 75;
    this.speed = -1;

    // canvas render properties
    this.x = myGame.activePlayer.x + 2; // start bullets in front of car
    this.y = myGame.activePlayer.y + 50; // start bullets in front of car
    this.width = 20;
    this.height = 20;
  }

  // canvas draw method
  draw(ctx) {
    makeRectangle(ctx, this.x, this.y, this.width, this.height, 'white', this.color, 1)
  }

  move(ctx) {
    // clear it first, then move it.
    renderCanvas(ctx); //, this.x, this.y, this.width, this.height);
    // move it if it should be moving
    // remember -- this will be called every 1/60th of a second 
    this.y -= (this.speed * myGame.playerSpeedAdjust);;
    return this;
  }
}
