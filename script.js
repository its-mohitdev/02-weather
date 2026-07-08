document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherButton = document.getElementById("get-weather-btn");
  const displayWeatherInfo = document.getElementById("weather-info");
  const displayCityName = document.getElementById("city-name");
  const displayTemperature = document.getElementById("temperature");
  const displayDescription = document.getElementById("description");
  const displayError = document.getElementById("error-message");
  const API_KEY = "c6457b1da581d367793cdeacebc9a0c1";

  getWeatherButton.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return;

    //it may show error
    //it take some time

    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      showError();
    }
  });

  async function fetchWeatherData(city) {
    //gets the data

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url); //it return a promise
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    return data;

    //just using .then.catch --> nothing to worry it excactly the same.
    // response.then(res => res.json())
    // .then(data => console.log(data))
    // .catch(err => console.log(err));
  }

  function displayWeatherData(data) {
    console.log(data);

    //display data
    const {name, main, weather} = data;
    displayCityName.textContent = name;
    displayTemperature.textContent = `Temperature : ${main.temp}`;
    displayDescription.textContent = `Weather : ${weather[0].description}`;

    //unlock the display (class = hidden )
    displayWeatherInfo.classList.remove("hidden");
    displayError.classList.add("hidden");
  }

  function showError() {
    displayWeatherInfo.classList.add("hidden");
    displayError.classList.remove("hidden");
  }
});
