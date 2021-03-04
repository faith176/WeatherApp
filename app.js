
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


//keeps track of important data values
const weather = {};

//store api key
const apiKey = "242e7e5620f9b0e2bad6976201a676b3";

//adds an event listener for when the submit button is clicked
submit.addEventListener('click', function () {
  let cityValue = input.value;
  console.log(cityValue);
  findWeather(cityValue);
});


//Can see the example data from here 
//http://api.openweathermap.org/data/2.5/weather?q=calgary&appid=242e7e5620f9b0e2bad6976201a676b3


function findWeather(location) {
  //constructs api url
  const api = ("http://api.openweathermap.org/data/2.5/weather?q=" +location +"&appid="+apiKey);
  fetch(api)
  .then(function(response){
      let data = response.json();
      return data;
  })
  .then(function(data){
    //retrives all the relevant data
    weather.temperature = Math.floor(data.main.temp - 273);
    weather.description = data.weather[0].description;
    weather.iconId = data.weather[0].icon;
    weather.city = data.name;
    weather.country = data.sys.country;
  })
  .then(function(){
      displayWeather();
  });
}

//hides the search bar
function hide() {
  search.style.display = "none";
  console.log("hiding search bar");

  weatherDisplay.style.display = "block";
  console.log("showing weather display");
}

//shows the search bar
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
  // icon.scr = "icons/clouds-50.png";
  tempVal.innerHTML = weather.temperature+ "°C";
  des.innerHTML = weather.description;
  loc.innerHTML = weather.city +", " + weather.country;
}

