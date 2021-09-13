import { clearButton, locationField, searchButton, } from "./constants.js";
import { fetchRightData } from "./fetch-functions/fetch-data.js";
import { clearFields } from "./Helper-functions/clear-fields.js";
import { fiveDaysForecast } from "./manipulation/restrict-dates.js";
import {  invalidCityName } from "./manipulation/show-errors.js";


/* select the right event listener */
export function startApp (){

    if (locationField.value === ''){
        return invalidCityName()
    }
 
    fetchRightData()
}


searchButton.addEventListener('click', startApp);
clearButton.addEventListener('click', clearFields);
window.addEventListener('load', fiveDaysForecast);