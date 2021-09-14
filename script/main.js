import { clearButton, searchButton, } from "./constants.js";
import { fetchRightData } from "./fetch-functions/fetch-data.js";
import { clearFields } from "./Helper-functions/clear-fields.js";
import { fiveDaysForecast } from "./manipulation/restrict-dates.js";


/* select the right event listener */
export function startApp (){
 
    fetchRightData()
}


searchButton.addEventListener('click', startApp);
clearButton.addEventListener('click', clearFields);
window.addEventListener('load', fiveDaysForecast);