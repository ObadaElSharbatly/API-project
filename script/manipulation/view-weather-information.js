import { cityNameInfo, clockInfo, datePicker, dayInfo, generalInfoSection, locationField, temperatureDegree, temperatureEL, temperatureType, timePicker, weatherConditionInfo, weatherConditionLogo } from "../constants.js";
import { searchMethod } from "../fetch-functions/fetch-data.js";
import { showDayName, showRightTime } from "../Helper-functions/date.js";
import { currentDate } from "./restrict-dates.js";


export function showGeneralInformation(jsonData){
    generalInfoSection.classList.remove('hide')
    cityNameInfo.textContent = `${jsonData.location.name} - ${jsonData.location.region} - ${jsonData.location.country}`;
    
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const locationValue = locationField.value;
    const dateValue = datePicker.value;
    const timeValue = timePicker.value;

    /* Show information in case of current weather data request */
    if(searchMethod === 'current'){

        weatherConditionInfo.textContent = jsonData.current.condition.text;
        weatherConditionLogo.src = jsonData.current.condition.icon;
        dayInfo.innerHTML = `${showDayName()} &nbsp; - &nbsp;  ${currentDate}`;
        clockInfo.textContent = `${showRightTime()}`;
        temperatureDegree.textContent = Math.round(jsonData.current.feelslike_c);

        const changeTempTypeInCurrentMode = () => {

            if (temperatureType.textContent === 'C') {
                temperatureType.textContent = 'F';
                temperatureDegree.textContent = Math.round(jsonData.current.feelslike_f);
        
            } 
            else {
                temperatureType.textContent = 'C';
                temperatureDegree.textContent = Math.round(jsonData.current.feelslike_c);
            } 
        }
        temperatureEL.addEventListener('click',changeTempTypeInCurrentMode);
        
    } 


    /* Show information in case of forecast weather data request */
    else if (searchMethod === 'forecast' || searchMethod === 'history') {
        dayInfo.innerHTML = `${showDayName(dateValue)} &nbsp; - &nbsp; ${dateValue}`;
        // when user doesn't give the special time we gonna show general 'forecast' for whole day
        if (timeValue === '') {

            weatherConditionInfo.textContent = jsonData.forecast.forecastday[0].day.condition.text;
            weatherConditionLogo.src = jsonData.forecast.forecastday[0].day.condition.icon;
            clockInfo.remove();
            temperatureDegree.textContent = Math.round(jsonData.forecast.forecastday[0].day.avgtemp_c);

            const changeTempTypeInCurrentMode = () => {

                if (temperatureType.textContent === 'C') {
                    temperatureType.textContent = 'F';
                    temperatureDegree.textContent = Math.round(jsonData.forecast.forecastday[0].day.avgtemp_f);
            
                } 
                else {
                    temperatureType.textContent = 'C';
                    temperatureDegree.textContent = Math.round(jsonData.forecast.forecastday[0].day.avgtemp_c);
                } 
            }
            temperatureEL.addEventListener('click',changeTempTypeInCurrentMode);
        } 
        
        // when user give a day from now and 5 days ahead with 'specific time'
        else {
            weatherConditionInfo.textContent = jsonData.forecast.forecastday[0].hour[0].condition.text;
            weatherConditionLogo.src = jsonData.forecast.forecastday[0].hour[0].condition.icon;
            clockInfo.textContent = showRightTime(jsonData.forecast.forecastday[0].hour[0].time);
            temperatureDegree.textContent = Math.round(jsonData.forecast.forecastday[0].hour[0].feelslike_c);

            const changeTempTypeInCurrentMode = () => {

                if (temperatureType.textContent === 'C') {
                    temperatureType.textContent = 'F';
                    temperatureDegree.textContent = Math.round(jsonData.forecast.forecastday[0].hour[0].feelslike_f);
            
                } 
                else {
                    temperatureType.textContent = 'C';
                    temperatureDegree.textContent = Math.round(jsonData.forecast.forecastday[0].hour[0].feelslike_c);
                } 
            }
            temperatureEL.addEventListener('click',changeTempTypeInCurrentMode);
        }
    }
    
}