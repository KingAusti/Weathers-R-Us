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
let LAT;
let LON;
// let TEMP
// let HUM
// let WIND
// let ICON
// let DESC
let fiveDay = [];

// const showToday = function() {
//     document.appendChild
//     {temp, desc} = sixDay[0]
// }

const showNextFive = function (city) {
    
    let apiUrl ="https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + API_KEY + "&units=imperial";

      
      fetch(apiUrl).then(function (response) {
          // request was successful
          if (response.ok) {
              response.json().then(function (data) {
              theWeather(data);
              });
          } else {
              alert("Error: " + response.statusText);
          }
      })
      .catch(function (error) {
  
          alert("Unable to connect to OpenWeather");
      });
};

const formSubmitHandler = function(event) {
    event.preventDefault();
    //console.log('a string or')
    let cityName = cityInputEl.value.trim();
    if (cityName) {
        showNextFive(cityName);
        $('#city-searched').val('');
    } else {
        alert('This is an alert. You are alerted.')
    }
    
};

const theWeather = function(theWeatherData) {
    //display formatted weather
    $('#current-weather').addClass('border border-info border-5');
    $('#weather-title').text(theWeatherData.name + ' (' + dayjs(theWeatherData.dt * 1000).format('MM/DD/YYYY') + ') ')
    .append(`<img src="https://openweathermap.org/img/wn/${theWeatherData.weather[0].icon}@2x.png"></img>`);
    //current temp
    $('#weather-temp').text('Temperature: ' + theWeatherData.main.temp.toFixed(1) + '°F');
    //current humidity
    $('weather-humidity').text('Humidity: ' + theWeatherData.main.humidity + '%');
    //current wind speed
    $('#weather-wind').text('Wind Speed: ' + theWeatherData.wind.speed.toFixed(1) + ' mph');
    //fetch uvi 
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + theWeatherData.coord.lat + "&lon=" + theWeatherData.coord.lon + "&appid=" + API_KEY + "&units=imperial")
        .then(function (response) {
            response.json().then(function (data) {
                //display the uvi value
                $('weather-uvi').text('UVI Index: ' + data.current.uvi);
                //show five day forecast
                displayFiveDay(data)
            });
        });        
    //pass searched cities to localstorage
    lastCitySearched = theWeatherData.name;
    saveLastSearches(theWeatherData.name);
};

const displayFiveDay = function (data) {
    $("#forecast-title").text("5-Day Forecast:");

    // clear previous entries in forecast
    $("#forecast").empty();
      
    // for loop to get data for 5 days
    for (i = 1; i <= 5; i++) {
      // create elements div elements for daily weather card
      let cardDiv = $("<div>").addClass("col-md-2 m-2 py-3 card text-white bg-success");
      let cardBodyDiv = $("<div>").addClass("card-body p-1");
  
      // apend card body div to parent card div
      cardDiv.append(cardBodyDiv);
  
      // create elements for daily weather card content
      let cardTitle = $("<h5>").addClass("card-title").text(dayjs(data.daily[i].dt * 1000).format("MM/DD/YYYY"));
      let imgSrc ="https://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + ".png";
      let cardImg = $("<img>").attr("src", imgSrc).attr("alt", "weather-icon");
  
      let cardTemp = $("<p>")
      .addClass("card-text")
      .text("Temp: " + data.daily[i].temp.day.toFixed(1) + " °F");
  
      let cardWind = $("<p>")
      .addClass("card-text")
      .text("Wind: " + data.daily[i].wind_speed + " MPH");
  
      let cardHumidity = $("<p>")
      .addClass("card-text")
      .text("Humidity: " + data.daily[i].humidity + "%");
  
      // append content elements to parent div
      cardBodyDiv.append(cardTitle, cardImg, cardTemp, cardWind, cardHumidity);
  
      //append cards to parent forecast div on the page
      $("#forecast").append(cardDiv);
  
    }

};

// const getThatLatMyLon = function(city){
//     let apiUrl ="http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + API_KEY + "&units=imperial";
//     fetch(apiUrl)
//     .then(
//        response => response.json()  

//     )
//     .then(
//         data => {
//             LAT = data[0].lat
//             LON = data[0].lon
            
//         }    
//     )     
//     .catch(err => console.error(err));
//     displayFiveDay();

// };

// const giveMeFive = function() {
//     fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + theWeatherData.coor.lat + "&lon=" + theWeatherData.coor.lon + "&cnt=6&appid=" + API_KEY + "&units=imperial")
//     .then(
//         response => response.json()
//     )
//     .then(
//         data => {
//             data.list.forEach(day => {
//                 fiveDay.push(
//                     {
//                         temp: day.main.temp,
//                         hum: day.main.humidity,
//                         wind: data.wind.speed,
//                         icon: data.weather[0].icon,
//                         desc: data.weather[0].description                        
//                     }                      
//                 )
//                 //console.log(giveMeFive)
//             }) 
//             //displayFiveDay()
//         }
//     )
//     //console.log(giveMeFive)
//     .catch(err => console.error(err));
//     return data;
// }
//console.log(giveMeFive())




//event listeners

$("#search").on("click", formSubmitHandler);
//cityFormEl.addEventListener('#search', formSubmitHandler);
// console.log(cityFormEl.addEventListener('#search', formSubmitHandler))
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