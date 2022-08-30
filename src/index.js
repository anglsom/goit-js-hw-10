import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { countryInfoEl } from './markUp';
import { countryListEl } from './markUp';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const searchBox = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener('input', debounce(handleInput, DEBOUNCE_DELAY));

function handleInput() {
  const nameCountry = searchBox.value;
  if (nameCountry === '') {
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
    return;
  }
 fetchCountries(nameCountry)
    .then(countries => {
      if (countries.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.');
        countryInfo.innerHTML = '';
        countryList.innerHTML = '';
        return;
      }
    
    if (countries.length <= 10) {
        const markupL = countries.map(country => countryListEl(country));
        countryList.innerHTML = markupL.join('');
        countryInfo.innerHTML = '';
      }

    if (countries.length === 1) {
        const markupI = countries.map(country => countryInfoEl(country));
        countryInfo.innerHTML = markupI.join('');
        countryList.innerHTML = '';
      }
    })  
     .catch(error => {
      Notify.failure('Oops, there is no country with that name');
      countryInfo.innerHTML = '';
      countryList.innerHTML = '';
      return error;
    });
}



