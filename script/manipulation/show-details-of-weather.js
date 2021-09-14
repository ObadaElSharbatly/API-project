import { moreDetailsSection, timePicker } from "../constants.js";
import { searchMethod } from "../fetch-functions/fetch-data.js";



export function setWeatherDetails (rightObject) {
    moreDetailsSection.classList.remove('hide');
    moreDetailsSection.innerHTML='';
    /* this function expect the right object from json data */
    
    const currentData = [
        {
            name: 'wind speed',
            iconClass: 'bi bi-wind',
            valueText: rightObject.wind_kph,
            unitText: 'K/h'
        },
        {
            name: 'wind direction',
            iconClass: 'bi bi-compass-fill',
            valueText: rightObject.wind_dir,
            unitText: `${rightObject.wind_degree}°`
        },
        {
            name: 'Humidity',
            iconClass: 'bi bi-moisture',
            valueText: rightObject.humidity,
            unitText: '&nbsp;&nbsp;%'
        },
        {
            name: 'Pressure',
            iconClass: 'bi bi-speedometer',
            valueText: rightObject.pressure_in,
            unitText: ' Pa'
        },
        {
            name: 'Visibility',
            iconClass: 'bi bi-cloud-haze-fill',
            valueText: rightObject.vis_km,
            unitText: ' Km'
        },
        {
            name: 'Cloud',
            iconClass: 'bi bi-clouds-fill',
            valueText: rightObject.cloud,
            unitText: '&nbsp;&nbsp;&nbsp;'
        }
    ]
    
    const forecastData = [
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

    const specialTimeData = [
        {
            name: 'wind speed',
            iconClass: 'bi bi-wind',
            valueText: rightObject.wind_kph,
            unitText: 'K/h'
        },
        {
            name: 'wind direction',
            iconClass: 'bi bi-compass-fill',
            valueText: rightObject.wind_dir,
            unitText: `${rightObject.wind_degree}°`
        },
        {
            name: 'Humidity',
            iconClass: 'bi bi-moisture',
            valueText: rightObject.humidity,
            unitText: '&nbsp;&nbsp;%'
        },
        {
            name: 'Visibility',
            iconClass: 'bi bi-cloud-haze-fill',
            valueText: rightObject.vis_km,
            unitText: ' Km'
        },
        {
            name: 'Chance of rain',
            iconClass: 'bi bi-cloud-drizzle-fill',
            valueText: rightObject.chance_of_rain,
            unitText: '&nbsp;&nbsp;%'
        },
        
        {
            name: 'Cloud',
            iconClass: 'bi bi-clouds-fill',
            valueText: rightObject.cloud,
            unitText: '&nbsp;&nbsp;&nbsp;'
        }
    ]
    
    // here we choose the right array to use the right data.
    let objectName;
    if(searchMethod === 'current') {
        objectName = currentData;
    }

    else if (searchMethod === 'forecast' || searchMethod === 'history') {
        if (timePicker.value === '') {
            objectName = forecastData;
        }
        else {
            objectName = specialTimeData
        }
    }

  for (const key of objectName) {

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