
//Get form and add event listener for submission
const input = document.querySelector('#city');
const submit = document.querySelector('#submit');

//get entire beginning form and ending form
const search = document.querySelector("#top");
const weatherDisplay = document.querySelector("#weather");

//get weather display elements
const weatherBody = document.querySelector(".weather-container");
const icon = document.querySelector("#img-icon");
const tempVal = document.querySelector("#temp-value");
const des = document.querySelector("#description");
const loc = document.querySelector("#location");
const details = document.querySelector("#details");

const high = document.querySelector("#high-temp");
const low = document.querySelector("#low-temp");
const humidity = document.querySelector("#humidity-value");
const windSpeed = document.querySelector("#windSpeed-value");

//get back button from weather section
const back = document.querySelector('#back');

//keeps track of important data values
const weather = {};
const Kelvin = 273;

//store api key
const apiKey = "242e7e5620f9b0e2bad6976201a676b3";

//when page loads, removed the weather section and only shows the search section
window.addEventListener('load', (event) => {
  show();
});

//adds an event listener for when the submit button is clicked
submit.addEventListener('click', function () {
  let cityValue = input.value;
  findWeather(cityValue);
});

//adds an event listener for when the back button is clicked and resets values
back.addEventListener('click', function () {
  reset();
});

//Can see the example data from here 
//https://api.openweathermap.org/data/2.5/weather?q=calgary&appid=242e7e5620f9b0e2bad6976201a676b3


function findWeather(location) {
  //constructs api url
  const api = ("https://api.openweathermap.org/data/2.5/weather?q="+location+"&appid="+apiKey);

  fetch(api)
  .then(function(response){
      let data = response.json();
      return data;
  })
  .then(function(data){
    try{
    //retrives all the relevant data
    weather.city = data.name;
    weather.iconId = data.weather[0].icon;
    weather.country = data.sys.country;
    weather.temperature = Math.floor(data.main.temp - Kelvin);
    weather.description = data.weather[0].description;
    weather.high = Math.floor(data.main.temp_max - Kelvin);
    weather.low = Math.floor(data.main.temp_min - Kelvin);
    weather.windSpeed = data.wind.speed;
    weather.humidity = data.main.humidity;
    } catch(err) {
      console.log(err);
      alert("Location Not Found! Try putting a valid city?");
      exit;
    }
  })
  .then(function(){
      displayWeather();
  })
}

//hides the search bar and shows the weather section
function hide() {
  search.style.display = "none";
  console.log("hiding search bar");

  weatherDisplay.style.display = "block";
  console.log("showing weather display");
}

//shows the search bar and hides the weather section
function show() {
  weatherDisplay.style.display = "none";
  console.log("hiding weather display ");

  search.style.display = "block";
  console.log("showing search bar");
}

function reset() {
  show();
  weather = {};
}

function displayWeather() {
  hide();
  loc.innerHTML = weather.city +", " + weather.country;
  //gets the icons from the website for now
  // icon.src = `http://openweathermap.org/img/wn/${weather.iconId}.png`;
  tempVal.innerHTML = weather.temperature+ "°C";
  des.innerHTML = weather.description;
  high.innerHTML = weather.high + "°C";
  low.innerHTML = weather.low + "°C";
  windSpeed.innerHTML = "Wind Speed: " + weather.windSpeed + "";
  humidity.innerHTML = "Humidity: " + weather.humidity + "%"
  pickBackground(weather.description);
}


//function to pick the background of the weather section
//depending on current weather
function pickBackground(weather) {
  if (weather.includes("cloud") == true) {
    weatherBody.classList.add("cloud");
    back.classList.add("cloud");
    icon.src="icons/clouds-white.png";
  }
  else if(weather.includes("sun") == true) {
    weatherBody.classList.add("sun");
    back.classList.add("sun");
    icon.src="icons/icons8-sun-white.png";
  }
  else if (weather.includes("rain") == true) {
    weatherBody.classList.add("rain");
    back.classList.add("sun");
    icon.src="icons/heavy-rain-white.png";
  }
  else if ((weather.includes("snow")) == true) {
    weatherBody.classList.add("snow");
    back.classList.add("snow");
    icon.src="icons/icons8-snow-white.png";
  }
  else if (weather.includes("clear") == true) {
    weatherBody.classList.add("clear");
    back.classList.add("clear");
    icon.src="icons/partly-cloudy-day-white.png";
  }
  else if (weather.includes("haze") == true) {
    weatherBody.classList.add("haze");
    back.classList.add("haze");
    icon.src="icons/icons8-haze-white.png";
  }
  else if (weather.includes("thunderstorm") == true) {
    weatherBody.classList.add("rain");
    back.classList.add("rain");
    icon.src="icons/cloud-lightning-white.png";
  }
  else if (weather.includes("drizzle") == true) {
    weatherBody.classList.add("rain");
    back.classList.add("rain");
    icon.src="icons/light-rain-white.png";
  }
  else if (weather.includes("mist") == true) {
    weatherBody.classList.add("rain");
    back.classList.add("rain");
    icon.src="icons/light-rain-white.png";
  }
}