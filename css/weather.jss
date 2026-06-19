async function getWeather(){

    const city = document.getElementById("cityInput").value.trim();
    const result = document.getElementById("weatherResult");

    if(city === ""){
        result.innerHTML = "<p class='error'>Please enter a city name.</p>";
        return;
    }

    try{

        result.innerHTML = "<p>Loading weather...</p>";

        const geoResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
        );

        if(!geoResponse.ok){
            throw new Error("Failed to fetch city data");
        }

        const geoData = await geoResponse.json();

        if(!geoData.results){
            throw new Error("City not found");
        }

        const latitude = geoData.results[0].latitude;
        const longitude = geoData.results[0].longitude;
        const cityName = geoData.results[0].name;
        const country = geoData.results[0].country;

        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`
        );

        if(!weatherResponse.ok){
            throw new Error("Weather service unavailable");
        }

        const weatherData = await weatherResponse.json();

        const temperature =
            weatherData.current.temperature_2m;

        const humidity =
            weatherData.current.relative_humidity_2m;

        const wind =
            weatherData.current.wind_speed_10m;

        result.innerHTML = `
            <h2>${cityName}, ${country}</h2>
            <p><strong>Temperature:</strong> ${temperature}°C</p>
            <p><strong>Humidity:</strong> ${humidity}%</p>
            <p><strong>Wind Speed:</strong> ${wind} km/h</p>
        `;

    }
    catch(error){

        result.innerHTML = `
            <p class="error">${error.message}</p>
        `;
    }
}