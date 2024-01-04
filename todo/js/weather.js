"use strict";

const API_KEY = "8e9220877c3c2baec33ccbf605141d1b";
const COORDS = "coords";

export function askForCoords() {
  navigator.geolocation.getCurrentPosition(
    this.handleGeoSucces,
    this.handleGeoError
  );
}

export function saveCoords(COORDS, coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
  showWeather();
}

function showWeather() {
  const loadedCoords = localStorage.getItem("coords");
  const parseCoords = JSON.parse(loadedCoords);

  getWeather(parseCoords.latitude, parseCoords.longitude);
}

export function getWeather(lat, long) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temperature = document.querySelector(".temperature");
      const weather = document.querySelector(".weahter");
      const img = document.createElement("img");
      const p = document.createElement("p");
      const h4 = document.createElement("h4");
      const todayTemp = json.main.temp;
      const place = json.name;
      const icon = json.weather[0].icon;
      const description = json.weather[0].description;

      temperature.innerText = `${todayTemp}℃`;
      weather.appendChild(h4);
      weather.appendChild(img);
      weather.appendChild(p);
      p.innerText = description;
      h4.innerText = place;
      img.src = `img/${icon}.png`;
    });
}

export function handleGeoSucces(position) {
  const COORDS = "coords";
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(COORDS, coordsObj);
}

export function handleGeoError(position) {
  console.log("can't access geo location");
}

