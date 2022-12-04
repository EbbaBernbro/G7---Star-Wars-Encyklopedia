// Class blueprint for creating and saving a error
class errors {

    constructor(type, name, description) {

        this.type = type;
        this.name = name;
        this.description = description;

    }

}

// Save array for all errors
let errorStorage = [];

// Create new error
export function newError(type, name, description) {

    let createError = new errors(type, name, description);

    errorStorage.push(createError);

    showError();



}

// Show error
function showError() {

    let errorContainer = document.querySelector(".alert");


    errorStorage.forEach((element, index) => {


        errorStorage.splice(index, 1);

        let alertArea = document.querySelector(".alertArea");

        let clone = errorContainer.cloneNode(true);
        clone.classList.add("show");
        clone.classList.add("fastAnim");


        let type = clone.querySelector(".type");
        type.innerHTML = element.type;

        let title = clone.querySelector(".title");
        title.innerHTML = element.name;

        let description = clone.querySelector(".description");
        description.innerHTML = element.description;

        alertArea.appendChild(clone);


    });


}