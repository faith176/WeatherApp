
//Get form and add event listener for submission
const input = document.querySelector('#city');
const submit = document.querySelector('#submit');

//get entire beginning form and ending form
const search = document.querySelector("#top");
const weatherDisplay = document.querySelector("#weather");

//get weather display elements
const icon = document.querySelector("#img-icon");
const tempVal = document.querySelector("#temp-value");
const des = document.querySelector("#description");
const loc = document.querySelector("#location");

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
  show();
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
    //retrives all the relevant data
    weather.temperature = Math.floor(data.main.temp - Kelvin);
    weather.description = data.weather[0].description;
    weather.iconId = data.weather[0].icon;
    weather.city = data.name;
    weather.country = data.sys.country;
  })
  .then(function(){
      displayWeather();
  });
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


  
  //gets the icons from the website
  icon.src = `http://openweathermap.org/img/wn/${weather.iconId}.png`;
  tempVal.innerHTML = weather.temperature+ "°C";
  des.innerHTML = weather.description;
}

function pickIcon() {

}

function pickBackground() {

}

function getLocalTime(data) {
  let date = new Date();
  let time = date.getTime();
  let localOffset = date.getTimezoneOffset() * 60000;
  let utc = time + localOffset;
  let localTime = utc + 1000 * data;
  let localTimeDate = new Date(localTime);
  return localTimeDate.toLocaleString();
}
