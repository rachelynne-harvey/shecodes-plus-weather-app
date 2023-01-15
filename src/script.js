//change city name and temperature values on page
function changeCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let city = cityInput.value;
  let apiKey = "a04dt03595dcf73o40ef02782a9109ba";
  let url = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(url).then(alertChange);
}

//finds the forecast of a searched location
function getForecast(coordinates) {
  let apiKey = "a04dt03595dcf73o40ef02782a9109ba";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

//finds a city, alerts it, and returns all information on page
function alertChange(response) {
  let cityChange = document.querySelector("h4");
  let currentTemp = document.querySelector('span#current-temp');
  let highTemp = document.querySelector("span#high-degrees");
  let lowTemp = document.querySelector("span#low-degrees");
  let currentConditions = document.querySelector('span#current-conditions');
  let humidity = document.querySelector('span#humidity');
  let windSpeed = document.querySelector('span#wind-speed');
  let weatherIcon = document.querySelector('#icon');
  currentCelsius = Math.round(response.data.daily[0].temperature.day);
  highCelsius = Math.round(response.data.daily[0].temperature.maximum);
  lowCelsius = Math.round(response.data.daily[0].temperature.minimum);
  cityChange.innerHTML = response.data.city;
  currentTemp.innerHTML = currentCelsius;
  highTemp.innerHTML = highCelsius;
  lowTemp.innerHTML = lowCelsius;
  currentConditions.innerHTML = response.data.daily[0].condition.description;
  humidity.innerHTML = response.data.daily[0].temperature.humidity;
  windSpeed.innerHTML = Math.round(response.data.daily[0].wind.speed);
  weatherIcon.setAttribute('src', response.data.daily[0].condition.icon_url);
  getForecast(response.data.coordinates);
}

// find current coordinates for user
function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findLocation);
}

// shows weather for current user location
function findLocation(position) {
  let apiKey = "a04dt03595dcf73o40ef02782a9109ba";
  let url = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=imperial`;
  axios.get(url).then(alertChange);
}

// starts function calls when you click on 'current location' button
let currentLocationLink = document.querySelector("#current-location-button");
currentLocationLink.addEventListener("click", currentLocation);

// starts function calls when you click on 'search' button
let menuSearch = document.querySelector("#menu-submit");
menuSearch.addEventListener("click", changeCity);

// finds date from searched city
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

// converts date array response into day name
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  return days[day];
}

// displays forecast
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class='row'>`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
    <div class = 'col-2'>
      <div class="weather-forecast-date">${formatDay(forecastDay.time)}</div>
        <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
          forecastDay.condition.icon
        }.png"
          alt=""
          width="42">
         <div class="weather-forecast-temperature">
          <span class='weather-forecast-temp-max'>${Math.round(
            forecastDay.temperature.maximum
          )}°</span>
            <span class='weather-forecast-temp-min'>${Math.round(
              forecastDay.temperature.minimum
            )}°</span>
          </div>   
      </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//autofills information on page
function search(city) {
  let apiKey = "a04dt03595dcf73o40ef02782a9109ba";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(alertChange);
}

search("seattle");