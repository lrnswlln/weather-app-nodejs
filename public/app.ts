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
    const weatherInformationBox = document.getElementById('weather-information-box');

    weatherInformationBox.classList.remove("d-none");

    weatherDisplayError.innerHTML = ``;

    if (weatherDisplay) {
        console.log(weatherData.timezone);
        weatherDisplay.innerHTML = `
            <h2>${weatherData.name}, ${weatherData.sys.country}</h2>
            <p class="mb-0">${getCurrentTime(weatherData.timezone)}</p>
            <div class="d-flex justify-content-center align-items-center">
                        <img src="http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png" alt="Wettericon">
                        <h1>${weatherData.main.temp.toFixed(1)}°C</h1>
            </div>
            <div class="sun-time d-flex justify-content-evenly border-bottom border-dark-subtle">
            <div class="sunrise d-flex flex-column align-self-end">
            <i class="bi bi-sunrise" style="font-size: 2rem;"></i>  
            <p class="mb-0">${formatTimeFromUnix(weatherData.sys.sunrise, weatherData.timezone)}</p>
            </div>
                       <img class="sun-circle" src="assets/media/img/line-circle.svg">

            <div class="sunset d-flex flex-column align-self-end">
            <i class="bi bi-sunset" style="font-size: 2rem;"></i>
            <p class="mb-0">${formatTimeFromUnix(weatherData.sys.sunset, weatherData.timezone)}</p>
            </div>
            
            </div>
            <div class="d-flex justify-content-around my-3 border-bottom border-dark-subtle">
                <p>${weatherData.main.humidity}%<br><span class="fw-light fs-6 text-black-50">Luftfeuchtigkeit</span> </p>
                <p>${weatherData.main.pressure}hPa<br><span class="fw-light fs-6 text-black-50">Luftfdruck</span></p>
                <p>${weatherData.main.feels_like.toFixed(1)}°C<br><span class="fw-light fs-6 text-black-50">Gefühlte Temp.</span></p>
            </div>
            <h5 class="mt-5">Wettervorhersage für die nächsten Stunden:</h5>
            <div class="row g-4 text-center mx-lg-5 mx-0">
                ${forecastData.list.slice(0, 7).map(forecast => `
                    <div class="forecast col">
                        <div class="forcast-hr-elemen p-3">
                            <div class="bg-transparent">
                                <p class="mb-0">${formatTime(forecast.dt_txt)}</p>
                                <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" alt="Wettericon">
                                <p class="card-text">${forecast.main.temp.toFixed(1)}°C</p>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
}

function displayWeatherError() {
    weatherDisplayError.innerHTML = `<div class="alert alert-danger" role="alert">
    Bitte Überprüfe den gesuchten ort in der Eingabe auf Richtigkeit!
    </div>`;

}

// Formatierung des Datums im europäischen Format
function formatDate(dateString: string): string {
    const date = new Date(dateString.replace(/-/g, '/'));
    const options = {weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric'};
    return date.toLocaleDateString('de-DE').replace(/,/g, '');
}

// Formatierung der Uhrzeit
function formatTime(dateString: string): string {
    const date = new Date(dateString.replace(/-/g, '/'));
    return date.toLocaleTimeString('de-DE', {hour: '2-digit', minute: '2-digit'});
}

// Formatierung der Uhrzeit aus dem Unix-Zeitstempel
function formatTimeFromUnix(unixTime: number, timezoneOffset: number): string {
    const date = new Date((unixTime + timezoneOffset - 7200) * 1000);
    return date.toLocaleTimeString('de-DE', {hour: '2-digit', minute: '2-digit'});
}

// Anzeige der aktuellen Uhrzeit für den angegebenen Ort
function getCurrentTime(timezoneOffset: number): string {
    const now = new Date();
    const localTime = now.getTime() + (now.getTimezoneOffset() * 60000); // In Minuten
    const targetTime = localTime + (timezoneOffset * 1000); // In Sekunden
    const targetDate = new Date(targetTime);
    const hours = targetDate.getHours().toString().padStart(2, '0');
    const minutes = targetDate.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}
