//Skicka data tillbaka till DOM, t.ex ny textrad

//Jag skapar en render funktion som hon kör i sin api fil där hon skickar in data till mig i en parameter
//if data do this - kolla datan sen bygga upp document.create element list item (create element ul html)

/*Användaren skriver något i sökrutan och klickar på knappen sök. buttonHandler tar det värdet och skickar till apiRequest som
i sin tur skickar ett objekt via en funktion till domModifier(mig). domModifier skapar funktion*/

import * as api from "./apiRequests.js";
import * as errorHandler from "./errorHandler.js";

let latestResult = [];

let filter = [
  "films",
  "homeworld",
  "vehicles",
  "starships",
  "edited",
  "url",
  "species",
  "residents",
  "characters",
  "planets",
  "people",
];
let listView = document.querySelector(".listView"); // use DOM to get listView section to a variable

export function renderData(data, searchString, category) {
  listView.classList.remove("hide");
  latestResult = data;

  //Find the contatiner element where we want to attach everything
  const resultTag = document.querySelector(".result"); //Ex. variable name, ID - quote-ist
  resultTag.innerHTML = "";

  for (let i = 0; i < data.results.length; i++) {
    const id = data.results[i].url.split("/").splice(-2, 1); // get the ID of the search value
    let firstPostion = data.results[i]; // create a variable named firstPostion and put in data result from the searched object
    let key1 = Object.keys(firstPostion)[0]; // takes out key from the first index position in the response
    let key2 = Object.keys(firstPostion)[1]; // takes out key from the second index postion in the responese
    key1 = key1.charAt(0).toUpperCase() + key1.slice(1); // takes out first letter of key1 and makes it capital letter
    key2 = key2.charAt(0).toUpperCase() + key2.slice(1); // takes out first letter of key2 and makes it capital letter

    const value1 = Object.values(firstPostion)[0]; // takes out value from the first index postion in the response
    const value2 = Object.values(firstPostion)[1]; // takes out value from the second index postion in the response

    let result = document.querySelector(".resultRow"); // use DOM to get resultRow section to a variable

    //cloneNode() method creates a clone of the node >results< and returns a copy of the original node (results)
    let clone = result.cloneNode(true); //true = clone the node, its attributes and children
    let cloneButton = clone.querySelector("button"); //Meaning all these clone. returns a copy of the blue print for result rows
    clone.classList.add("show");

    // create variabel to the cloned for id, name and gender so it can be used later
    let idField = clone.querySelector("#id");
    let nameField = clone.querySelector("#name");
    let genderField = clone.querySelector("#gender");

    // using templete string to show id, and the first two position from api and display in result
    idField.innerHTML = `ID: ${id}`;
    nameField.innerHTML = `${key1} : ${value1}`;
    genderField.innerHTML = `${key2} : ${value2}`;

    //This is our Read more
    cloneButton.setAttribute("data", id); // Add data attribute to button

    cloneButton.addEventListener("click", function () {
      let tag = document.querySelector(".listView");
      // id.append(tag)

      tag.classList.remove("show");
      tag.classList.add("hide");

      //Display read more div when clicked
      let readMore = document.querySelector(".readMore");

      readMore.classList.remove("hide");
      readMore.classList.add("show");

      let resultData = getResultId(this.getAttribute("data"));

      let details = document.querySelector(".details");
      details.innerHTML = "";

      let idInDetail = document.createElement("span");
      idInDetail.innerHTML = "ID: " + id;
      details.appendChild(idInDetail);

      //Delar upp objektet så den tar en del av varje rad inuti objektet
      Object.entries(resultData).forEach((entry) => {
        let [key, value] = entry;
        console.log(key + " " + value);

        //Om objektets namn ingår i filter arrayen som inte ska visas, så returnerar det false och denna rad visas ej.
        for (let i = 0; i < filter.length; i++) {
          if (key == filter[i]) {
            return false;
          }
        }

        key = key.replace("_", " "); // take out , and replace with nothing to a more clean result
        key = key.charAt(0).toUpperCase() + key.slice(1); //Första bokstaven stor

        let newElement = document.createElement("span"); // Skapa element
        newElement.innerHTML = key + ": " + value; // Skriv ut vilken rad vi är på och dess data

        details.appendChild(newElement); //Append
      });

      // retrun button function on click, hide readmore page and display result again
      let returnButton = document.querySelector("#backToSearch");
      returnButton.addEventListener("click", () => {
        readMore.classList.add("hide");
        tag.classList.remove("hide");
        tag.classList.add("show");
      });
    });

    resultTag.appendChild(clone); //Append the cloned element to the child nodes of 'resultTag', in other words our contatiner element where we want to attach everything.

    setPagination(data.count, searchString, category); //.count gets number of array lists i result object
  }
}
// loop som tar bort alla divar i result
function clearResults(input) {
  for (let i = 0; i < input.length; i++) {
    input[i].remove();
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

  let lastItem = pageItem.cloneNode(true);
  let nextLink = lastItem.querySelector("a");

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
  let itemLink = document.querySelectorAll(".page-item > a");

  lastItem.classList.remove("active");
  nextLink.innerHTML = "Next";

  pagination.appendChild(lastItem);

  for (let i = 0; i < itemLink.length; i++) {
    if (itemLink[i].innerHTML == "Previous") {
      if (!latestResult.previous) {
        itemLink[i].classList.add("disabled");
      }
    }

    if (itemLink[i].innerHTML == "Next") {
      if (!latestResult.next) {
        itemLink[i].classList.add("disabled");
      }
    }
  }

  for (let i = 0; i < allItem.length; i++) {
    console.log(i);
    let link = allItem[i].querySelector("a");
    let currPageIndex = latestResult.next.split("=").splice(-1, 1);
    currPageIndex = Number(currPageIndex);
    if (link.innerHTML == currPageIndex - 1) {
      allItem[i].classList.add("active");
    } else {
      allItem[i].classList.remove("active");
    }

    allItem[i].addEventListener("click", function (e) {
      e.preventDefault();
      let spinner = document.querySelector(".loading");
      spinner.classList.remove("hide");

      let results = document.querySelector(".result");
      results.innerHTML = "";

      let text = this.querySelector("a");

      if (text.innerHTML == "Previous") {
        if (latestResult.previous) {
          let currPage = latestResult.next.split("=").splice(-1, 1);

          if (currPage == null || latestResult.next == null) {
            errorHandler.newError("error", "", "Inga fler sidor");
          }

          api.getData(searchString, category, currPage.toString() - 2);
        }

        return false;
      }

      if (text.innerHTML == "Next") {
        if (latestResult.next) {
          let currPage = latestResult.next.split("=").splice(-1, 1);

          if (currPage == null || latestResult.next == null) {
            errorHandler.newError("error", "", "Inga fler sidor");
          }
          api.getData(searchString, category, currPage.toString());
        }

        return false;
      }

      if (text.innerHTML == "Previous") {
        if (latestResult.previous) {
          let currPage = latestResult.next.split("=").splice(-1, 1);

          if (currPage == null || latestResult.next == null) {
            errorHandler.newError("error", "", "Inga fler sidor");
          }
          api.getData(searchString, category, currPage.toString() - 2);
        }

        return false;
      }

      if (text.innerHTML == "Next") {
        if (latestResult.next) {
          let currPage = latestResult.next.split("=").splice(-1, 1);

          if (currPage == null || latestResult.next == null) {
            errorHandler.newError("error", "", "Inga fler sidor");
          }
          api.getData(searchString, category, currPage.toString());
        }

        return false;
      }

      api.getData(searchString, category, this.querySelector("a").innerHTML);
    });
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
