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
        dayInfo.textContent = `${showDayName()} - ${currentDate}`;
        clockInfo.textContent = showRightTime();
        weatherConditionLogo.src = jsonData.current.condition.icon;
        temperatureDegree.textContent = Math.round(jsonData.current.feelslike_c);

        //get the temperature type be C as a default value every time
        temperatureType.textContent = 'C'
        const changeTempTypeInCurrentMode = () => {
            // this function expects the object of temperatures on the desired date
            if (temperatureType.textContent === 'C') {
                temperatureType.textContent = 'F';
                temperatureDegree.textContent = Math.round(jsonData.current.feelslike_f);
        
            } else {
                temperatureType.textContent = 'C';
                temperatureDegree.textContent = Math.round(jsonData.current.feelslike_c);
            } 
        }
        temperatureEL.addEventListener('click',changeTempTypeInCurrentMode);
        
    } 




    /* Show information in case of forecast weather data request */
    else if (searchMethod === 'forecast') {
        
        // when user doesn't give the special time we gonna show general 'forecast' for whole day
        if (timeValue === '') {

            weatherConditionInfo.textContent = jsonData.forecast.forecastday[0].day.condition.text;
            dayInfo.textContent = `${showDayName(dateValue)} - ${dateValue}`;
            clockInfo.remove();
            weatherConditionLogo.src = jsonData.forecast.forecastday[0].day.condition.icon;
            temperatureDegree.textContent = Math.round(jsonData.forecast.forecastday[0].day.avgtemp_c);

            //get the temperature type be C as a default value every time
            temperatureType.textContent = 'C'
            const changeTempTypeInCurrentMode = () => {
                // this function expects the object of temperatures on the desired date
                if (temperatureType.textContent === 'C') {
                    temperatureType.textContent = 'F';
                    temperatureDegree.textContent = Math.round(jsonData.forecast.forecastday[0].day.avgtemp_f);
            
                } else {
                    temperatureType.textContent = 'C';
                    temperatureDegree.textContent = Math.round(jsonData.forecast.forecastday[0].day.avgtemp_c);
                } 
            }
            temperatureEL.addEventListener('click',changeTempTypeInCurrentMode);
        } 
        
        else {
            
        }
    }
    
}