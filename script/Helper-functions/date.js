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

export function showRightTime(){
    // this function returns the current time
    const dateInfo = new Date();
    const h = dateInfo.getHours();
    const m =dateInfo.getMinutes();
    const s = dateInfo.getSeconds();

    const timeFormat = (x) => x < 10 ? '0' + x : x;
    const timeValue = `${timeFormat(h)}:${timeFormat(m)}:${timeFormat(s)}`;

    return timeValue;
}
