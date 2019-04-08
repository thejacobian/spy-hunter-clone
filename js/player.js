/* eslint-disable quote-props */
/* eslint-disable object-property-newline */
/* eslint-disable quotes */

class Player {
  constructor(name, type, icon) {
    // game logic related properties
    this.name = name;
    this.type =type; // Alternating or Co-op
    this.icon = icon;
    this.score = 0;
    this.hitpoints = 100;
    this.lives = 3;
    this.missiles = 10;
    this.oils = 10;
    this.speed = 5;
    this.weaponsArr = [];
    this.shootGunArr = [];
    this.fireMissileArr = [];
    this.dropOilArr = [];
    //this.actionsArr = [];
    this.message = '';
    this.justDamagedFlag = false;

    // canvas render properties
    this.xInit = 475;
    this.yInit = 500;
    this.x = 475;
    this.y = 500;
    this.width = 25;
    this.height = 50;
    this.color = 'rgb(255, 255, 0)';
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

  setDirection(key) {
    // pressing a key means we should be moving in that direction
    // remember -- move will be called every 1/60th of a second regardless
    if(key === "ArrowUp") this.direction.up = true;
    if(key === "ArrowLeft") this.direction.left = true;
    if(key === "ArrowDown") this.direction.down = true;
    if(key === "ArrowRight") this.direction.right = true;
  }

  unsetDirection(key) {
    // releasing a key means we should no longer be moving in that direction
    // remember -- move will be called every 1/60th of a second regardless
    // remember -- move will be called every 1/60th of a second regardless
    if(key === "ArrowUp") this.direction.up = false;
    if(key === "ArrowLeft") this.direction.left = false;
    if(key === "ArrowDown") this.direction.down = false;
    if(key === "ArrowRight") this.direction.right = false;
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

  attack(weapon) {
    let myWeapon;
    if (weapon === 'gun') {
      myWeapon = new Weapon('gun', 'images/Gun_1.png')
      this.shootGunArr.push(myWeapon);
    } else if (weapon === 'missile') {
      myWeapon = new Missile('missile', 'images/Missile_1.png')
      this.fireMissileArr.push(myWeapon);
      this.missiles--;
      $('.missile-meter').text(this.missiles);
    } else if (weapon === 'oil') {
      myWeapon = new OilSlick('oil', 'images/Oil_1.png')
      this.dropOilArr.push(myWeapon);
      this.oils--;
      $('.oil-meter').text(this.oils);
    }
    this.weaponsArr.push(myWeapon);
    //myWeapon.move(myGame.ctx);
    return this;
  }

  transform(type) {
    return this;
  }
}