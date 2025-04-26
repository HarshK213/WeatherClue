let City_searched = document.getElementById('city_name');
let City = document.getElementById('city');
let temperature = document.getElementById('temp');
let humidity = document.getElementById('humidity_measure');
let wind_speed = document.getElementById('wind_measure');
let visibility = document.getElementById('visiblity_measure');
let pressure = document.getElementById('pressure_measure');
let sun_rise = document.getElementById('sunrise_time');
let sun_set = document.getElementById('sunset_time');
let type = document.getElementById('weather_type')
let type_img = document.getElementById('weather_img')

console.log(type_img.src)

const APIurl = `https://api.openweathermap.org/data/2.5/weather?units=metric&`;

async function checkWeather(cityName = 'delhi') {
    try {
        const response = await fetch(APIurl + `q=${cityName}` + `&appid=${WEATHER_API_KEY}`);
        const data = await response.json();
        
        if (data.cod !== 200) {
            alert(`Error: ${data.message}`);
            return;
        }
        console.log(data)
        City.innerHTML = cityName.charAt(0).toUpperCase() + cityName.slice(1);
        temperature.innerHTML = Math.round(data.main.temp) + '\u00B0C';
        humidity.innerHTML = data.main.humidity + "%";
        wind_speed.innerHTML = data.wind.speed + " km/h";
        visibility.innerHTML = data.visibility / 1000 + " km";
        pressure.innerHTML = data.main.pressure + " mb";
        sun_rise.innerHTML = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
        sun_set.innerHTML = new Date(data.sys.sunset * 1000).toLocaleTimeString();
        type.innerHTML = data.weather[0].main

        switch (data.weather[0].main){
            case 'Fog':
                type_img.src = "https://img.icons8.com/?size=100&id=7tEHHH5dn7A3&format=png&color=000000"
                break
            case 'Thunderstorm':
                type_img.src = "https://img.icons8.com/?size=100&id=nF3NFRL83XtT&format=png&color=000000"
                break
            case 'Rain':
                type_img.src = "https://img.icons8.com/?size=100&id=kKxyuLXD4w0n&format=png&color=000000"
                break
            case 'Snow':
                type_img.src = "https://img.icons8.com/?size=100&id=cyZConbteZk9&format=png&color=000000"
                break
            case 'Clear':
                type_img.src = "https://img.icons8.com/?size=100&id=OFU5h8HeWK3z&format=png&color=000000"
                break
            case 'Clouds':
                type_img.src = "https://img.icons8.com/?size=100&id=W8fUZZSmXssu&format=png&color=000000"
                break
            case 'Haze':
                type_img.src = "https://img.icons8.com/?size=100&id=IL2szZWdo0Bo&format=png&color=000000"
                break
            case 'Dust':
                type_img.src = "https://img.icons8.com/?size=100&id=NjsqgHjrCASE&format=png&color=000000"
                break
            case 'Smoke':
                type_img.src = "https://cdn-icons-png.flaticon.com/512/7144/7144104.png"
        }

    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Failed to fetch weather data. Please try again later.");
    }
}

document.querySelector('button').addEventListener('click', function () {
    const newCity = City_searched.value.trim();
    if (newCity) {
        checkWeather(newCity);
    } else {
        alert("Please enter a city name.");
    }
});

City_searched.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        const newCity = City_searched.value.trim();
        if (newCity) {
            checkWeather(newCity);
        } else {
            alert("Please enter a city name.");
        }
    }
});

window.onload = function () {
    checkWeather('delhi');
};
