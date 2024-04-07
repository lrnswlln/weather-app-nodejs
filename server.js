const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

const WeatherData = {
    main: {
        temp: 0,
        feels_like: 0,
        humidity: 0,
        pressure: 0
    },
    weather: [{
        main: "",
        icon: ""
    }],
    name: "",
    timezone: 0,
    sys: {
        country: "",
        sunrise: 0,
        sunset: 0
    }
};

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/weather', async (req, res) => {
    try {
        const { cityName } = req.body;
        const apiKey = '7b7466fa55b6b1ad97d9d04279507427';

        const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
        const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;

        // Dynamischer Import von node-fetch
        const fetch = (await import('node-fetch')).default;

        const [weatherResponse, forecastResponse] = await Promise.all([
            fetch(weatherApiUrl),
            fetch(forecastApiUrl)
        ]);

        if (!weatherResponse.ok) {
            throw new Error('Fehler beim Abrufen der Wetterdaten. Statuscode: ' + weatherResponse.status);
        }

        if (!forecastResponse.ok) {
            throw new Error('Fehler beim Abrufen der Wettervorhersage. Statuscode: ' + forecastResponse.status);
        }

        const [weatherData, forecastData] = await Promise.all([
            weatherResponse.json(),
            forecastResponse.json()
        ]);

        console.log(weatherData);

        res.send({ weatherData, forecastData });
    } catch (error) {
        console.error('Es ist ein Fehler aufgetreten:', error);
        res.status(500).send('Es ist ein Fehler aufgetreten.');
    }
});

app.listen(port, () => {
    console.log(`Server läuft unter http://localhost:${port}`);
});
