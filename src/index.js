// import './css/styles.css';
// import fetchCountries from './fetchCountries.js';
// import debounce from 'lodash.debounce';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';

// const DEBOUNCE_DELAY = 300;
// const searchCountry = document.querySelector('input#search-box');
// const countryList = document.querySelector('.country-list');
// const countryInfo = document.querySelector('.country-info');

// searchCountry.addEventListener(
//   'input',
//   debounce(e => {
//     handleSearch(e);
//   }, DEBOUNCE_DELAY)
// );

// function handleSearch(e) {
//   const fetchInput = e.target.value.trim();
//   if (fetchInput === '') {
//     countryInfo.innerHTML = '';
//     countryList.innerHTML = '';
//   } else {
//     fetchCountries(fetchInput)
//       .then(data => {
//         if (data.length > 10) {
//           Notify.info(
//             'Too many matches found. Please enter a more specific name.'
//           );
//         } else if (data.length >= 2 && data.length <= 10) {
//           countryInfo.innerHTML = '';
//           countryList.innerHTML = countryListShow(data);
//         } else {
//           countryList.innerHTML = '';
//           countryInfo.innerHTML = countryInfoShow(data);
//         }
//       })
//       .catch(Notify.warning('"Oops, there is no country with that name"'));
//   }
// }

// function countryListShow(countryArray) {
//   return countryArray
//     .map(({ name, flags }) => {
//       return `<li><img src="${flags.svg}" alt="${name}"><span>${name}</span></li>`;
//     })
//     .join('');
// }

// function countryInfoShow(countryArray) {
//   return countryArray
//     .map(({ name, flags, capital, population, languages }) => {
//       return `<div><img src="${flags.svg}" alt="${name}">${name}</div>
//         <p><span>Capital: </span>${capital}</p>
//         <p><span>Population: </span>${population}</p>
//         <p><span>Languages: </span>${Object.values(languages).join(', ')}</p>`;
//     })
//     .join('');
// }
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './css/styles.css';
import fetchCountries from './fetchCountries.js';

const refs = {
  searchInput: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

const { searchInput, countryList, countryInfo } = refs;
const DEBOUNCE_DELAY = 300;

searchInput.addEventListener('input', debounce(handleSearch, DEBOUNCE_DELAY));

function handleSearch(event) {
  const searchKey = event.target.value.trim();

  if (searchKey === '') {
    clearCountryList();
    clearCountryInfo();
  } else {
    fetchCountries(searchKey)
      .then(data => {
        if (data.length > 10) {
          Notify.info(
            'Too many matches found. Please enter a more specific name'
          );
          clearCountryList();
          clearCountryInfo();
        } else if (data.length >= 2 && data.length <= 10) {
          clearCountryInfo();
          countryList.innerHTML = countryListMurkup(data);
        } else {
          clearCountryList();
          countryInfo.innerHTML = countryInfoMurkup(data);
        }
      })
      .catch(error => {
        console.log(error);
        Notify.failure('Oops, there is no country with that name');
      });
  }
}

function countryListMurkup(countryArray) {
  return countryArray
    .map(({ name, flags }) => {
      return `<li class="country-list-item"><img style="width:150px" src="${flags.svg}" alt="${name.common}" class="country-list-img"><span class="country-list-name">${name.common}</span></li>`;
    })
    .join('');
}

function countryInfoMurkup(countryArray) {
  return countryArray
    .map(({ name, flags, capital, population, languages }) => {
      return `<div class="country-info-name"><img style="width:150px" src="${
        flags.svg
      }" alt="${name.common}" class="country-info-img" />${name.official}</div>
        <p><span class="country-info-text">Capital: </span>${capital}</p>
        <p><span class="country-info-text">Population: </span>${population}</p>
        <p><span class="country-info__bold">Languages: </span>${Object.values(
          languages
        ).join(', ')}</p>`;
    })
    .join('');
}

function clearCountryList() {
  countryList.innerHTML = '';
}

function clearCountryInfo() {
  countryInfo.innerHTML = '';
}
