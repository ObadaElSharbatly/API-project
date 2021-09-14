import { dateDiv, datePicker, locationDiv, locationField, moreDetailsSection } from "../constants.js";

export function invalidCityName ( text ) {
    if (!document.querySelector('#invalid-city-error')) {
        const invalidCity = document.createElement('h5');
        invalidCity.id = 'invalid-city-error'
        invalidCity.textContent = text;
        locationDiv.appendChild(invalidCity);

        locationField.addEventListener('input', clearInvalidCityNameError);
    }
}

export function clearInvalidCityNameError(){
    if (document.querySelector('#invalid-city-error')) {
        document.querySelector('#invalid-city-error').remove();
        locationField.removeEventListener('input', clearInvalidCityNameError);
    }
}

export function mustChooseDate ( text ) {
    if (!document.querySelector('#must-choose-date')) {
        const chooseDate = document.createElement('h5');
        chooseDate.id = 'must-choose-date'
        chooseDate.textContent = text;
        dateDiv.appendChild(chooseDate);

        datePicker.addEventListener('input', clearMustChooseDateError);
    }
}

export function clearMustChooseDateError(){
    if (document.querySelector('#must-choose-date')) {
        document.querySelector('#must-choose-date').remove();
        datePicker.removeEventListener('input', clearMustChooseDateError);
    }
}

export function connectionError () {
    moreDetailsSection.innerHTML = '';
    const errorDiv = document.createElement('div');
    errorDiv.classList.add('flex', 'column');

    const errorMsg = document.createElement('P');
    errorMsg.classList.add('error');
    errorMsg.innerHTML = 'Failed to fetch <br> data please make sure that your internet is stable and try again'
    errorDiv.appendChild(errorMsg);

    const reloadBtn = document.createElement('button');
    reloadBtn.classList.add('btn', 't-margin');
    reloadBtn.textContent = 'reload page'
    reloadBtn.addEventListener('click', ()=>location.reload())
    errorDiv.appendChild(reloadBtn);

    moreDetailsSection.appendChild(errorDiv);
}