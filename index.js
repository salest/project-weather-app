//Free API Key Weather API
const API_KEY = '41b9a18c71a64d95846141502232604';

async function getWeather(location) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}&aqi=yes
        `);
        if (response.status === 400) {
            //console.log('could not find city: ' + location);
            updateLocationName('Error', 'Could Not Find: ' + location);
            clearData();
        }
        else {
            const data = await response.json();
            return data;
        }

    }
    catch (e) {
        console.log(e);
    }
}



const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const location = searchForm.elements[0].value;
    const weatherData = await getWeather(location);
    if(weatherData){
        console.log(weatherData);
        updateLocationName(weatherData["location"]["name"], weatherData["location"]["country"]);
        updateLocalTime(weatherData);
        updateWeather(weatherData);
    }
    searchForm.reset();
});

function updateLocationName(cityName, countryName) {
    const city = document.getElementById("city-name");
    const country = document.getElementById("country-name");
    city.innerHTML = cityName;
    country.innerHTML = countryName;
}

function updateTime() {
    const time = document.getElementById('country-time');
    const today = new Date();
    const date = today.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});
    const now = date + " | " + today.getHours() + ":" + today.getMinutes();
    time.innerHTML = now;
}

function updateLocalTime(weatherData){
    const time = document.getElementById('country-time');
    const localTime = new Date(weatherData["location"]["localtime"]);
    const date = localTime.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});
    const now = date + " | " + localTime.getHours() + ":" + localTime.getMinutes();
    time.innerHTML = now;
}

function clearData(){
    const time = document.getElementById('country-time');
    const temp = document.getElementById("temperature");
    time.innerHTML = "";
    temp.innerHTML = "";
}

function updateWeather(weatherData){
    const temp = document.getElementById("temperature");
    const f = weatherData["current"]["temp_f"];
    const c = weatherData["current"]["temp_c"];
    temp.innerHTML = `${f}F | ${c}C`;
}

function updateCondition(weatherData){
    //const condition = document.getElementById("condition");
    const icon = document.getElementById("weather-icon");
    icon.src = weatherData["current"]["condition"]["icon"];
}

async function startUp() {
    //Set Default Location
    //Grab info for default location
    const weatherData = await getWeather('London');
    //Update Info on location
    updateLocationName(weatherData["location"]["name"], weatherData["location"]["country"]);
    updateTime();
    updateWeather(weatherData);
    updateCondition(weatherData);
}

startUp();