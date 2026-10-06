'use strict';

class Account {
  #pin;
  #movements = [];
  locale = navigator.language;
  bank = 'Bankist';

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;

    console.log(`Thanks for opening an account, ${owner}`);
  }

  deposit(val) {
    this.#movements.push(val);
  }

  withdrawal(val) {
    this.deposit(-val);
  }

  #approveLoan() {
    return true;
  }

  requestLoan(val) {
    if (this.approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved!`);
    }
  }

  getMovements() {
    return this.#movements;
  }
}

const acc1 = new Account('Eph', 'USD', 1111);
acc1.deposit(300);
acc1.withdrawal(100);
console.log(acc1);
console.log(acc1.getMovements());
