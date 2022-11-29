//Skicka data tillbaka till DOM, t.ex ny textrad

//Jag skapar en render funktion som hon kör i sin api fil där hon skickar in data till mig i en parameter
//if data do this - kolla datan sen bygga upp document.create element list item (create element ul html)

/*Användaren skriver något i sökrutan och klickar på knappen sök. buttonHandler tar det värdet och skickar till apiRequest som
i sin tur skickar ett objekt via en funktion till domModifier(mig). domModifier skapar funktion*/

export function renderData(data) {
  console.log("Got: " + data.results.length + " matches");
  //Find the contatiner element where we want to attach everything
  const resultTag = document.querySelector(".result"); //Ex. variable name, ID - quote-ist
  setPagination(data.count);
  for (let i = 0; i < data.results.length; i++) {
    const id = i;
    const name = data.results[i].name;
    const gender = data.results[i].gender;
       //Store all elements
    // const div = document.createElement("div");

    // div.textContent = name;
    // resultTag.appendChild(div);

    console.log("----------");
    console.log(data);
    console.log(data.results[i].gender);
    let result = document.querySelector(".resultRow");

    let clone = result.cloneNode(true);
    let idField = clone.querySelector("#id");
    let nameField = clone.querySelector("#name");
    let genderField = clone.querySelector("#gender");

    console.log(clone);
    idField.innerHTML = id;
    nameField.innerHTML = name;
    genderField.innerHTML = gender;

    resultTag.appendChild(clone);

    readMoreData()
    // div.textContent = gender;
    // resultTag.appendChild(div);
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


function readMoreData(){
  let read = document.querySelectorAll(".read");
    let readmore = document.querySelector('.readMore')
    let result = document.querySelector(".resultRow");
    console.log(read);
    read.forEach((e) => {
      console.log(e);
      e.addEventListener("click", () => {
        console.log("Du tryckte på read more");
        readmore.setAttribute("class", "showReadMore")
        result.setAttribute("class", "hideResult")

        // if sats som gör när knappen read more trycks visa detaljvyn och display none på result
      });
    });
}

//ID figma = 1:a resultat 2:a, 3:dje osv
//Deras home planet
//Kunna dölja noding bar - aktivera/inaktivera hide/show en klass
