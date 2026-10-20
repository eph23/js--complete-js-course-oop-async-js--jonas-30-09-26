'use strict';

class PersonCl {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.firstName}`);
  }
}

const eph = new PersonCl('Ephraim', 1988);
console.log(eph);
eph.calcAge();

console.log(eph.__proto__ === PersonCl.prototype);
eph.greet();
