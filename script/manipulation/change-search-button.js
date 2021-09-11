import { clearButton, searchButton } from "../constants.js";
import { startApp } from "../main.js";



export function stopSearchButton (){
    // remove the clear button 
    clearButton.classList.add('hide')

    // change the button to reload the page
    searchButton.removeEventListener('click', startApp);
    searchButton.addEventListener('click', ()=>{location.reload()})
    searchButton.textContent = 'change choices'
    
}