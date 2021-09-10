import { datePicker, locationField, timePicker } from "../constants.js";

export async function fetchCurrentData(){
    let endPointUrl='';
    
    function creatTheEndpointUrl() {
        // Select the information entered by user
        const locationValue = locationField.value;
        const dateValue = datePicker.value;
        const timeValue = timePicker.value;
        
        let searchMethod;
        const APIKey = 'key=b458fd088f5b42c082691547210409';
        const url = `https://api.weatherapi.com/v1/`;
        const locationPa = `&q=${locationValue}`;
        const date = `&dt=${dateValue}`

        if(locationValue !== '' && dateValue === '' && timeValue === ''){
            searchMethod = 'current.json?'
            return endPointUrl = `${url}${searchMethod}${APIKey}${locationPa}`;

        } else if (locationValue !== '' && dateValue !== '' && timeValue === '') {
            searchMethod = 'forecast.json?'
            return endPointUrl = `${url}${searchMethod}${APIKey}${locationPa}${date}`;
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