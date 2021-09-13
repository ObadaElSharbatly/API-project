import { temperatureType, temperatureDegree } from "../constants.js";

export function changeTempType (tempF, tempC) {

    if (temperatureType.textContent === 'C') {
        temperatureType.textContent   = 'F';
        temperatureDegree.textContent = Math.round(tempF);

    } 
    else {
        temperatureType.textContent   = 'C';
        temperatureDegree.textContent = Math.round(tempC);
    } 
}

