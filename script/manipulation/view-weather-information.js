import { cityNameInfo, clockInfo, datePicker, dayInfo, generalInfoSection, temperatureDegree, tempEL, timePicker, weatherConditionInfo, weatherConditionLogo, temperatureType, locationIcon, locationField } from "../constants.js";
import { searchMethod } from "../fetch-functions/fetch-data.js";
import { changeTempType } from "../Helper-functions/change-temp-type.js";
import { showDayFormat, showRightTime } from "../Helper-functions/date.js";
import { setWeatherDetails, setWeatherDetailsForCurrentLocation } from "./show-details-of-weather.js";

let tempELHasEvenListener = false;
/* variable which will use to save the function with params inside. */
let changeTemperature;

export function showGeneralInformation(jsonData){
    generalInfoSection.classList.remove('hide')
    cityNameInfo.textContent = `${jsonData.location.name} - ${jsonData.location.region} - ${jsonData.location.country}`;
    temperatureType. textContent = 'C';

    if (tempELHasEvenListener) {
        tempEL.removeEventListener('click', changeTemperature);
    }

    /* Show information in case of current weather data request */
    if(searchMethod === 'current'){

        weatherConditionInfo.textContent = jsonData.current.condition.text;
        weatherConditionLogo.src         = jsonData.current.condition.icon;
        dayInfo.innerHTML                = showDayFormat(jsonData.location.localtime);
        clockInfo.textContent            = `${showRightTime(jsonData.location.localtime)}`;
        temperatureDegree.textContent    = Math.round(jsonData.current.feelslike_c);

        // change the temp type
        changeTemperature = () => 
        changeTempType(jsonData.current.feelslike_f, jsonData.current.feelslike_c);
        tempEL.addEventListener('click',changeTemperature);
        tempELHasEvenListener = true;

        /* show more details */
        setWeatherDetails(jsonData.current);
        
    } 


    /* Show information in case of forecast weather data request */
    else if (searchMethod === 'forecast' || searchMethod === 'history') {
        dayInfo.innerHTML = showDayFormat(datePicker.value);
        // when user doesn't give the special time we gonna show general 'forecast' for whole day
        if (timePicker.value === '') {

            weatherConditionInfo.textContent = jsonData.forecast.forecastday[0].day.condition.text;
            weatherConditionLogo.src         = jsonData.forecast.forecastday[0].day.condition.icon;
            temperatureDegree.textContent    = Math.round(jsonData.forecast.forecastday[0].day.avgtemp_c);
            clockInfo.textContent            = '';

            // change the temp type
            changeTemperature = () => 
            changeTempType(jsonData.forecast.forecastday[0].day.avgtemp_f,jsonData.forecast.forecastday[0].day.avgtemp_c);
            tempEL.addEventListener('click',changeTemperature);
            tempELHasEvenListener = true;

             /* show more details */
            setWeatherDetails(jsonData.forecast.forecastday[0]);
        } 
        
        // when user give a day from now and 5 days ahead with 'specific time'
        else {
          
            weatherConditionInfo.textContent = jsonData.forecast.forecastday[0].hour[0].condition.text;
            weatherConditionLogo.src         = jsonData.forecast.forecastday[0].hour[0].condition.icon;
            clockInfo.textContent            = showRightTime(jsonData.forecast.forecastday[0].hour[0].time);
            temperatureDegree.textContent    = Math.round(jsonData.forecast.forecastday[0].hour[0].feelslike_c);

            // change the temp type
            changeTemperature = () => 
            changeTempType(jsonData.forecast.forecastday[0].hour[0].feelslike_f, jsonData.forecast.forecastday[0].hour[0].feelslike_c);
            tempEL.addEventListener('click',changeTemperature);
            tempELHasEvenListener = true;
            
             /* show more details */
            setWeatherDetails(jsonData.forecast.forecastday[0].hour[0]);
        }
    }
    
}


/* get data for Current Location */
async function setCurrentLocationData(pos) {
    const crd = pos.coords;
    const endPoint = `https://api.weatherapi.com/v1/current.json?key=b458fd088f5b42c082691547210409&q=${crd.latitude},${crd.longitude}`;
    const fetchData = await fetch(endPoint)
    console.log(endPoint);
    const data = await fetchData.json();

    generalInfoSection.classList.remove('hide')
    cityNameInfo.textContent = `${data.location.name} - ${data.location.region} - ${data.location.country}`;
    temperatureType. textContent = 'C';

    if (tempELHasEvenListener) {
        tempEL.removeEventListener('click', changeTemperature);
    }
    
    weatherConditionInfo.textContent = data.current.condition.text;
    weatherConditionLogo.src         = data.current.condition.icon;
    dayInfo.innerHTML                = showDayFormat(data.location.localtime);
    clockInfo.textContent            = `${showRightTime(data.location.localtime)}`;
    temperatureDegree.textContent    = Math.round(data.current.feelslike_c);

    // change the temp type
    changeTemperature = () => 
    changeTempType(data.current.feelslike_f, data.current.feelslike_c);
    tempEL.addEventListener('click',changeTemperature);
    tempELHasEvenListener = true;

    /* show more details */
    setWeatherDetailsForCurrentLocation(data.current);
    locationIcon.addEventListener('click', ()=> {
        locationField.value = `${data.location.name}-${data.location.region}`
    })
  }
  
  navigator.geolocation.getCurrentPosition(setCurrentLocationData);