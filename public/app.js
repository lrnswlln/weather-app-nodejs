var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a;
var _this = this;
(_a = document.getElementById("search-form")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", function (event) { return __awaiter(_this, void 0, void 0, function () {
    var cityName, response, _a, weatherData, forecastData, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                event.preventDefault();
                cityName = document.getElementById("cityName").value;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, fetch('/weather', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ cityName: cityName })
                    })];
            case 2:
                response = _b.sent();
                if (!response.ok) {
                    throw new Error('Fehler beim Abrufen der Wetterdaten. Statuscode: ' + response.status);
                }
                return [4 /*yield*/, response.json()];
            case 3:
                _a = _b.sent(), weatherData = _a.weatherData, forecastData = _a.forecastData;
                displayWeather(weatherData, forecastData);
                return [3 /*break*/, 5];
            case 4:
                error_1 = _b.sent();
                console.error('Es ist ein Fehler aufgetreten:', error_1);
                displayWeatherError();
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
var weatherDisplayError = document.getElementById('weatherDisplayError');
function displayWeather(weatherData, forecastData) {
    var weatherDisplay = document.getElementById('weatherDisplay');
    var weatherInformationBox = document.getElementById('weather-information-box');
    weatherInformationBox.classList.remove("d-none");
    weatherDisplayError.innerHTML = "";
    if (weatherDisplay) {
        console.log(weatherData.timezone);
        weatherDisplay.innerHTML = "\n            <h2>".concat(weatherData.name, ", ").concat(weatherData.sys.country, "</h2>\n            <p class=\"mb-0\">").concat(getCurrentTime(weatherData.timezone), "</p>\n            <div class=\"d-flex justify-content-center align-items-center\">\n                        <img src=\"http://openweathermap.org/img/wn/").concat(weatherData.weather[0].icon, "@4x.png\" alt=\"Wettericon\">\n                        <h1>").concat(weatherData.main.temp.toFixed(1), "\u00B0C</h1>\n            </div>\n            <div class=\"sun-time d-flex justify-content-evenly border-bottom border-dark-subtle\">\n            <div class=\"sunrise d-flex flex-column align-self-end\">\n            <i class=\"bi bi-sunrise\" style=\"font-size: 2rem;\"></i>  \n            <p class=\"mb-0\">").concat(formatTimeFromUnix(weatherData.sys.sunrise, weatherData.timezone), "</p>\n            </div>\n                       <img class=\"sun-circle\" src=\"assets/media/img/line-circle.svg\">\n\n            <div class=\"sunset d-flex flex-column align-self-end\">\n            <i class=\"bi bi-sunset\" style=\"font-size: 2rem;\"></i>\n            <p class=\"mb-0\">").concat(formatTimeFromUnix(weatherData.sys.sunset, weatherData.timezone), "</p>\n            </div>\n            \n            </div>\n            <div class=\"d-flex justify-content-around my-3 border-bottom border-dark-subtle\">\n                <p>").concat(weatherData.main.humidity, "%<br><span class=\"fw-light fs-6 text-black-50\">Luftfeuchtigkeit</span> </p>\n                <p>").concat(weatherData.main.pressure, "hPa<br><span class=\"fw-light fs-6 text-black-50\">Luftfdruck</span></p>\n                <p>").concat(weatherData.main.feels_like.toFixed(1), "\u00B0C<br><span class=\"fw-light fs-6 text-black-50\">Gef\u00FChlte Temp.</span></p>\n            </div>\n            <h5 class=\"mt-5\">Wettervorhersage f\u00FCr die n\u00E4chsten Stunden:</h5>\n            <div class=\"row g-4 text-center mx-lg-5 mx-0\">\n                ").concat(forecastData.list.slice(0, 7).map(function (forecast) { return "\n                    <div class=\"forecast col\">\n                        <div class=\"forcast-hr-elemen p-3\">\n                            <div class=\"bg-transparent\">\n                                <p class=\"mb-0\">".concat(formatTime(forecast.dt_txt), "</p>\n                                <img src=\"http://openweathermap.org/img/wn/").concat(forecast.weather[0].icon, ".png\" alt=\"Wettericon\">\n                                <p class=\"card-text\">").concat(forecast.main.temp.toFixed(1), "\u00B0C</p>\n                            </div>\n                        </div>\n                    </div>\n                "); }).join(''), "\n            </div>\n        ");
    }
}
function displayWeatherError() {
    weatherDisplayError.innerHTML = "<div class=\"alert alert-danger\" role=\"alert\">\n    Bitte \u00DCberpr\u00FCfe den gesuchten ort in der Eingabe auf Richtigkeit!\n    </div>";
}
// Formatierung des Datums im europäischen Format
function formatDate(dateString) {
    var date = new Date(dateString.replace(/-/g, '/'));
    var options = { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('de-DE').replace(/,/g, '');
}
// Formatierung der Uhrzeit
function formatTime(dateString) {
    var date = new Date(dateString.replace(/-/g, '/'));
    return date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
}
// Formatierung der Uhrzeit aus dem Unix-Zeitstempel
function formatTimeFromUnix(unixTime, timezoneOffset) {
    var date = new Date((unixTime + timezoneOffset - 7200) * 1000);
    return date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
}
// Anzeige der aktuellen Uhrzeit für den angegebenen Ort
function getCurrentTime(timezoneOffset) {
    var now = new Date();
    var localTime = now.getTime() + (now.getTimezoneOffset() * 60000); // In Minuten
    var targetTime = localTime + (timezoneOffset * 1000); // In Sekunden
    var targetDate = new Date(targetTime);
    var hours = targetDate.getHours().toString().padStart(2, '0');
    var minutes = targetDate.getMinutes().toString().padStart(2, '0');
    return "".concat(hours, ":").concat(minutes);
}
