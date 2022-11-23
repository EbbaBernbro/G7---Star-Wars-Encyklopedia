//Grundfilen som hanterar all kommunikation mellan filerna

import * as api from './components/apiRequests.js';
import * as buttonHandler from './components/buttonHandler.js';
import * as domModifier from './components/domModifier.js';

let searchBtn = document.querySelector(".searchBtn");

searchBtn.addEventListener("click", function(){

    buttonHandler.search();

})


//Hämtar från apiRequests.js
// console.log(api.getPlanets());
// console.log(api.getPersons());
//Hämtar från buttonhandler.js
// console.log(buttonHandler.clickedButton());
// console.log(api.secret);



