//Grundfilen som hanterar all kommunikation mellan filerna

import * as api from "./components/apiRequests.js";
import * as buttonHandler from "./components/buttonHandler.js";
import * as domModifier from "./components/domModifier.js";
import * as errorHandler from "./components/errorHandler.js";

let searchBtn = document.querySelector(".searchBtn");
const loader = document.querySelector(".loading");
const result = document.querySelector(".results");
let searchPlace = document.querySelector(".topPart");


searchBtn.addEventListener("click", function () {
  result.style.display = "block";
  loader.style.display = "none";
  result.classList.add("anim");
  searchPlace.classList.add("animSearch");
});



// result.style.display = "none";
// class.list add = show

//add clone.settatribue(data "vilket namn man måste hitta")
// set attribute
