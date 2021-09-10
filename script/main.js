import { fetchCurrentData } from "./fetch-functions/fetch-current.js";
import { showGeneralInformation } from "./manipulation/view-current-weather.js";

const searchButton = document.querySelector('#search-btn')

/* select the right event listener */
function selectRightEventListener (){
    const locationField = document.querySelector('#select-location').value;
    const dateField = document.querySelector('#select-date').value;
    const timeField = document.querySelector('#select-time').value;
    // 
    
    fetchCurrentData()
    .then((jsonWeatherData) => {
        showGeneralInformation(jsonWeatherData);
    });
}

searchButton.addEventListener('click', selectRightEventListener);