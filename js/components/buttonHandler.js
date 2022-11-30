// Tar emot inputs ifrån sidan, skickar de vidare
// benjamin
// search api call på apin och apin ska kalla på dom modifier      -    addEventListener skickar request om api data till jenny api sedan skickas det till dommodifier sen läggs det up på sidan

// search
/*const btnToSearch = document.querySelector(".searchBtn");
// ska en validerings funktion regex

btnToSearch.addEventListener("click", getData("strängvärde", "subjekt")*/
import * as api from './apiRequests.js';
import * as errorHandler from './errorHandler.js';

const btnToSearch = document.querySelector(".searchBtn");
const result = document.querySelector(".results");
let searchPlace = document.querySelector(".topPart");
let spinner = document.querySelector(".loading");

let listView = document.querySelector(".listView");
let readMore = document.querySelector(".readMore");
export function getValueOnClick() {

  btnToSearch.addEventListener("click", () => {

    readMore.classList.remove("show");
    listView.classList.add("hide");
    spinner.classList.remove("hide");
    
    result.classList.add("anim");
    searchPlace.classList.add("animSearch");

    let value = document.querySelector(".search").value;

    if(value == ""){

      errorHandler.newError("Fel", "Felaktig inmatning", "Skriv in rätt värde");

    }
    console.log(value);
    let subject = document.querySelector(".selectType").value
    console.log(subject)
    api.getData(value, subject, null)
  });
}
getValueOnClick();

