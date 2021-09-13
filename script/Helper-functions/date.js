export function showDayFormat (date){
    // this function expects a special date & time or it will select the current date
    
    let dateInfo;

    if (date) {
        dateInfo = new Date(date);
    }
    else {
        dateInfo = new Date();
    }
    
    // to get the day Name
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = dateInfo.getDay();
    const dayName = days[day];

    // to get the time everywhere in the world.
    const year = dateInfo.getFullYear()
    const month = dateInfo.getMonth()+1
    const theDay = dateInfo.getDate()

    // fix the format to put Zero next to single numbers >> 2021-02-05
    const dateFormat = x => x < 10 ? '0' + x : x
    
    // show the current date to use in while fetching to decide if we use forecast or historical
    const fullDate = `${dateFormat(year)}-${dateFormat( month )}-${dateFormat(theDay)}`
    return `${dayName} &nbsp; - &nbsp; ${fullDate}`;
}

export function showRightTime(time){
    // this function returns the current time or the time given
    let dateInfo;
    if (time) {
        dateInfo = new Date(time);
    }
    else {
        dateInfo = new Date();
    }

    const h = dateInfo.getHours();
    const m = dateInfo.getMinutes();

    const timeFormat = (x) => x < 10 ? '0' + x : x;
    const timeValue = `${timeFormat(h)}:${timeFormat(m)}`;

    return timeValue;
}
