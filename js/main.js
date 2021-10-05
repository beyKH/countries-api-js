// GLOBAL VARS
let COUNTRIES__BASE__URL = "https://restcountries.com/v3.1/name/";

// DOM ELEMENTS
const elCountriesForm = document.querySelector(".countries__form");
const elCountrySearchInput = document.querySelector(".js-search-input-country");
const elCountryFilter = document.querySelector(".js-filter-region");

const elCountryTemplateItem = document.querySelector("#country-template").content;
const elCountriesList = document.querySelector(".countries-list");

const elCountryModal = document.querySelector("#country-modal");
const elCountryModalName = elCountryModal.querySelector(".info-country__name");

// FUNCTIONS
function getJSON(url, successFn, errorFn){
  fetch(url)
  .then(response => response.json())
  .then((data) =>  {

    if (data.status !== 404 ) {
      successFn(data);
    }else{
      errorFn();
    }

  })
}

function showCountries(countries){
  elCountriesList.innerHTML = "";
  const elCountriesFragment = document.createDocumentFragment();
  const elCountryItem = elCountryTemplateItem.cloneNode(true);

  countries.forEach(country => {

    elCountryItem.querySelector("img").src = country.flags.svg;
    elCountryItem.querySelector(".country__name").textContent = country.name.common;
    elCountryItem.querySelector(".country__population").textContent = country.population;
    elCountryItem.querySelector(".country__region").textContent = country.region;
    elCountryItem.querySelector(".country__capital").textContent = country.capital[0];
    elCountryItem.querySelector(".country__more-btn").dataset.name = country.name.common;
    elCountriesFragment.appendChild(elCountryItem);

  });

  elCountriesList.appendChild(elCountriesFragment);

}

function showCountriesError() {
  elCountriesList.innerHTML = "";
  elCountriesList.textContent = "Not found";
}

function onCounryFormSubmit(evt) {
  evt.preventDefault();

  let searchUrl = `${COUNTRIES__BASE__URL}${elCountrySearchInput.value.trim()}`;
  getJSON(searchUrl, showCountries, showCountriesError);
}

function onClickCountryList(evt){
  if (evt.target.matches(".country__more-btn")) {
    let modalUrl = `${COUNTRIES__BASE__URL}${evt.target.dataset.name}`;
    getJSON(modalUrl, updateCountryModal, showCountriesError );
  }
}

function updateCountryModal(data) {
  elCountryModalName.textContent = data[0].name.common;
  elCountryModal.querySelector(".info-country__img").src = data[0].flags.svg;
  elCountryModal.querySelector(".country__details-region").textContent = data[0].region;
  // elCountryModal.querySelector(".country__details-currency").textContent = data[0].currencies;
  elCountryModal.querySelector(".country__details-borders").textContent = data[0].borders.join(", ");
  console.log(data[0].currencies);
  console.log(data[0].borders);
}

// RUN FUNCITONS

// EVENT LISTENERS

if (elCountriesForm) {
  elCountriesForm.addEventListener("submit", onCounryFormSubmit);
}

if (elCountriesList) {
  elCountriesList.addEventListener("click", onClickCountryList);
}


