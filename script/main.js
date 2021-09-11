import { fetchRightData } from "./fetch-functions/fetch-data.js";
import { fiveDaysForecast } from "./manipulation/restrict-dates.js";
import { showGeneralInformation } from "./manipulation/view-weather-information.js";

const searchButton = document.querySelector('#search-btn')

/* select the right event listener */
function selectRightEventListener (){
    const locationField = document.querySelector('#select-location').value;
    const dateField = document.querySelector('#select-date').value;
    const timeField = document.querySelector('#select-time').value;
    
    // 
    fetchRightData()
    .then((jsonWeatherData) => {
        showGeneralInformation(jsonWeatherData);
    });
}

searchButton.addEventListener('click', selectRightEventListener);
window.addEventListener('load', fiveDaysForecast);