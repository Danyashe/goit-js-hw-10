import './css/styles.css';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;
const searchCountry = document.querySelector('input#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchCountry.addEventListener(
  'input',
  _.debounce(() => {
    handleSearch;
  }, DEBOUNCE_DELAY)
);

function handleSearch(e) {
  const fetchInput = e.target.value.trim();
  if (fetchInput === '') {
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
  } else {
    fetchCountries(fetchInput)
      .then(data => {
        if (data.length > 10) {
          Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (data.length >= 2 && data.length <= 10) {
          countryInfo.innerHTML = '';
          countryList.innerHTML = countryListShow(data);
        } else {
          countryList.innerHTML = '';
          countryInfo.innerHTML = countryInfoShow(data);
        }
      })
      .catch(err => {
        Notify.warning('"Oops, there is no country with that name"');
      });
  }
}

function countryListShow(countryArray) {
  return countryArray
    .map(({ name, flags }) => {
      return `<li><img src="${flags.svg}" alt="${name}"><span>${name}</span></li>`;
    })
    .join('');
}

function countryInfoShow(countryArray) {
  return countryArray
    .map(({ name, flags, capital, population, languages }) => {
      return `<div><img src="${flags.svg}" alt="${name}">${name}</div>
        <p><span>Capital: </span>${capital}</p>
        <p><span>Population: </span>${population}</p>
        <p><span>Languages: </span>${Object.values(languages).join(', ')}</p>`;
    })
    .join('');
}
