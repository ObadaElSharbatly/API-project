import { cityNameInfo, datePicker, dayInfo, generalInfoSection, locationField, temperatureDegree, temperatureEL, temperatureType, timePicker, weatherConditionInfo, weatherConditionLogo } from "../constants.js";
import { searchMethod } from "../fetch-functions/fetch-data.js";

function showDayName (date){
    // this function expects a special date & time or it will select the current date
    let dateInfo;
    if(date){
        dateInfo = new Date(date);
    } else {
        dateInfo = new Date();
    }
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = dateInfo.getDay();
    const dayName = days[day];

    const h = dateInfo.getHours();
    const m =dateInfo.getMinutes();
    const s = dateInfo.getSeconds();

    const timeFormat = (x) => x < 10 ? '0' + x : x;
    const timeValue = `${timeFormat(h)}:${timeFormat(m)}:${timeFormat(s)}`;

    return `${dayName} (( ${timeValue} ))` 
}

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
        dayInfo.textContent = showDayName();
        weatherConditionLogo.src = jsonData.current.condition.icon;
        temperatureDegree.textContent = Math.round(jsonData.current.feelslike_c);

        //get the temperature type be C as a default value every time
        temperatureType.textContent = 'C'
        function changeTempTypeInCurrentMode () {
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

    } else if (searchMethod === 'forecast') {
    // here we gonna deal with json data as 'forecast' search Method and for current day
        if (timeValue === '') {
            weatherConditionInfo.textContent = jsonData.forecast.forecastday[0].day.condition.text;
            dayInfo.textContent = showDayName(dateValue);
            weatherConditionLogo.src = jsonData.forecast.forecastday[0].day.condition.icon;
            temperatureDegree.textContent = Math.round(jsonData.forecast.forecastday[0].day.avgtemp_c);

            //get the temperature type be C as a default value every time
            temperatureType.textContent = 'C'
            function changeTempTypeInCurrentMode () {
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
        } else {

        }
    }
    
}