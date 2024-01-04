function noriHandleSearch(event) {
  event.preventDefault();
  let noriInput = document.querySelector("#nori-search-form");
  let cityInput = document.querySelector("#nori-main-city");
  cityInput.innerHTML = noriInput.value;
}

let noriSearch = document.querySelector("#nori-search");
noriSearch.addEventListener("submit", noriHandleSearch);
