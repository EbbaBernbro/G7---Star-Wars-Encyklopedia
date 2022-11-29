//Skicka data tillbaka till DOM, t.ex ny textrad

//Jag skapar en render funktion som hon kör i sin api fil där hon skickar in data till mig i en parameter
//if data do this - kolla datan sen bygga upp document.create element list item (create element ul html)

/*Användaren skriver något i sökrutan och klickar på knappen sök. buttonHandler tar det värdet och skickar till apiRequest som
i sin tur skickar ett objekt via en funktion till domModifier(mig). domModifier skapar funktion*/

let latestResult = [];

export function renderData(data) {
  latestResult = data;

  // console.log("Got: " + data.results.length + " matches");
  //Find the contatiner element where we want to attach everything
  const resultTag = document.querySelector(".result"); //Ex. variable name, ID - quote-ist
  clearResults(resultTag);
  resultTag.innerHTML = "";
  setPagination(data.count);
  for (let i = 0; i < data.results.length; i++) {
    const id = data.results[i].url.split("/").splice(-2, 1);
    console.log(id)
    const name = data.results[i].name ? data.results[i].name : data.results[i].title;
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
      name.innerHTML = resultData.name;
      gender.innerHTML = resultData.gender;

    })
    resultTag.appendChild(clone);

    // readMoreData()
    // div.textContent = gender;
    // resultTag.appendChild(div);
  }
}
// loop som tar bort alla divar i result
function clearResults(input) {   
  for (let i = 0; i < input.length; i++) {
      input[i].remove();
  }    
}

function setPagination(id) {
  let number = id / 10;

  for (let i = 2; i < number; i++) {
    let pagination = document.querySelector(".pagination");

    let row = document.querySelector(".pagination > .page-item:last-child");
    let newRow = row.cloneNode(true);
    newRow.classList.remove("active");

    let link = newRow.querySelector("a");
    link.innerHTML = i;

    link.addEventListener("click", () => {
      alert("Hej");
    });
    pagination.appendChild(newRow);
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
