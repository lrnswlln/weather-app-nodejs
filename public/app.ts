document.getElementById("search-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const cityName = (document.getElementById("cityName") as HTMLInputElement).value;
    try {
        const response = await fetch('/weather', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cityName })
        });
        if (!response.ok) {
            throw new Error('Fehler beim Abrufen der Wetterdaten. Statuscode: ' + response.status);
        }
        const { weatherData, forecastData } = await response.json();
        displayWeather(weatherData, forecastData);
    } catch (error) {
        console.error('Es ist ein Fehler aufgetreten:', error);
        displayWeatherError();
    }
});

function displayWeather(weatherData: any, forecastData: any) {
    const weatherDisplay = document.getElementById('weatherDisplay');
    if (weatherDisplay) {
        weatherDisplay.innerHTML = `
            <h2>Aktuelles Wetter in ${weatherData.name}, ${weatherData.sys.country}</h2>
            <p>${weatherData.weather[0].main}</p>
            <p>Temperatur: ${weatherData.main.temp.toFixed(1)}°C</p>
            <p>Luftfeuchtigkeit: ${weatherData.main.humidity}%</p>
            <p>Luftfdruck: ${weatherData.main.pressure}hPa</p>
            <p>Gefühlte Temp.: ${weatherData.main.feels_like.toFixed(1)}°C</p>
        `;
        // Weitere Anzeigeoptionen für Wetterdaten und Wettervorhersage hier hinzufügen
    }
}

function displayWeatherError() {
    const weatherDisplayError = document.getElementById('weatherDisplayError');
    if (weatherDisplayError) {
        weatherDisplayError.innerHTML = `<div class="alert alert-danger" role="alert">
            Bitte Überprüfe den gesuchten Ort in der Eingabe auf Richtigkeit!
        </div>`;
    }
}
