import { cityName, datePicker, locationField, timePicker, weatherCondition } from "../constants.js";

export function showGeneralInformation(jsonData){
    cityName.textContent = `${jsonData.location.name} - ${jsonData.location.region} - ${jsonData.location.country}`;

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const locationValue = locationField.value;
    const dateValue = datePicker.value;
    const timeValue = timePicker.value;

    if(locationValue !== '' && dateValue === '' && timeValue === ''){
    // here we gonna deal with json data as 'current' search Method
        weatherCondition.textContent = jsonData.current.condition.text;

    } else if (locationValue !== '' && dateValue !== '' && timeValue === '') {
    // here we gonna deal with json data as 'forecast' search Method and for current day
        weatherCondition.textContent = jsonData.forecast.forecastday[0].day.condition.text;
    }
    
}