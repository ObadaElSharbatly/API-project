import { datePicker } from "../constants.js";

// we should restrict the dates onload of the page:
export function fiveDaysForecast(){
    const fullDate = new Date('2021-12-29');
    const year = fullDate.getFullYear()
    const month = fullDate.getMonth()+1
    let date = fullDate.getDate()
    let maxDate = date + 5
    let minDate = date - 5

    // fix the format to put Zero next to single numbers >> 2021-02-05
    const dateFormat = x => x < 10 ? '0' + x : x
    
    // match the max date
    if (maxDate > 30 && month !== 12) {
        maxDate = `${dateFormat(year)}-${dateFormat( month + 1)}-${dateFormat(maxDate - 30)}`;
    } else if (maxDate > 30 && month === 12) {
        maxDate = `${dateFormat(year+1)}-01-${dateFormat(maxDate - 30)}`;
    } else {
        maxDate = `${dateFormat(year)}-${dateFormat( month )}-${dateFormat(maxDate)}`;
    }

    // match the min date
    if (minDate <= 0 && month !== 1) {
        minDate = `${dateFormat(year)}-${dateFormat( month - 1)}-${dateFormat(minDate + 30)}`;
    } else if (minDate <= 0 && month === 1) {
        minDate = `${dateFormat(year-1)}-12-${dateFormat(minDate + 30)}`;
    } else {
        minDate = `${dateFormat(year)}-${dateFormat( month )}-${dateFormat(minDate)}`;
    }

    // minDate = `${dateFormat(year)}-${dateFormat(month)}-${dateFormat(date - 7)}`
    datePicker.min = minDate;
    datePicker.max = maxDate;
}