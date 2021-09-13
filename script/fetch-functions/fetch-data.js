import { datePicker, locationField, timePicker } from "../constants.js";
import { stopSearchButton } from "../manipulation/change-search-button.js";
import { currentDate } from "../manipulation/restrict-dates.js";
import { invalidCityName } from "../manipulation/show-errors.js";
import { showGeneralInformation } from "../manipulation/view-weather-information.js";

/* we need this to be global variable */
export let searchMethod;

function creatTheEndpointUrl() {
    // Select the information entered by user
    const locationValue = locationField.value;
    const dateValue = datePicker.value;
    const timeValue = timePicker.value;
    
    
    const APIKey = 'key=b458fd088f5b42c082691547210409';
    const url = `https://api.weatherapi.com/v1/`;
    const locationPa = `&q=${locationValue}`;
    const date = `&dt=${dateValue}`
    const time = `&hour=${timeValue}`

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
}

export function fetchRightData(){

    const endPointUrl = creatTheEndpointUrl();
    console.log(endPointUrl)

    fetch(endPointUrl).then((receivedData)=>{
        console.log('receivedData', receivedData)
        if (!receivedData.ok){
            const jsonData = receivedData.json();
            console.log('json data failed', jsonData);
            throw new Error(jsonData.error.message);
        }
        return receivedData.json();
    })
    .then((jsonWeatherData) => {
        console.log('json data success', jsonWeatherData)
        // this function do the suitable behavior with the jason data.
        showGeneralInformation(jsonWeatherData);
        // we should change the 'search' button to reload the page
        stopSearchButton();
    })

    .catch((error)=>{
        if (error.message == 'Failed to fetch') {
            return console.log('the error is', error.message)
            
        }
        // console.log('the error is', error)
        // console.log('the error is', error.TypeError)
        // console.log('type of error', typeof error)
        console.error(error);
        invalidCityName();
    })
}

/* export async function fetchRightData(){

    try {
        const endPointUrl = creatTheEndpointUrl();
        console.log(endPointUrl)

        const receivedData = await fetch(endPointUrl);
        // if (receivedData.ok) {
            const jsonData = await receivedData.json();
            if (jsonData.error){
                console.log(jsonData);
                throw new Error(jsonData.error.message);
            }
            console.log(jsonData);
            return jsonData;
        // }
        
    } catch (error) {
        console.log(error.message);
        console.log(error);

    }
} */