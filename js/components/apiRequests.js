

import * as errorHandler from './errorHandler.js';
import * as domModifier from './domModifier.js';
// This function does the actual fetching and returns json
// Uses try and catch to catch errors
// Uses await to wait for a response before the code continues..
export async function fetchApi(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {   
             //.json makes it an object that can be handled in javascript .json is asynchronous         
            const jsonResponse = await response.json();
            console.log(jsonResponse)    
            if(jsonResponse.results && jsonResponse.results.length == 0){   
                errorHandler.newError("Fel", "", "Hittade inget");    
            } 
            return jsonResponse;
           //Error handling in case something goes wrong
        } else {
            errorHandler.newError("error", "", "Hittade inga svar efter " + url);
            }

    } catch (error) {
       errorHandler.newError("error", "Api problem", "Något gick fel med api, " + response.status);
    }
}
//Function thats get the categories to the drop down
export function categoryFiller(){
    const dropdown = document.getElementById("dropdown"); // Selecting option element
    fetchApi("https://swapi.dev/api/") // Use predefined API function for async method
        .then(response => { // Await response
            for (let item in response) { // For every 
                let option = document.createElement("option"); // Create a new option element
                dropdown.append(option); // Append it to the dropdown
                let string = item; // Store the response item as a variable
                option.innerText = string.charAt(0).toUpperCase() + string.slice(1); // Set the text of the option to variable and make first letter uppercase
                option.value = item; // Set value to item name
            }
        })
}
    //Get data about what the user put in the searchfield 
export async function getData(id, subject, page) { //när man trycker på sök så aktiveras getdata
    const baseUrl = "https://swapi.dev/api/";

    if(!page){
         page = 1;
    }
    const url = `${baseUrl}${subject}/?search=${id}&page=${page}`;
    await fetchApi(url)
        .then(response => {
           
            setTimeout(() => {

                let spinner = document.querySelector(".loading");
                spinner.classList.add("hide");
                domModifier.renderData(response, id, subject);
                
            }, 400);
            

        });
     
}

