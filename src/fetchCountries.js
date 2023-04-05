const BASE_URL = 'https://restcountries.com/v3.1/';

export const fetchCountries = name =>
  fetch(
    `${BASE_URL}?name.official,capital,population,flags.svg,languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
