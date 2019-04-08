/* eslint-disable quote-props */
/* eslint-disable object-property-newline */
/* eslint-disable quotes */

// Basic gun weapon shoots in front of Player vehicle.
class Weapon {
  constructor(type, icon) {
    this.type = type;
    this.icon = icon;
    this.damage = 25;
    this.speed = 10;

    // canvas render properties
    this.x = myGame.activePlayer.x + 11; // start bullets in front of car
    this.y = myGame.activePlayer.y - 10 ; // start bullets in front of car
    this.width = 2;
    this.height = 10;
    this.color = 'orange';
  }

  // canvas draw method
  draw(ctx) {
    makeRectangle(ctx, this.x, this.y, this.width, this.height, this.color, this.color, 1)
  }
  
  move(ctx) {
    // clear it first, then move it.
    renderCanvas(ctx); //, this.x, this.y, this.width, this.height);
    // move it if it should be moving
    // remember -- this will be called every 1/60th of a second 
    this.y -= this.speed;
    return this;
  }
}

// Extended  weapon to implement missile
class Missile extends Weapon {
  constructor(type, icon) {
    super('missile', icon);
    this.color = 'purple';
    this.damage = 200;
    this.speed = 20;

    // canvas render properties
    this.x = myGame.activePlayer.x + 9; // start bullets in front of car
    this.y = myGame.activePlayer.y - 22; // start bullets in front of car
    this.width = 6;
    this.height = 22;
  }
}

// Extended weapon to implement oil slick
class OilSlick extends Weapon {
  constructor(type, icon) {
    super('oil slick', icon);
    this.color = 'gray';
    this.damage = 75;
    this.speed = -10;

    // canvas render properties
    this.x = myGame.activePlayer.x + 2; // start bullets in front of car
    this.y = myGame.activePlayer.y + 50; // start bullets in front of car
    this.width = 20;
    this.height = 20;
  }
}
