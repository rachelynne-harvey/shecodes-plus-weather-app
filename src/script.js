//change city name and temperature values on page
function changeCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let city = cityInput.value;
  let apiKey = "a04dt03595dcf73o40ef02782a9109ba";
  let url = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(url).then(alertChange);
}

//alerts that you are changing information after submit
function alertChange(response) {
  let cityChange = document.querySelector("h4");
  let currentTemp = document.querySelector("span#current-temp");
  let highTemp = document.querySelector("span#high-degrees");
  let lowTemp = document.querySelector("span#low-degrees");
  let currentConditions = document.querySelector("span#current-conditions");
  let humidity = document.querySelector("span#humidity");
  let windSpeed = document.querySelector("span#wind-speed");
  let weatherIcon = document.querySelector("#icon");
  alert(`let's find out the weather in ${response.data.city}, shall we?`);
  console.log(response);
  cityChange.innerHTML = response.data.city;
  currentTemp.innerHTML = Math.round(response.data.daily[0].temperature.day);
  highTemp.innerHTML = Math.round(response.data.daily[0].temperature.maximum);
  lowTemp.innerHTML = Math.round(response.data.daily[0].temperature.minimum);
  currentConditions.innerHTML = response.data.daily[0].condition.description;
  humidity.innerHTML = response.data.daily[0].temperature.humidity;
  windSpeed.innerHTML = Math.round(response.data.daily[0].wind.speed);
  weatherIcon.setAttribute("src", response.data.daily[0].condition.icon_url);
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

// starts function calls when you click on 'current location' button
let currentLocationLink = document.querySelector("#current-location-button");
currentLocationLink.addEventListener("click", currentLocation);

// starts function calls when you click on 'search' button
let menuSearch = document.querySelector("#menu-submit");
menuSearch.addEventListener("click", changeCity);
