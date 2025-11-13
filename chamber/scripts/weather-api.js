const weatherIcon = document.querySelector("#weather-icon");
const myTown = document.querySelector("#name");
const currentWeather = document.querySelector("#current-weather");
const weatherDesc = document.querySelector("#weather-description");
const highTemp = document.querySelector("#high-weather");
const lowTemp = document.querySelector("#low-weather");
const humidity = document.querySelector("#humidity");
const sunrise = document.querySelector("#sunrise");
const sunset = document.querySelector("#sunset");

const f1 = document.querySelector("#forecast-1day");
const f2 = document.querySelector("#forecast-2day");
const f3 = document.querySelector("#forecast-3day");

const myKey = "89d3970770afa2401b20d07cb79267c8";
const myLat = "15.834166836101154";
const myLong = "-96.31944790002403";

const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=metric`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=metric`;

// Current Weather
async function fetchWeather() {
    try {
        const response = await fetch(weatherURL);
        if (!response.ok) throw Error(await response.text());
        const data = await response.json();
        displayCurrent(data);
    } catch (error) {
        console.log("Error weather:", error);
    }
}

function displayCurrent(data) {
    const iconSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    weatherIcon.src = iconSrc;
    weatherIcon.alt = data.weather[0].description;

    myTown.textContent = data.name;
    currentWeather.textContent = `${data.main.temp.toFixed(0)}° C`;
    weatherDesc.textContent = data.weather[0].description;
    highTemp.textContent = `High: ${data.main.temp_max.toFixed(0)}° C`;
    lowTemp.textContent = `Low: ${data.main.temp_min.toFixed(0)}° C`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;

    sunrise.textContent = `Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
    sunset.textContent = `Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
}

// Weather Forecast
async function fetchForecast() {
    try {
        const response = await fetch(forecastURL);
        if (!response.ok) throw Error(await response.text());
        const data = await response.json();
        displayForecast(data);
    } catch (error) {
        console.log(error);
    }
}

function displayForecast(data) {
    const daily = data.list.filter(item => item.dt_txt.includes("12:00:00"));

    f1.textContent = formatForecast(daily[0]);
    f2.textContent = formatForecast(daily[1]);
    f3.textContent = formatForecast(daily[2]);
}

function formatForecast(dayData) {
    const date = new Date(dayData.dt * 1000).toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "short"
    });

    const temp = dayData.main.temp.toFixed(0);
    const desc = dayData.weather[0].description;

    return `${date}: ${temp}°C - ${desc}`;
}

fetchWeather();
fetchForecast();
