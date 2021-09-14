import { datePicker, locationField, moreDetailsSection, timePicker } from "../constants.js";
import { stopSearchButton } from "../manipulation/change-search-button.js";
import { currentDate } from "../manipulation/restrict-dates.js";
import { connectionError, invalidCityName } from "../manipulation/show-errors.js";
import { showGeneralInformation } from "../manipulation/view-weather-information.js";

/* we need this to be global variable */
export let searchMethod;

function creatTheEndpointUrl() {
    // Select the information entered by user
    const locationValue = locationField.value;
    const dateValue     = datePicker.value;
    const timeValue     = timePicker.value;
    
    
    const APIKey     = 'key=b458fd088f5b42c082691547210409';
    const url        = `https://api.weatherapi.com/v1/`;
    const locationPa = `&q=${locationValue}`;
    const date       = `&dt=${dateValue}`
    const time       = `&hour=${timeValue}`

    if(locationValue !== '' && dateValue === '' && timeValue === ''){

        searchMethod = 'current'
        return `${url}${searchMethod}.json?${APIKey}${locationPa}`;

    } 
    else if (locationValue !== '' && dateValue >= currentDate) {

        searchMethod = 'forecast'
        if (timeValue === "") {
            return `${url}${searchMethod}.json?${APIKey}${locationPa}${date}`;
        }
        else {  
            return `${url}${searchMethod}.json?${APIKey}${locationPa}${date}${time}`;
        }

    } 
    else if (locationValue !== '' && dateValue < currentDate){

        searchMethod = 'history'
        if (timeValue === "") {
            return `${url}${searchMethod}.json?${APIKey}${locationPa}${date}`;
        } 
        else {  
            return `${url}${searchMethod}.json?${APIKey}${locationPa}${date}${time}`;
        }
    } 
    else {
        invalidCityName('This is a required field');
    }
}

export function fetchRightData(){

    const endPointUrl = creatTheEndpointUrl();
    console.log(endPointUrl)

    fetch(endPointUrl)
    .then((receivedData)=>{
        return receivedData.json();
    })
    .then((jsonWeatherData) => {
        if (jsonWeatherData.error){
            console.log(jsonWeatherData.error);
            throw new Error(jsonWeatherData.error.message);
        }

        console.log('json data success', jsonWeatherData)
        // this function do the suitable behavior with the jason data.
        showGeneralInformation(jsonWeatherData);
        
    })

    .catch((error)=>{

        // show error msg and reload button
        if (error.message == 'Failed to fetch') {
            console.log('the error is', error.message)
            if (moreDetailsSection.classList.contains('hide')) {
                moreDetailsSection.classList.remove('hide')
            }
            connectionError();
        } 
        else if (error.message === 'No matching location found.'){
            console.log(error);
            invalidCityName(error.message);
        } else {
            throw error;
        }
        
    })
}