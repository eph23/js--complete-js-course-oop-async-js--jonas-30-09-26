'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = `
        <article class="country ${className}">
                <img class="country__img" src="${data.flags.png}" />
                <div class="country__data">
                  <h3 class="country__name">${data.name}</h3>
                  <h4 class="country__region">${data.region}</h4>
                  <p class="country__row"><span>👫</span>${(data.population / 1000000).toFixed(2)} M</p>
                  <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
                  <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
                </div>
        </article>
  `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
};

const renderError = function (message) {
  countriesContainer.insertAdjacentText('beforeend', message);
};

const getCountryData = function (country) {
  fetch(`https://countries.dev/name/${country}`)
    .then(response => response.json())
    .then(data => {
      renderCountry(data[0]);

      const neighbor = data[0].borders[0];
      if (!neighbor) return;

      return fetch(`https://countries.dev/alpha/${neighbor}`);
    })
    .then(neighborResponse => neighborResponse.json())
    .then(neighborData => renderCountry(neighborData, 'neighbour'))
    .catch(error => {
      console.error(`${error}`);
      renderError(`Something went wrong!. ${error.message}`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('bangladesh');
});
