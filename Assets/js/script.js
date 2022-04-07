//primary array
let cities = [];
//variable cluster
let cityFormEl = document.querySelector('#city-search');
let citySearchInputEl = document.querySelector('#city-searched');
let cityInputEl = document.querySelector('#city');
let forecastTitle = document.querySelector('#forecast');
let forecastContainerEl = document.querySelector('#fiveday');
let pastSearchButtonEl = document.querySelector('#past-search');
let weatherContainerEl = document.querySelector('#current-weather');

let getWeather = function() {    
    let apiFetch = "api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={0663fc572d76208f0ecd3412b806a465}"
}

//event listeners
cityFormEl.addEventListener('submit', submitForm);
pastSearchButtonEl.addEventListener('click', pastSearch);