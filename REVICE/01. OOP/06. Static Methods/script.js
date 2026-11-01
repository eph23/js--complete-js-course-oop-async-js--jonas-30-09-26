'use strict';

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

const eph = new Person('Eph', 1991);
console.log(eph);

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);
console.log(matilda);
console.log(jack);

console.log(eph instanceof Person);

Person.hey = function () {
  console.log(`Hey there 👋`);
};

Person.hey();

Person.prototype.calAge = function () {
  this.age = 2037 - this.birthYear;
  console.log(`${this.firstName} is ${this.age} years old`);
};

eph.calAge();
matilda.calAge();

Person.prototype.species = 'Homo Sapiens';
console.log(eph.species);
console.log(matilda.species);

console.log(eph.hasOwnProperty('firstName'));
console.log(eph.hasOwnProperty('species'));

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

  static hey() {
    console.log(`Hey 🫥`);
  }
}

const ephCl = new PersonCl('Ephraim S', 1988);
console.log(ephCl);
ephCl.calcAge();

console.log(ephCl.__proto__ === PersonCl.prototype);
ephCl.greet();
console.log(ephCl.age);
console.log(ephCl.fullName);

const walter = new PersonCl('Walter White', 1965);

PersonCl.hey();
