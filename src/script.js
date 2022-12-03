//change city name and temperature values on page
function changeCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let city = cityInput.value;
  let apiKey = "7fc03e8d4259be6572769ab994d325bb";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(url).then(alertChange);
}

//alerts that you are changing information after submit
function alertChange(response) {
  let cityChange = document.querySelector("h4");
  let currentTemp = document.querySelector('span#current-temp');
  let highTemp = document.querySelector("span#high-degrees");
  let lowTemp = document.querySelector("span#low-degrees");
  let currentConditions = document.querySelector('span#current-conditions');
  let humidity = document.querySelector('span#humidity');
  let windSpeed = document.querySelector('span#wind-speed');
  alert(`let's find out the weather in ${response.data.name}, shall we?`);
  console.log(response);
  cityChange.innerHTML = response.data.name;
  currentTemp.innerHTML = Math.round(response.data.main.temp);
  highTemp.innerHTML = Math.round(response.data.main.temp_max);
  lowTemp.innerHTML = Math.round(response.data.main.temp_min);
  currentConditions.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
}

// find current coordinates for user
function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findLocation);
}

// shows weather for current user location
function findLocation(position) {
  let apiKey = "7fc03e8d4259be6572769ab994d325bb";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  axios.get(url).then(alertChange);
}

// starts function calls when you click on 'current location' button
let currentLocationLink = document.querySelector("#current-location-button");
currentLocationLink.addEventListener("click", currentLocation);

// starts function calls when you click on 'search' button
let menuSearch = document.querySelector("#menu-submit");
menuSearch.addEventListener("click", changeCity);

/* // changes saved cities in  menu bar to current temp and city upon click
function newYorkClick() {
  let url =
    "https://api.openweathermap.org/data/2.5/weather?q=new%20york&appid=7fc03e8d4259be6572769ab994d325bb&units=imperial";
  axios.get(url).then(alertChange);
}
let newYork = document.querySelector("#new-york");
newYork.addEventListener("click", newYorkClick);

function dallasClick() {
  let url =
    "https://api.openweathermap.org/data/2.5/weather?q=dallas&appid=7fc03e8d4259be6572769ab994d325bb&units=imperial";
  axios.get(url).then(alertChange);
}
let dallas = document.querySelector("#dallas");
dallas.addEventListener("click", dallasClick);

function sanDiegoClick() {
  let url =
    "https://api.openweathermap.org/data/2.5/weather?q=san%20diego&appid=7fc03e8d4259be6572769ab994d325bb&units=imperial";
  axios.get(url).then(alertChange);
}
let sanDiego = document.querySelector("#san-diego");
sanDiego.addEventListener("click", sanDiegoClick);

function seattleClick() {
  let url = 'https://api.openweathermap.org/data/2.5/weather?q=seattle&appid=7fc03e8d4259be6572769ab994d325bb&units=imperial';
  axios.get(url).then(alertChange);
}
let seattle = document.querySelector("#seattle");
seattle.addEventListener("click", seattleClick); */