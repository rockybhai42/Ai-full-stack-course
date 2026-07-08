 async function getWeather(city){
   

    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`);
    
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
    const data = await response.json();
    //console.log(data);
    const {  latitude,longitude} = data.results[0];
    //console.log(latitude,longitude);
  
    
//    const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`)
    const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`)
        if (!weatherResponse.ok) {
      throw new Error(`Request failed with status ${weatherResponse.status}`);
    }
    const weatherData = await weatherResponse.json();
    // console.log(weatherData);


    return weatherData;


   
  

}

// console.log(getWether("chennai"));

export default getWeather; 



// latitude: 
// longitude: