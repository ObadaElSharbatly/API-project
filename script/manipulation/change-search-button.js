import { searchButton } from "../constants.js";
import { startApp } from "../main.js";



export function stopSearchButton (){
    searchButton.removeEventListener('click', startApp);
    searchButton.addEventListener('click', ()=>{location.reload()})
    searchButton.textContent = 'change choices'
}