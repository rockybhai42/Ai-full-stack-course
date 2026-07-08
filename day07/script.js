import getWeather from './api.js';

const form = document.querySelector("#form");
const cityInput = document.querySelector("#city");
const weatherSection = document.querySelector("#wether-card");
const button = document.querySelector("button");

function getWeatherEmoji(code) {
if (code.current_weather.weathercode === 0) return "☀️";
if (code.current_weather.weathercode <= 3) return "🌤️";
if (code.current_weather.weathercode <= 67) return "🌧️";
if (code.current_weather.weathercode <= 77) return "❄️";
if (code.current_weather.weathercode <= 99) return "⛈️";
return "🌍";
}

form.addEventListener("submit",async(e)=>{
    e.preventDefault();
    const city = cityInput.value.trim();

    if(!city){
        alert("please enter a city name");
        return;
    }
    if(!isNaN(city)){
        alert("please enter a valid city name");
        return;
    }

    weatherSection.innerHTML = "<h2>Loading weather data...</h2>";

    button.disabled = true;








    
        try{
            const weatherData = await getWeather(city);

            if(!weatherData || !weatherData.current_weather){
                weatherSection.innerHTML= "<h2>Weather data unavilable</h2>"
                return;
            }


              

            console.log(weatherData);

            weatherSection.innerHTML = "";
           
         
                

                

                const cityName = document.createElement("h2");
                cityName.textContent = city;
                weatherSection.appendChild(cityName);

              

                const weatherIcon = document.createElement("span");
                 weatherIcon.textContent = getWeatherEmoji(weatherData);
                weatherSection.appendChild(weatherIcon);

                const dateAndTime = document.createElement("h3")
                dateAndTime.textContent =` current date and time:${weatherData.current_weather.time}`;
                weatherSection.appendChild(dateAndTime);

                const temperature = document.createElement("h3");
                temperature.textContent = `Temperature: ${weatherData.current_weather.temperature}°C`;
                weatherSection.appendChild(temperature);

                const windSpeed = document.createElement("h3");
                windSpeed.textContent = `Wind Speed: ${weatherData.current_weather.windspeed} km/h`;
                weatherSection.appendChild(windSpeed);

                const windDirection = document.createElement("h3");
                windDirection.textContent = `Wind Direction: ${weatherData.current_weather.winddirection}°`;
                weatherSection.appendChild(windDirection);





                
            





        }catch(error){
            console.log(error);
            weatherSection.innerHTML = "<h2>Unable to fetch weather.</h2>"
        }finally{
            button.disabled = false;
            cityInput.value = "";
        }
    

    


});
   