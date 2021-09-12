import { datePicker, locationField, timePicker } from "../constants.js";
import { currentDate } from "../manipulation/restrict-dates.js";

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

export async function fetchRightData(){

    try {
        const endPointUrl = creatTheEndpointUrl();
        console.log(endPointUrl)

        const receivedData = await fetch(endPointUrl);
        if (receivedData.ok && receivedData.status === 200) {
            const jsonData = receivedData.json();
            console.log(jsonData);
            return jsonData;
        }
        //throw new Error("make sure the end point url is right");
    } catch (error) {
        console.log(error.status)
        console.log('API key ', APIKey);
        console.log('url ', url)
        console.log('location ', locationPa)
        console.log('date ', date)
        console.log('time ', time)
    }
}