class errors {

    constructor(type, name, description) {

        this.type = type;
        this.name = name;
        this.description = description;

    }

}

let errorStorage = [];

export function newError(type, name, description) {

    let createError = new errors(type, name, description);

    errorStorage.push(createError);

    showError();



}

function showError() {

    let errorContainer = document.querySelector(".alert");

    
    errorStorage.forEach((element, index) => {

        
        errorStorage.splice(index, 1);
        // let newAlert = document.createElement("div");
        // newAlert.classList.add("alert", "error", "bg-danger", "text-white", "rounded-2", "mt-4", "alert-dismissible", "fade");
    
        // let typeSpan = document.createElement("span");
        // typeSpan.classList.add("type");
        // typeSpan.innerHTML = element.type;
        // newAlert.appendChild(typeSpan);

        // let titleSpan = document.createElement("span");
        // titleSpan.classList.add("title");
        // titleSpan.innerHTML = element.name;
        // newAlert.appendChild(titleSpan);

        // let descriptionSpan = document.createElement("span");
        // descriptionSpan.classList.add("description");
        // descriptionSpan.innerHTML = element.description;
        // newAlert.appendChild(descriptionSpan);

        // let button = document.createElement("button");
        // button.classList.add("")
        let alertArea = document.querySelector(".alertArea");

        let clone = errorContainer.cloneNode(true);
        clone.classList.add("show");
        clone.classList.add("fastAnim");
        // newAlert.classList.add("show");

        // alertArea.appendChild(newAlert);

        let type = clone.querySelector(".type");
        type.innerHTML = element.type;

        let title = clone.querySelector(".title");
        title.innerHTML = element.name;

        let description = clone.querySelector(".description");
        description.innerHTML = element.description;

        alertArea.appendChild(clone);
        
        // errorContainer.classList.add("show");
        // type.innerText = element.type;
        // title.innerText = element.name;

    });


}