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
account.latest = 50;
console.log(account.latest);

class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  calcAge() {
    return 2037 - this.birthYear;
  }

  greet() {
    console.log(`Hey ${this._fullName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  set fullName(name) {
    if (name.includes(' ')) {
      this._fullName = name;
    } else {
      console.log(`Please add a full name`);
    }
  }

  get fullName() {
    return this._fullName;
  }
}

const eph = new PersonCl('Ephraim S.', 1988);
console.log(eph);

console.log(eph.__proto__);
console.log(eph.__proto__ === PersonCl.prototype);

/* PersonCl.prototype.greet = function () {
  console.log(`Hey ${this.firstName}`);
}; */
eph.greet();
console.log(eph.age);

const jessica = new PersonCl('Jessica Davis', 1996);
console.log(jessica);

const walter = new PersonCl('Walter', 1965);
console.log(walter);
