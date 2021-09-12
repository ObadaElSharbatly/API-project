import { locationDiv, locationField } from "../constants.js";

export function invalidCityName (){
    if (!document.querySelector('#invalid-city-error')){
    const invalidCity = document.createElement('h5');
    invalidCity.id = 'invalid-city-error'
    invalidCity.textContent = 'Valid city is required';
    locationDiv.appendChild(invalidCity);
    locationField.addEventListener('input', clearInvalidCityNameError);
    }
}

export function clearInvalidCityNameError(){
    if (document.querySelector('#invalid-city-error')){
        document.querySelector('#invalid-city-error').remove();
    }
}