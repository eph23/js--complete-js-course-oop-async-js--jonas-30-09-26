"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

const renderCountry = function (data, className = "") {
    const html = `
        <article class="country ${className}">
            <img class="country__img" src="${data.flags.svg}" />
            <div class="country__data">
                <h3 class="country__name">${data.name}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(
                    data.population / 1000000
                ).toFixed(2)}M</p>
                <p class="country__row"><span>🗣️</span>${
                    data.languages[0].name
                }</p>
                <p class="country__row"><span>💰</span>${
                    data.currencies[0].name
                }</p>
            </div>
        </article>
    `;

    countriesContainer.insertAdjacentHTML("beforeend", html);
};

const getPosition = function () {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};

getPosition().then((position) => console.log(position));

const whereAmI = function () {
    getPosition()
        .then((position) => {
            console.log(position.coords);

            const { latitude: lat, longitude: lng } = position.coords;

            console.log(lat, lng);
            return fetch(
                `https://api-bdc.net/data/reverse-geocode?latitude=${lat}&longitude=${lng}&localityLanguage=en&key=bdc_d63e6de052444c0aa24140dbc3c9560a`,
            );
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Problem with geocoding ${response.status}`);
            }

            return response.json();
        })
        .then((data) => {
            const country = data.countryName;

            return fetch(`https://countries.dev/name/${country}`);
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Problem with country data ${response.status}`);
            }

            return response.json();
        })
        .then((data) => {
            renderCountry(data[0]);
        })
        .catch((error) => {
            console.error(error.message);
        })
        .finally(() => {
            countriesContainer.style.opacity = 1;
        });
};

btn.addEventListener("click", whereAmI);
