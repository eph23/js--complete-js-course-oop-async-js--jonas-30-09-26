'use strict';

const lotteryPromise = new Promise(function (resolve, reject) {
  console.log(`Lottery draw is happening..........`);
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve(`YOU WIN!`);
    } else {
      reject(new Error(`...YOU LOST`));
    }
  }, 2000);
});

lotteryPromise
  .then(response => console.log(response))
  .catch(error => console.error(error));

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(1)
  .then(() => {
    console.log(`1 second passed`);
    return wait(1);
  })
  .then(() => {
    console.log(`2 second passed`);
    return wait(1);
  })
  .then(() => {
    console.log(`3 second passed`);
    return wait(1);
  })
  .then(() => {
    console.log(`4 second passed`);
  });

Promise.resolve('abc').then(x => console.log(x));
Promise.reject('abc').then(x => console.error(x));
