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
function displayWeather(weatherData, forecastData) {
    var weatherDisplay = document.getElementById('weatherDisplay');
    if (weatherDisplay) {
        weatherDisplay.innerHTML = "\n            <h2>Aktuelles Wetter in ".concat(weatherData.name, ", ").concat(weatherData.sys.country, "</h2>\n            <p>").concat(weatherData.weather[0].main, "</p>\n            <p>Temperatur: ").concat(weatherData.main.temp.toFixed(1), "\u00B0C</p>\n            <p>Luftfeuchtigkeit: ").concat(weatherData.main.humidity, "%</p>\n            <p>Luftfdruck: ").concat(weatherData.main.pressure, "hPa</p>\n            <p>Gef\u00FChlte Temp.: ").concat(weatherData.main.feels_like.toFixed(1), "\u00B0C</p>\n        ");
        // Weitere Anzeigeoptionen für Wetterdaten und Wettervorhersage hier hinzufügen
    }
}
function displayWeatherError() {
    var weatherDisplayError = document.getElementById('weatherDisplayError');
    if (weatherDisplayError) {
        weatherDisplayError.innerHTML = "<div class=\"alert alert-danger\" role=\"alert\">\n            Bitte \u00DCberpr\u00FCfe den gesuchten Ort in der Eingabe auf Richtigkeit!\n        </div>";
    }
}
