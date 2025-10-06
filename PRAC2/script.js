const CityDeg = {
            "Mumbai": "35°C",
            "Delhi": "30°C",
            "Bangalore": "28°C",
            "Kolkata": "32°C",
            "Chennai": "33°C",
            "Ahmedabad": "34°C",
            "Hyderabad": "29°C",
            "Pune": "31°C",
            "Jaipur": "36°C",
            "Lucknow": "30°C",
            "Surat": "34°C",
            "Vadodara": "35°C",
        };
document.getElementById('getWeatherBtn').addEventListener('click', function() {
            const cityName = document.getElementById('cityInput').value;
            const weatherResult = document.getElementById('weatherResult');
            if (CityDeg[cityName]) {
                weatherResult.innerHTML = cityName + ": " + CityDeg[cityName];
            } else {
                weatherResult.innerHTML = "Data not available";
            }
        });
