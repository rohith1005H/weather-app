const apiKey = "c9d45256816e635b59451469f30154ee";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

async function fetchWeather(location) {
  try {
    document.getElementById("loading").style.display = "block";
    const response = await fetch(`${apiUrl}?q=${location}&appid=${apiKey}`);
    const data = await response.json();
    document.getElementById("loading").style.display = "none";
    console.log(data);
    const processedData = processWeatherData(data);
    displayWeather(processedData);
  } catch (error) {
    document.getElementById("loading").style.display = "none";
    console.error("Error fetching weather data:", error);
  }
}

function processWeatherData(data) {
  return {
    location: data.name,
    temperature: (data.main.temp - 273.15).toFixed(2),
    description: data.weather[0].description,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
  };
}

function displayWeather(data) {
  const weatherResult = document.getElementById("weather-result");
  weatherResult.innerHTML = `
        <h2>Weather in ${data.location}</h2>
        <p>Temperature: ${data.temperature} °C</p>
        <p>Description: ${data.description}</p>
        <p>Humidity: ${data.humidity}%</p>
        <p>Wind Speed: ${data.windSpeed} m/s</p>
    `;
}

document
  .getElementById("location-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const location = document.getElementById("location").value;
    fetchWeather(location);
  });
