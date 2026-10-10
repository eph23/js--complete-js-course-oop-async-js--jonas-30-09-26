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
};

const renderError = function (message) {
  countriesContainer.insertAdjacentText('beforeend', message);
};

const getJSON = function (url, errorMessage = `Something went wrong`) {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`${errorMessage} (${response.status})`);
    }

    return response.json();
  });
};

const getCountyData = function (country) {
  getJSON(`https://countries.dev/name/${country}`, `Country not found`)
    .then(data => {
      renderCountry(data[0]);

      const neighbour = data[0].borders[0];

      if (!neighbour) {
        throw new Error(`No neighbour found`);
      }

      return getJSON(
        `https://countries.dev/alpha/${neighbour}`,
        `Country not found`,
      );
    })
    .then(dataNeighbour => {
      renderCountry(dataNeighbour, 'neighbour');
    })
    .catch(error => {
      renderError(`Something went wrong: ${error.message}`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountyData('bangladesh');
});
