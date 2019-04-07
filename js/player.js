/* eslint-disable quote-props */
/* eslint-disable object-property-newline */
/* eslint-disable quotes */

class Player {
  constructor(name, type, icon) {
    this.name = name;
    this.type =type; // Alternating or Coop
    this.icon = icon;
    this.score = 0;
    this.hitpoints = 100;
    this.lives = 3;
    this.missiles = 10;
    this.oils = 10;
    this.speed = 5;
    this.weaponsArr = [];
    this.actionsArr = [];
    this.$Location = '';
    this.message = '';
  }

  move(direction, velocity) {
    // if (message === '') {
    //   this.message = `${this.name} was fed ${weighting} units.  Hunger Level now: ${this.hunger}`;
    // } else {
    //   this.message = message;
    // }
    // if (this.hunger > 0) {
    //   this.hunger = parseFloat(this.hunger) - weighting;
    // }
    // console.log(this.message);
    // $(this.$commsBar).text(this.message);
    // this.actionsArr.push(this.message);
    return this;
  }

  attack(weapon, damage) {
    // if (message === '') {
    //   this.message = `${this.name} took a nap for ${weighting} units. Sleepiness Level now: ${this.sleepiness}`;
    // } else {
    //   this.message = message;
    // }
    // if (this.sleepiness > 0) {
    //   this.sleepiness = parseFloat(this.sleepiness) - weighting;
    // }
    // console.log(this.message);
    // $(this.$commsBar).text(this.message);
    // this.actionsArr.push(this.message);
    return this;
  }

  transform(type) {
    // if (message === '') {
    //   this.message = `${this.name}'s was played with for ${weighting} units. Boredom Level now: ${this.boredom}`;
    // } else {
    //   this.message = message;
    // }
    // if (this.boredom > 0) {
    //   this.boredom = parseFloat(this.boredom) - weighting;
    // }
    // console.log(this.message);
    // $(this.$commsBar).text(this.message);
    // this.actionsArr.push(this.message);
    return this;
  }
}