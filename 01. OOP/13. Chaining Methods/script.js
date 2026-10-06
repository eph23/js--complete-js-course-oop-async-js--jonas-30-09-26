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
    return this;
  }

  withdrawal(val) {
    this.deposit(-val);
    return this;
  }

  #approveLoan() {
    return true;
  }

  requestLoan(val) {
    if (this.#approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved!`);
    }
    return this;
  }

  getMovements() {
    return this.#movements;
  }
}

const acc1 = new Account('Eph', 'USD', 1111);
const movements = acc1
  .deposit(300)
  .withdrawal(100)
  .withdrawal(50)
  .requestLoan(25000)
  .withdrawal(4000)
  .getMovements();
  
console.log(movements);
console.log(acc1);
