function updateNoriWeather(noriResponse) {
  let noriMainTemp = document.querySelector("#nori-main-number");
  let temperature = noriResponse.data.temperature.current;
  let cityInput = document.querySelector("#nori-main-city");

  cityInput.innerHTML = noriResponse.data.city;
  noriMainTemp.innerHTML = Math.round(temperature);
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

let noriSearch = document.querySelector("#nori-search");
noriSearch.addEventListener("submit", noriHandleSearch);

noriSearchCity("Sydney");
