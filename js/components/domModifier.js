//Skicka data tillbaka till DOM, t.ex ny textrad

//Jag skapar en render funktion som hon kör i sin api fil där hon skickar in data till mig i en parameter
//if data do this - kolla datan sen bygga upp document.create element list item (create element ul html)

/*Användaren skriver något i sökrutan och klickar på knappen sök. buttonHandler tar det värdet och skickar till apiRequest som
i sin tur skickar ett objekt via en funktion till domModifier(mig). domModifier skapar funktion*/

import * as api from './apiRequests.js';

let latestResult = [];

let filter = ["films", "homeworld", "vehicles", "starships", "created", "edited", "url", "species", "residents"];
let listView = document.querySelector(".listView");

export function renderData(data, searchString, category) {
  listView.classList.remove("hide");
  latestResult = data;
  // console.log("Got: " + data.results.length + " matches");
  //Find the contatiner element where we want to attach everything
  const resultTag = document.querySelector(".result"); //Ex. variable name, ID - quote-ist
  
  resultTag.innerHTML = "";
  setPagination(data.count, searchString, category);//.count gets number of array lists i result object
  for (let i = 0; i < data.results.length; i++) {
    const id = data.results[i].url.split("/").splice(-2, 1); //
    const name = data.results[i].name;
    const gender = data.results[i].gender;
  
    let result = document.querySelector(".resultRow");

    let clone = result.cloneNode(true);
    let cloneButton = clone.querySelector("button");
    clone.classList.add("show");

    let idField = clone.querySelector("#id");
    let nameField = clone.querySelector("#name");
    let genderField = clone.querySelector("#gender");

    idField.innerHTML = id;
    nameField.innerHTML = name;
    genderField.innerHTML = gender;

    cloneButton.setAttribute("data", id);

    cloneButton.addEventListener("click", function () {
      let tag = document.querySelector(".listView");

      tag.classList.remove("show");
      tag.classList.add("hide");

      let readMore = document.querySelector(".readMore");
      
      readMore.classList.remove("hide");
      readMore.classList.add("show");


      let resultData = getResultId(this.getAttribute("data"));

      let details = document.querySelector(".details");
      details.innerHTML = "";

      Object.entries(resultData).forEach(entry => {
        
        let [key, value] = entry;
        console.log(key + " " + value);

        for(let i = 0; i < filter.length; i++){

          if(key == filter[i]){

            return false;

          }

        }

        key = key.replace("_", " ");
        key = key.charAt(0).toUpperCase() + key.slice(1);

        
        let newElement = document.createElement("span");
        newElement.innerHTML = key + ": " + value;

        details.appendChild(newElement);

      });


      

     


    
      let returnButton = document.querySelector("#backToSearch");
      returnButton.addEventListener("click", () => {

        readMore.classList.add("hide");
        tag.classList.remove("hide");
        tag.classList.add("show");

      });
    });

    resultTag.appendChild(clone);

  }
}

function setPagination(id, searchString, category) {
  let number = id / 10;
  let pagination = document.querySelector(".pagination");

  pagination.innerHTML = "";

  let pageItem = document.querySelector(".base > .page-item");
  let firstItem = pageItem.cloneNode(true);
  let previousLink = firstItem.querySelector("a");

  firstItem.classList.remove("active");
  previousLink.innerHTML = "Previous";
  pagination.appendChild(firstItem);

  for (let i = 0; i < number; i++) {

    let newRow = pageItem.cloneNode(true);

    if (i > 0) {

      newRow.classList.remove("active");

    }


    let link = newRow.querySelector("a");
    link.innerHTML = i + 1;

    pagination.appendChild(newRow);
  }

  let allItem = document.querySelectorAll(".page-item");

  for (let i = 0; i < allItem.length; i++) {

    allItem[i].addEventListener("click", function () {

      api.getData(searchString, category, this.querySelector("a").innerHTML);
      this.classList.add("active");

    })
  }
}

function getResultId(checkId) {
  for (let i = 0; i < latestResult.results.length; i++) {
    const id = latestResult.results[i].url.split("/").splice(-2, 1);

    if (id == checkId) {
      return latestResult.results[i];
    }
  }
}

