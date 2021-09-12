export function showDayName (date){
    // this function expects a special date & time or it will select the current date
    let dateInfo;
    if(date){
        dateInfo = new Date(date);
    } else {
        dateInfo = new Date();
    }
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = dateInfo.getDay();
    const dayName = days[day];

    return dayName;
}

export function showRightTime(epoch){
    // this function returns the current time
    let dateInfo;
    if(epoch){
        dateInfo = new Date(epoch);
    } else {
        dateInfo = new Date();
    }

    const h = dateInfo.getHours();
    const m = dateInfo.getMinutes();

    const timeFormat = (x) => x < 10 ? '0' + x : x;
    const timeValue = `${timeFormat(h)}:${timeFormat(m)}`;

    return timeValue;
}
