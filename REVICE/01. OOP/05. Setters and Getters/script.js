'use strict';

const account = {
  owner: 'Eph',
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(movement) {
    this.movements.push(movement);
  },
};

console.log(account.latest);
account.latest = 5000;
console.log(account.movements);
console.log(account.latest);

class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.firstName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  set fullName(name) {
    if (name.includes(' ')) {
      this._fullName = name;
    } else {
      console.log(`Not a full name`);
    }
  }

  get fullName() {
    return this._fullName;
  }
}

const eph = new PersonCl('Ephraim S', 1988);
console.log(eph);
eph.calcAge();

console.log(eph.__proto__ === PersonCl.prototype);
eph.greet();
console.log(eph.age);
console.log(eph.fullName);

const walter = new PersonCl('Walter White', 1965);
