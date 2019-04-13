/* eslint-disable no-lonely-if */
/* eslint-disable quote-props */
/* eslint-disable object-property-newline */
/* eslint-disable quotes */

class Player {
  constructor(name, type, icon) {
    // game logic related properties
    this.name = name;
    this.type = type; // Alternating or Co-op
    this.icon = icon;
    this.score = 0;
    this.hitpoints = 99;
    this.lives = 3;
    this.missiles = 10;
    this.oils = 10;
    this.speed = 6;
    this.collisionDamage = 25;
    this.weaponsArray = [];
    this.shootGunArray = [];
    this.fireMissileArray = [];
    this.dropOilArray = [];
    this.message = '';
    this.colDir = false;
    this.justDamagedFlag = false;

    // canvas render properties
    this.xInit = 475;
    this.yInit = 500;
    this.x = 475;
    this.y = 500;
    this.width = 25;
    this.height = 50;
    this.color = 'rgb(255, 255, 255)';
    this.direction = {
      up: false,
      right: false,
      down: false,
      left: false,
    };
  }

  // canvas draw method
  draw(ctx) {
    makeRectangle(ctx, this.x, this.y, this.width, this.height, 'none', this.color, 1);
  }

  setDirection(key) {
    // pressing a key means we should be moving in that direction
    // remember -- move will be called every 1/60th of a second regardless
    if (key === "ArrowUp") this.direction.up = true;
    if (key === "ArrowLeft") this.direction.left = true;
    if (key === "ArrowDown") this.direction.down = true;
    if (key === "ArrowRight") this.direction.right = true;
  }

  unsetDirection(key) {
    // releasing a key means we should no longer be moving in that direction
    // remember -- move will be called every 1/60th of a second regardless
    // remember -- move will be called every 1/60th of a second regardless
    if (key === "ArrowUp") this.direction.up = false;
    if (key === "ArrowLeft") this.direction.left = false;
    if (key === "ArrowDown") this.direction.down = false;
    if (key === "ArrowRight") this.direction.right = false;
  }

  move(ctx) {
    // clear it first, then move it.
    renderCanvas(ctx); // , this.x, this.y, this.width, this.height);
    // move it if it should be moving
    // remember -- this will be called every 1/60th of a second
    if (this.direction.up && this.y > (ctx.canvas.height / 2 - this.height + 55)) this.y -= this.speed;
    if (this.direction.right && this.x < (ctx.canvas.width - this.width - 5)) this.x += this.speed;
    if (this.direction.down && this.y < (ctx.canvas.height - this.height - 5)) this.y += this.speed;
    if (this.direction.left && this.x > 5) this.x -= this.speed;
    return this;
  }

  checkCollision(thing) {
    if (
      this.x + this.width > thing.x &&
      this.x < thing.x + thing.width &&
      thing.y < this.y + this.height && 
      thing.y + thing.height > this.y
    ) {
      return true;
    }
    return false;  
  }

  // Modified collision check returning direction from internet canvas platformer tutorial URL below
  // http://www.somethinghitme.com/2013/04/16/creating-a-canvas-platformer-tutorial-part-tw/
  checkCollisionDirection(thing) {
    // get the vectors to check against
    const vX = (this.x + (this.width / 2)) - (thing.x + (thing.width / 2));
    const vY = (this.y + (this.height / 2)) - (thing.y + (thing.height / 2));

    // add the half widths and half heights of the objects
    const hWidths = (this.width / 2) + (thing.width / 2);
    const hHeights = (this.height / 2) + (thing.height / 2);

    this.colDir = false;

    // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) { // figures out on which side we are colliding (top, bottom, left, or right)
      const oX = hWidths - Math.abs(vX);
      const oY = hHeights - Math.abs(vY);
      if (oX >= oY) {
        if (vY > 0) {
          this.colDir = "t";
          this.y += oY;
        } else {
          this.colDir = "b";
          this.y -= oY;
        }
      } else {
        if (vX > 0) {
          this.colDir = "l";
          this.x += oX;
        } else {
          this.colDir = "r";
          this.x -= oX;
        }
      }
    }
    return this.colDir;
  }

  attack(weapon) {
    let myWeapon;
    if (weapon === 'machine gun') {
      myWeapon = new Weapon('machine gun', 'images/Gun_1.png', 'audio/Gun_Shot.mp3');
      this.shootGunArray.push(myWeapon);
    } else if (weapon === 'missile') {
      myWeapon = new Missile('missile', 'images/Missile_1.png', 'audio/Missile.mp3');
      this.fireMissileArray.push(myWeapon);
      this.missiles--;
      $('.missile-meter').text(this.missiles);
    } else if (weapon === 'oil slick') {
      myWeapon = new OilSlick('oil slick', 'images/Oil_1.png', 'audio/Oil.mp3');
      this.dropOilArray.push(myWeapon);
      this.oils--;
      $('.oil-meter').text(this.oils);
    }
    this.weaponsArray.push(myWeapon);
    const weaponSound = new Audio(myWeapon.sound);
    weaponSound.play();
    return this;
  }
}
