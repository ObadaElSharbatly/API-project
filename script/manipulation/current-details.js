import { moreDetailsSection } from "../constants.js";

export function setCurrentWeatherDetails(rightObject){
    moreDetailsSection.classList.remove('hide');
    /* this function expect the right object from json data */
    const currentData = [
        {
            name: 'wind speed',
            iconClass: 'bi bi-wind',
            valueText: `${rightObject["wind_kph"]}`,
            unitText: 'K/h'
        },
        {
            name: 'wind direction',
            iconClass: 'bi bi-compass-fill',
            valueText: rightObject["wind_dir"],
            unitText: `${rightObject["wind_degree"]}°`
        },
        {
            name: 'Humidity',
            iconClass: 'bi bi-moisture',
            valueText: rightObject["humidity"],
            unitText: '&nbsp;&nbsp;%'
        },
        {
            name: 'Pressure',
            iconClass: 'bi bi-speedometer',
            valueText: rightObject["pressure_in"],
            unitText: ' Pa'
        },
        {
            name: 'Visibility',
            iconClass: 'bi bi-cloud-haze-fill',
            valueText: rightObject["vis_km"],
            unitText: ' Km'
        },
        {
            name: 'Cloud',
            iconClass: 'bi bi-clouds-fill',
            valueText: rightObject["wind_kph"],
            unitText: '&nbsp;&nbsp;&nbsp;'
        }
    ]
  for (const key of currentData) {

    // start put the right data in the Div.
    const iconDiv = document.createElement('div');
    iconDiv.classList.add('icon-div', 'flex', 'column');
    iconDiv.innerHTML = 
    `<div class="flex spc-btw" title='${key.name}' >
        <i class='${key.iconClass}'></i>
        <p class="value">${key.valueText}</p>
        <p class="unit">${key.unitText}</p>
    </div> 
    <hr>`;
    moreDetailsSection.appendChild(iconDiv);
  }
  
}