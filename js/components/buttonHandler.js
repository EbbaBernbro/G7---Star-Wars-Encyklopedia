import * as api from './apiRequests.js';                  
import * as errorHandler from './errorHandler.js';

const btnToSearch = document.querySelector(".searchBtn");       // use DOM to get out search button to a const
const result = document.querySelector(".results");              // use DOM to get out result section to a const
let searchPlace = document.querySelector(".topPart");           // use DOM to get out top part div to a let
let spinner = document.querySelector(".loading");               // use DOM to get out loading div in html to a let
let listView = document.querySelector(".listView");             // use DOM to get listview from html to a let variable
let readMore = document.querySelector(".readMore");             // use DOM to get readmore section from html to a variable




// function that runs on click, get value from input and option and use in GetData api to make request and if input is empty send a error message.
export function getValueOnClick() {
  btnToSearch.addEventListener("click", () => {                     // on btnToSearch click using addEventListener
    readMore.classList.remove("show");
    listView.classList.add("hide");
    spinner.classList.remove("hide");
    result.classList.add("anim");
    searchPlace.classList.add("animSearch");

    let value = document.querySelector(".search").value;            // value from input and put in a variable named value

    if(value == ""){                                                // if value is empty, display a error message
 
      errorHandler.newError("Fel", "Felaktig inmatning", "Skriv in rätt värde");

    }
    let subject = document.querySelector(".selectType").value      // value from select and put in a variable 
    api.getData(value, subject, null)                              // api request uses value and subject variabels
  });
}
getValueOnClick();

