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

const getCountryAndNeighbourData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://countries.dev/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    renderCountry(data);

    const neighbour = data.borders[0];

    if (!neighbour) return;

    const requestNeighbour = new XMLHttpRequest();
    requestNeighbour.open('GET', `https://countries.dev/alpha/${neighbour}`);
    requestNeighbour.send();

    requestNeighbour.addEventListener('load', function () {
      const neighbourData = JSON.parse(this.responseText);
      console.log(neighbourData);

      renderCountry(neighbourData, 'neighbour');
    });
  });
};

getCountryAndNeighbourData('bangladesh');
getCountryAndNeighbourData('canada');
