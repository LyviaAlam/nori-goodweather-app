function updateNoriWeather(noriResponse) {
  let noriMainTemp = document.querySelector("#nori-main-number");
  let temperature = noriResponse.data.temperature.current;
  let cityInput = document.querySelector("#nori-main-city");
  let noriCondition = document.querySelector("#nori-weather-condition");
  let noriWind = document.querySelector("#nori-wind");
  let noriHumidity = document.querySelector("#nori-humidity");
  let noriTime = document.querySelector("#nori-time");
  let updateDate = new Date(noriResponse.data.time * 1000);
  let noriIcon = document.querySelector("#nori-main-icon");

  cityInput.innerHTML = noriResponse.data.city;
  noriMainTemp.innerHTML = Math.round(temperature);
  noriCondition.innerHTML = noriResponse.data.condition.description;
  noriWind.innerHTML = `${noriResponse.data.wind.speed}km/h`;
  noriHumidity.innerHTML = `${noriResponse.data.temperature.humidity}%`;
  noriTime.innerHTML = formatDate(updateDate);
  noriIcon.innerHTML = `<img src="${noriResponse.data.condition.icon_url}"/>`;

  apiForecast(noriResponse.data.city);
}

function formatDate(updateDate) {
  let hours = updateDate.getHours();
  let minutes = updateDate.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[updateDate.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function noriSearchCity(noriCity) {
  let apiKey = "143af7fd5b08cab06a8bf5bo4f3btde9";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${noriCity}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateNoriWeather);
}

function noriHandleSearch(event) {
  event.preventDefault();
  let noriInput = document.querySelector("#nori-search-form");

  noriSearchCity(noriInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function apiForecast(forecastCity) {
  let apiKey = "143af7fd5b08cab06a8bf5bo4f3btde9";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${forecastCity}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateForecast);
}

function updateForecast(forecastResponse) {
  let forecastAdd = "";

  forecastResponse.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastAdd =
        forecastAdd +
        `<div class="nori-forecast-container">
    <div class="nori-forecast-day">${formatDay(day.time)}</div>
    <div class="nori-forecast-icon"><img src="${day.condition.icon_url}"/></div>
    <div class="nori-forecast-temp">
      <span class="nori-forecast-temp-max">${Math.round(
        day.temperature.maximum
      )}°</span>
      <span>|</span>
      <span class="nori-forecast-temp-min"> ${Math.round(
        day.temperature.minimum
      )}°</span>
    </div>
  </div>`;
    }
  });

  let forecastContent = document.querySelector("#nori-forecast");
  forecastContent.innerHTML = forecastAdd;
}

let noriSearch = document.querySelector("#nori-search");
noriSearch.addEventListener("submit", noriHandleSearch);

noriSearchCity("Sydney");
updateForecast();
