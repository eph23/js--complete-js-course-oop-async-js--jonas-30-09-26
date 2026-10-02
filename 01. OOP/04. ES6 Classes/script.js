'use strict';

class PersonCl {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  calcAge() {
    return 2037 - this.birthYear;
  }

  greet() {
    console.log(`Hey ${this.firstName}`);
  }
}

const eph = new PersonCl('Ephraim', 1988);
console.log(eph);

console.log(eph.__proto__);
console.log(eph.__proto__ === PersonCl.prototype);

/* PersonCl.prototype.greet = function () {
  console.log(`Hey ${this.firstName}`);
}; */
eph.greet();

