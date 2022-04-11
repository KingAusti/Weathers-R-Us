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

const API_KEY = "0663fc572d76208f0ecd3412b806a465"
let LAT
let LON
// let TEMP
// let HUM
// let WIND
// let ICON
// let DESC
let fiveDay = []

const showToday = () => {
    document.appendChild
    {temp, desc} = sixDay[0]
}

const showNextFive = () => {
    for (let i=1; i<sixDay.length; i++) {
        document.createElement
    }
}

const submitForm = function(event) {
    event.preventDefault();
    getThatLatMyLon(cityInputEl.value);
}

const getThatLatMyLon = function(city){
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`)
    .then(
       response => response.json()       
    )
    .then(
        data => {
            LAT = data[0].lat
            LON = data[0].lon
            giveMeFive()
        }
    )
    .catch(err => console.error(err));
}

const giveMeFive = function() {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&cnt=6&appid=${API_KEY}&units=imperial`)
    .then(
        response => response.json()
    )
    .then(
        data => {
            data.list.forEach(day => {
                fiveDay.push(
                    {
                        temp: day.main.temp,
                        hum: day.main.humidity,
                        wind: data.wind.speed,
                        icon: data.weather[0].icon,
                        desc: data.weather[0].description
                    }
                )
            })
            console.log(fiveDay)
        }
    )
    .catch(err => console.error(err))
}

//event listeners
cityFormEl.addEventListener('submit', submitForm);
//pastSearchButtonEl.addEventListener('click', pastSearch);

// const getWeather = function() {    
//     fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${API_KEY}`)
//     .then(
//         response => response.json()
//     )
//     .then(
//         data => {
//             TEMP = data.main.temp
//             HUM = data.main.humidity
//             WIND = data.wind
//             ICON = data.weather[0].icon
//             DESC = data.weather[0].description
//             giveMeFive()     
//         }
//     )
//     .catch(err => console.error(err));
// }