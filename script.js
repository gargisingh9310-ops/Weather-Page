const apiKey = "4ec24b395d37b2d8f9b396b252f3a392";

const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

let clockInterval;

// ================= WEATHER FUNCTION =================

async function checkWeather(city) {
  try {
    const response = await fetch(
      `${apiUrl}${city}&appid=${apiKey}`
    );

    const data = await response.json();

    console.log(data);

    // Invalid city
    if (response.status === 404 || data.cod === "404") {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
      return;
    }

    // Hide error
    document.querySelector(".error").style.display = "none";
    document.querySelector(".weather").style.display = "block";

    // Temperature
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";

    // City
    document.querySelector(".city").innerHTML =
      data.name;

    // Humidity
    document.querySelector(".humidity").innerHTML =
      data.main.humidity + "%";

    // Wind
    document.querySelector(".wind").innerHTML =
      Math.round(data.wind.speed) + " km/h";

    // Pressure
    document.querySelector(".pressure").innerHTML =
      data.main.pressure + " hPa";

    // Sunrise
    const sunrise = new Date(
      (data.sys.sunrise + data.timezone) * 1000
    );

    document.querySelector(".sunrise").innerHTML =
      `🌅 Sunrise: ${sunrise.toUTCString().slice(17, 22)}`;

    // Sunset
    const sunset = new Date(
      (data.sys.sunset + data.timezone) * 1000
    );

    document.querySelector(".sunset").innerHTML =
      `🌇 Sunset: ${sunset.toUTCString().slice(17, 22)}`;

    // Start Live Clock
    startLiveClock(data.timezone);

    // Weather Icon
    const condition = data.weather[0].main;

    if (condition === "Clouds") {
      weatherIcon.src = "Assets/cloud.png";
    }
    else if (condition === "Clear") {
      weatherIcon.src = "Assets/clear.png";
    }
    else if (condition === "Rain") {
      weatherIcon.src = "Assets/rain.png";
    }
    else if (condition === "Drizzle") {
      weatherIcon.src = "Assets/drizzle.png";
    }
    else if (
      condition === "Mist" ||
      condition === "Haze" ||
      condition === "Smoke"
    ) {
      weatherIcon.src = "Assets/mist.png";
    }
    else if (condition === "Snow") {
      weatherIcon.src = "Assets/snow.png";
    }
    else {
      weatherIcon.src = "Assets/clear.png";
    }

  } catch (error) {
    console.log(error);

    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  }
}

// ================= LIVE CLOCK =================

function startLiveClock(timezoneOffset) {

  // old interval remove
  if (clockInterval) {
    clearInterval(clockInterval);
  }

  function updateClock() {

    const now = new Date();

    const utc =
      now.getTime() +
      now.getTimezoneOffset() * 60000;

    const cityTime = new Date(
      utc + timezoneOffset * 1000
    );

    const timeString =
      cityTime.toLocaleTimeString(
        "en-US",
        {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }
      );

    document.querySelector(".time").innerHTML =
      timeString;
  }

  updateClock();

  clockInterval = setInterval(
    updateClock,
    1000
  );
}

// ================= SEARCH BUTTON =================

searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim();

  if (city !== "") {
    checkWeather(city);
  }
});

// ================= ENTER KEY =================

searchBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const city = searchBox.value.trim();

    if (city !== "") {
      checkWeather(city);
    }
  }
});

// ================= DEFAULT CITY =================

checkWeather("Delhi");