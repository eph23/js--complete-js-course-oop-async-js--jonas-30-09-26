'use strict';

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

const eph = new Person('Ephraim', 1988);
console.log(eph);
console.log(eph instanceof Person);

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);
console.log(matilda);
console.log(jack);

console.log(matilda instanceof Person);
console.log(jack instanceof Person);

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

eph.calcAge();
matilda.calcAge();

console.log(eph.__proto__);
console.log(eph.__proto__ === Person.prototype);

console.log(Person.prototype.isPrototypeOf(eph));
console.log(Person.prototype.isPrototypeOf(Person));

Person.prototype.species = 'Homo Sapiens';

console.log(eph.species);
console.log(eph.hasOwnProperty('firstName'));
console.log(eph.hasOwnProperty('species'));
