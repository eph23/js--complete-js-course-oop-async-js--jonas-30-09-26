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

const getJSON = function (url, errorMessage = `Something went wrong`) {
    return fetch(url).then((response) => {
        if (!response.ok) {
            throw new Error(`${errorMessage} (${response.status})`);
        }

        return response.json();
    });
};

const get3Countries = async function (c1, c2, c3) {
    try {
        /* 
        const [data1] = await getJSON(`https://countries.dev/name/${c1}`);
        const [data2] = await getJSON(`https://countries.dev/name/${c2}`);
        const [data3] = await getJSON(`https://countries.dev/name/${c3}`);
        console.log([data1.capital, data2.capital, data3.capital]);
        */

        const data = await Promise.all([
            getJSON(`https://countries.dev/name/${c1}`),
            getJSON(`https://countries.dev/name/${c2}`),
            getJSON(`https://countries.dev/name/${c3}`),
        ]);
        console.log(
            "Promise: all",
            data.map((country) => country[0].capital),
        );
    } catch (error) {
        console.error(error);
    }
};
get3Countries("Bangladesh", "Canada", "Russia");

(async function () {
    const data = await Promise.race([
        getJSON(`https://countries.dev/name/bangladesh`),
        getJSON(`https://countries.dev/name/italy`),
        getJSON(`https://countries.dev/name/canada`),
    ]);
    console.log("Promise: race", data[0].capital);
})();

const timeout = function (sec) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long`));
        }, sec * 1000);
    });
};

Promise.race([getJSON(`https://countries.dev/name/canada`), timeout(1)])
    .then((response) => console.log("Promise: race", response[0]))
    .catch((error) => console.error(error));

Promise.allSettled([
    Promise.resolve("Success"),
    Promise.resolve("Error"),
    Promise.resolve("Another Success"),
]).then((response) => console.log("Promise: allSettled", response));

Promise.any([
    Promise.resolve("Success"),
    Promise.resolve("Error"),
    Promise.resolve("Another Success"),
]).then((response) => console.log("Promise: any", response));
