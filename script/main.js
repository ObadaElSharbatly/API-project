import { clearButton, locationField, searchButton, timePicker } from "./constants.js";
import { fetchRightData } from "./fetch-functions/fetch-data.js";
import { clearFields } from "./Helper-functions/clear-fields.js";
import { stopSearchButton } from "./manipulation/change-search-button.js";
import { fiveDaysForecast } from "./manipulation/restrict-dates.js";
import {  invalidCityName } from "./manipulation/show-errors.js";
import { showGeneralInformation } from "./manipulation/view-weather-information.js";


/* select the right event listener */
export function startApp (){

    if (locationField.value === ''){
        return invalidCityName()
    }
 
    fetchRightData()/* .then((jsonWeatherData) => {
        // this function do the suitable behavior with the jason data.
        showGeneralInformation(jsonWeatherData);
        // we should change the 'search' button to reload the page
        stopSearchButton();
    }) */
}


searchButton.addEventListener('click', startApp);
clearButton.addEventListener('click', clearFields);
window.addEventListener('load', fiveDaysForecast);