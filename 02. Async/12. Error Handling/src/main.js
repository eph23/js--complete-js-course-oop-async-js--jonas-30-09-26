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
    countriesContainer.style.opacity = 1;
};

const renderError = function (message) {
    countriesContainer.insertAdjacentText("beforeend", message);
};

const getPosition = function () {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};

const whereAmI = async function (country) {
    try {
        const position = await getPosition();
        const { latitude: lat, longitude: lng } = position.coords;

        const geoResponse = await fetch(
            `https://api-bdc.net/data/reverse-geocode?latitude=${lat}&longitude=${lng}&localityLanguage=en&key=bdc_d63e6de052444c0aa24140dbc3c9560a`,
        );
        const dataGeo = await geoResponse.json();

        if (!geoResponse.ok) {
            throw new Error(`Problem getting location data`);
        }

        console.log(dataGeo);
        const response = await fetch(
            `https://countries.dev/name/${dataGeo.countryName}`,
        );

        if (!response.ok) {
            throw new Error(`Problem getting country data`);
        }

        const data = await response.json();

        console.log(data);

        renderCountry(data[0]);
    } catch (error) {
        console.log(error);
        renderError(`${error.message}`);
    }
};

whereAmI();
console.log("FIRST");
