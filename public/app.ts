document.getElementById("search-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const cityName = (document.getElementById("cityName") as HTMLInputElement).value;
    try {
        const response = await fetch('/weather', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({cityName})
        });
        if (!response.ok) {
            throw new Error('Fehler beim Abrufen der Wetterdaten. Statuscode: ' + response.status);
        }
        const {weatherData, forecastData} = await response.json();
        displayWeather(weatherData, forecastData);
    } catch (error) {
        console.error('Es ist ein Fehler aufgetreten:', error);
        displayWeatherError();
    }
});

const weatherDisplayError = document.getElementById('weatherDisplayError');


function displayWeather(weatherData: any, forecastData: any) {
    const weatherDisplay = document.getElementById('weatherDisplay');

    weatherDisplayError.innerHTML = ``;

    if (weatherDisplay) {
        weatherDisplay.innerHTML = `
            <h2>Aktuelles Wetter in ${weatherData.name}, ${weatherData.sys.country}</h2>
            <p>${getCurrentTime(weatherData.timezone)}</p>
            <div class="d-flex justify-content-center align-items-center">
                        <img src="http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png" alt="Wettericon">
                        <h1>${weatherData.main.temp.toFixed(1)}°C</h1>
            </div>
            <div class="d-flex justify-content-around">
            <p>Luftfeuchtigkeit: ${weatherData.main.humidity}%</p>
            <p>Luftfdruck: ${weatherData.main.pressure}hPa</p>
            <p>Gefühlte Temp.: ${weatherData.main.feels_like.toFixed(1)}°C</p>
            </div>
            <h3 class="mt-4">Wettervorhersage für die nächsten Stunden:</h3>
            <div class="row g-4 text-center">
                ${forecastData.list.slice(0, 7).map(forecast => `
                    <div class="forecast col">
                        <div class="forcast-hr-element">
                            <div class="bg-transparent">
                                <p class="card-text">${formatTime(forecast.dt_txt)}</p>
                                <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" alt="Wettericon">
                                <p class="card-text">${forecast.main.temp.toFixed(1)}°C</p>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        // Weitere Anzeigeoptionen für Wetterdaten und Wettervorhersage hier hinzufügen
    }
}

function displayWeatherError() {
    weatherDisplayError.innerHTML = `<div class="alert alert-danger" role="alert">
    Bitte Überprüfe den gesuchten ort in der Eingabe auf Richtigkeit!
    </div>`;

}

// Funktion zur Formatierung des Datums im europäischen Format und Anzeige des Wochentags
function formatDate(dateString: string): string {
    const date = new Date(dateString.replace(/-/g, '/'));
    const options = {weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric'};
    return date.toLocaleDateString('de-DE').replace(/,/g, '');
}

// Funktion zur Formatierung der Uhrzeit
function formatTime(dateString: string): string {
    const date = new Date(dateString.replace(/-/g, '/'));
    return date.toLocaleTimeString('de-DE', {hour: '2-digit', minute: '2-digit'});
}

// Funktion zur Formatierung der Uhrzeit aus Unix-Zeitstempel
function formatTimeFromUnix(unixTime: number, timezoneOffset: number): string {
    const date = new Date((unixTime + timezoneOffset) * 1000);
    return date.toLocaleTimeString('de-DE', {hour: '2-digit', minute: '2-digit'});
}

// Funktion zur Anzeige der aktuellen Uhrzeit für den angegebenen Ort
function getCurrentTime(timezoneOffset: number): string {
    const now = new Date();
    const localTime = now.getTime() + (now.getTimezoneOffset() * 60000); // In Minuten
    const targetTime = localTime + (timezoneOffset * 1000); // In Sekunden
    const targetDate = new Date(targetTime);
    const hours = targetDate.getHours().toString().padStart(2, '0');
    const minutes = targetDate.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}
