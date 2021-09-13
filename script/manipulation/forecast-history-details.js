import { moreDetailsSection } from "../constants.js";

export function showGeneralDayDetails(rightObject){
    /* this function expect the right object from json data */
    moreDetailsSection.classList.remove('hide');

    const currentData = [
        {
            name: 'Max temperature',
            iconClass: 'bi bi-thermometer-high',
            valueText: `${rightObject.day.maxtemp_c}°`,
            unitText: 'Cel'
        },
        {
            name: 'Min temperature',
            iconClass: 'bi bi-thermometer-snow',
            valueText: `${rightObject.day.mintemp_c}°`,
            unitText: 'Cel'
        },
        {
            name: 'Humidity',
            iconClass: 'bi bi-moisture',
            valueText: rightObject.day.avghumidity,
            unitText: '&nbsp;&nbsp;%'
        },
        {
            name: ' Average visibility',
            iconClass: 'bi bi-cloud-haze-fill',
            valueText: rightObject.day.avgvis_km,
            unitText: ' Km'
        },
        {
            name: 'Sunrise',
            iconClass: 'bi bi-sunrise-fill',
            valueText: rightObject.astro.sunrise,
            unitText: '&nbsp;&nbsp;&nbsp;'
        },
        
        {
            name: 'Sunset',
            iconClass: 'bi bi-sunset-fill',
            valueText: rightObject.astro.sunset,
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