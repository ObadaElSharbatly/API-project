import { datePicker, generalInfoSection, locationField, moreDetailsSection, timePicker } from "../constants.js";
import { stopSearchButton } from "../manipulation/change-search-button.js";
import { currentDate } from "../manipulation/restrict-dates.js";
import { invalidCityName } from "../manipulation/show-errors.js";
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
        invalidCityName();
    }
}

export function fetchRightData(){

    const endPointUrl = creatTheEndpointUrl();
    console.log(endPointUrl)

    fetch(endPointUrl)
    .then((receivedData)=>{
        /* if (!receivedData.ok) {
            const jsonData = receivedData.json();
            console.log('received Data IS: ', receivedData);
            console.log('json data failed: ', jsonData);
            throw new Error(jsonData);
        } */
        
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
        // we should change the 'search' button to reload the page
        stopSearchButton();
    })

    .catch((error)=>{

        // show error msg and reload button
        if (error.message == 'Failed to fetch') {
            console.log('the error is', error.message)
            if (moreDetailsSection.classList.contains('hide')) {
                moreDetailsSection.classList.remove('hide')
            }
            
            const errorMsg = document.createElement('P');
            errorMsg.classList.add('error');
            errorMsg.textContent = 'Failed to fetch data please make sure that your internet is stable and try again in 5 sec page gonna reload'
            moreDetailsSection.appendChild(errorMsg);
            // setTimeout(()=>location.reload(), 5);

            
        } 
        else if (error.message === 'No matching location found.'){
            console.log(error);
            invalidCityName();
        }
        
    })
}