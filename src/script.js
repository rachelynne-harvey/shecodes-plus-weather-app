//change city name and temperature values on page
function changeCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let city = cityInput.value;
  let apiKey = "a04dt03595dcf73o40ef02782a9109ba";
  let url = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(url).then(alertChange);
}

//alerts that you are changing information after submit and then changes it
function alertChange(response) {
  let cityChange = document.querySelector("h4");
  let currentTemp = document.querySelector('span#current-temp');
  let highTemp = document.querySelector("span#high-degrees");
  let lowTemp = document.querySelector("span#low-degrees");
  let currentConditions = document.querySelector('span#current-conditions');
  let humidity = document.querySelector('span#humidity');
  let windSpeed = document.querySelector('span#wind-speed');
  let weatherIcon = document.querySelector('#icon');
  alert(`let's find out the weather in ${response.data.city}, shall we?`);
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
}

// find current coordinates for user
function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findLocation);
}

// shows weather for current user location
function findLocation(position) {
  let apiKey = "a04dt03595dcf73o40ef02782a9109ba";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
  axios.get(url).then(alertChange);
}

// converts temperature from celsius to fahrenheit
function convertFahrenheitTemperature (event) {
  event.preventDefault();
  let currentFahrenheit = document.querySelector('#current-temp');
  let highFahrenheit = document.querySelector('#high-degrees');
  let lowFahrenheit = document.querySelector('#low-degrees');
  let unitElement = document.querySelector('#unit');
  let fahrenheitCurrent = (currentCelsius * 9) / 5 + 32;
  let fahrenheitHigh = (highCelsius * 9) / 5 + 32;
  let fahrenheitLow = (lowCelsius * 9) / 5 + 32;
  alert('changing to fahrenheit right now!');
  unitElement.innerHTML = ('F')
  currentFahrenheit.innerHTML = Math.round(fahrenheitCurrent);
  highFahrenheit.innerHTML = Math.round(fahrenheitHigh);
  lowFahrenheit.innerHTML = Math.round(fahrenheitLow);
}

// converts temperature from fahrenheit to celsius
function convertCelsiusTemperature (event) {
  event.preventDefault();
  let currentCelsiusTemp = document.querySelector('#current-temp');
  let highCelsiusTemp = document.querySelector('#high-degrees');
  let lowCelsiusTemp = document.querySelector('#low-degrees');
  let unitElement = document.querySelector('#unit');
  let celsiusCurrent = currentCelsius;
  let celsiusHigh = highCelsius;
  let celsiusLow = lowCelsius;
  alert ('changing to celsius right now!');
  unitElement.innerHTML = ('C');
  currentCelsiusTemp.innerHTML = Math.round(celsiusCurrent);
  highCelsiusTemp.innerHTML = Math.round(celsiusHigh);
  lowCelsiusTemp.innerHTML = Math.round(celsiusLow);
}

// establishes celsius temperature to use in functions
let currentCelsius = null;
let highCelsius = null;
let lowCelsius = null;

// starts function calls when you click on 'current location' button
let currentLocationLink = document.querySelector("#current-location-button");
currentLocationLink.addEventListener("click", currentLocation);

// starts function calls when you click on 'search' button
let menuSearch = document.querySelector("#menu-submit");
menuSearch.addEventListener("click", changeCity);

// starts function calls to convert to fahrenheit
let convertCelsius = document.querySelector('#fahrenheit-type');
convertCelsius.addEventListener('click', convertFahrenheitTemperature);

// starts function calls to convert to celsius
let convertFahrenheit = document.querySelector('#celsius-type');
convertFahrenheit.addEventListener('click', convertCelsiusTemperature)
