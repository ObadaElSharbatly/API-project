import { searchButton } from "./constants.js";
import { fetchRightData } from "./fetch-functions/fetch-data.js";
import { stopSearchButton } from "./manipulation/change-search-button.js";
import { fiveDaysForecast } from "./manipulation/restrict-dates.js";
import { showGeneralInformation } from "./manipulation/view-weather-information.js";


/* select the right event listener */
export function startApp (){
 
    fetchRightData()
    .then((jsonWeatherData) => {
        // this function do the suitable behavior with the jason data.
        showGeneralInformation(jsonWeatherData);

        // we should change the 'search' button to reload the page
        stopSearchButton();
    });
}

searchButton.addEventListener('click', startApp);
window.addEventListener('load', fiveDaysForecast);