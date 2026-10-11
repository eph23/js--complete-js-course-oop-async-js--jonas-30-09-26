'use strict';

console.log(`Test - Start`);
setTimeout(() => console.log(`0 sec timer`), 0);

Promise.resolve(`Resolved promise 1`).then(response => console.log(response));

Promise.resolve(`Resolved Promise 2`).then(response => {
  for (let i = 0; i < 10000000; i++) {}
  console.log(response);
});

console.log(`Test - End`);
