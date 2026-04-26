const apikey = "4ec24b395d37b2d8f9b396b252f3a392";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weathericon = document.querySelector(".weather-icon");

async function checkweather(city) {
    const response = await fetch(apiurl + city + `&appid=${apikey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        return;
    }

    const data = await response.json();
    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    const condition = data.weather[0].main;

    // 🔥 FIXED ICON LOGIC
    if (condition === "Clouds") {
        weathericon.src = "./Assets/cloud.png";
    } 
    else if (condition === "Clear") {
        weathericon.src = "./Assets/clear.png";
    }
    else if (condition === "Rain") {
        weathericon.src = "./Assets/rain.png";
    }
    else if (condition === "Drizzle") {
        weathericon.src = "./Assets/drizzle.png";
    }
    else if (condition === "Mist" || condition === "Haze" || condition === "Smoke") {
        weathericon.src = "./Assets/mist.png";
    }
    else if (condition === "Snow") {
        weathericon.src = "./Assets/snow.png";
    }
    else {
        weathericon.src = "./Assets/clear.png"; // fallback
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
}

// 🔍 click event
searchbtn.addEventListener("click", () => {
    checkweather(searchbox.value);
});

// 🔥 Enter key support
searchbox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        checkweather(searchbox.value);
    }
});