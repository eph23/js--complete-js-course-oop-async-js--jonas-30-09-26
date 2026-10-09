'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = `
        <article class='country ${className}'>
          <img class="country__img" src="${data.flags.svg}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(data.population / 1000000).toFixed(2)}M</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
          </div>
        </article>
  `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getCountyData = function (country) {
  fetch(`https://countries.dev/name/${country}`)
    .then(response => response.json())
    .then(data => {
      renderCountry(data[0]);

      const neighbour = data[0].borders[0];

      if (!neighbour) return;
      console.log(neighbour);

      return fetch(`https://countries.dev/alpha/${neighbour}`);
    })
    .then(responseNeighbour => responseNeighbour.json())
    .then(dataNeighbour => {
      console.log(dataNeighbour);
      renderCountry(dataNeighbour, 'neighbour');
    });
};

getCountyData('bangladesh');
