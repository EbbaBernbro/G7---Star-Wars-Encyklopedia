//Skicka data tillbaka till DOM, t.ex ny textrad

//Jag skapar en render funktion som hon kör i sin api fil där hon skickar in data till mig i en parameter
//if data do this - kolla datan sen bygga upp document.create element list item (create element ul html)

/*Användaren skriver något i sökrutan och klickar på knappen sök. buttonHandler tar det värdet och skickar till apiRequest som
i sin tur skickar ett objekt via en funktion till domModifier(mig). domModifier skapar funktion*/

import * as api from './apiRequests.js';

let latestResult = [];

export function renderData(data, searchString) {
  latestResult = data;
  // console.log("Got: " + data.results.length + " matches");
  //Find the contatiner element where we want to attach everything
  const resultTag = document.querySelector(".result"); //Ex. variable name, ID - quote-ist
  resultTag.innerHTML = "";
  setPagination(data.count, searchString);
  for (let i = 0; i < data.results.length; i++) {
    const id = data.results[i].url.split("/").splice(-2, 1);
    const name = data.results[i].name;
    const gender = data.results[i].gender;
    //Store all elements
    // const div = document.createElement("div");

    // div.textContent = name;
    // resultTag.appendChild(div);

    // console.log("----------");
    // console.log(data);
    // console.log(data.results[i].gender);
    let result = document.querySelector(".resultRow");

    let clone = result.cloneNode(true);
    let cloneButton = clone.querySelector("button");
    clone.classList.add("show");

    let idField = clone.querySelector("#id");
    let nameField = clone.querySelector("#name");
    let genderField = clone.querySelector("#gender");

    // console.log(clone);
    idField.innerHTML = id;
    nameField.innerHTML = name;
    genderField.innerHTML = gender;

    cloneButton.setAttribute("data", id);

    cloneButton.addEventListener("click", function () {
        resultTag.innerHTML = "";

      let readMore = document.querySelector(".readMore");
      readMore.classList.add("show");
      let resultData = getResultId(this.getAttribute("data"));

      let name = document.querySelector(".nameMore");
      let gender = document.querySelector(".genderMore");
      let heigth = document.querySelector(".height");
      let hair = document.querySelector(".hair");
      let skin = document.querySelector(".skin");
      let eye = document.querySelector(".eye");
      let birth = document.querySelector(".birth");
      let mass = document.querySelector(".mass");
      let home = document.querySelector(".home");
      let href = document.querySelector(".href")


      name.innerHTML = resultData.name;
      gender.innerHTML = resultData.gender;
      heigth.innerHTML = resultData.height;
      hair.innerHTML = resultData.hair_color;
      skin.innerHTML = resultData.skin_color;
      eye.innerHTML = resultData.eye_color;
      birth.innerHTML = resultData.birth_year;
      mass.innerHTML = resultData.mass;
      home.innerHTML = resultData.homeworld.name;
      let theHref = resultData.homeworld
      console.log(resultData);
      href.setAttribute("href", theHref)
      let returnButton = document.querySelector("#backToSearch");
      returnButton.addEventListener("click", () => {
        resultTag.appendChild(clone);
        readMore.classList.add("d-none");
      });
    });
    resultTag.appendChild(clone);
    console.log(latestResult);
    console.log("Cookie right here: " + cookie)
  }
}

function setPagination(id, searchString) {
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
      
      api.getData(searchString, "people", this.querySelector("a").innerHTML);
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
//ID figma = 1:a resultat 2:a, 3:dje osv
//Deras home planet
//Kunna dölja noding bar - aktivera/inaktivera hide/show en klass
