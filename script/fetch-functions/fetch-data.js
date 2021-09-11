import { datePicker, locationField, timePicker } from "../constants.js";

/* we need this to be global variable */
export let searchMethod;

export async function fetchRightData(){
    let endPointUrl='';
    
    function creatTheEndpointUrl() {
        // Select the information entered by user
        const locationValue = locationField.value;
        const dateValue = datePicker.value;
        const timeValue = timePicker.value;
        
        
        const APIKey = 'key=b458fd088f5b42c082691547210409';
        const url = `https://api.weatherapi.com/v1/`;
        const locationPa = `&q=${locationValue}`;
        const date = `&dt=${dateValue}`

        if(locationValue !== '' && dateValue === '' && timeValue === ''){
            searchMethod = 'current'
            return endPointUrl = `${url}${searchMethod}.json?${APIKey}${locationPa}`;

        } else if (locationValue !== '' && dateValue !== '' && timeValue === '') {
            searchMethod = 'forecast'
            return endPointUrl = `${url}${searchMethod}.json?${APIKey}${locationPa}${date}`;
        }
    }

    try {
        creatTheEndpointUrl();
        console.log(endPointUrl)
        const receivedData = await fetch(endPointUrl);
        if (receivedData.ok) {
            const jsonData = receivedData.json();
            console.log(jsonData);
            return jsonData;
        }
        throw new Error(error.message);
    } catch (error) {
        console.log(error)
    }
}