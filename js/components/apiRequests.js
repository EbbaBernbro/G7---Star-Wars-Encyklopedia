

import * as errorHandler from './errorHandler.js';
import * as domModifier from './domModifier.js';

export async function fetchApi(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {            
            const jsonResponse = await response.json();
            console.log(jsonResponse)    
            if(jsonResponse.results && jsonResponse.results.length == 0){   
                errorHandler.newError("Fel", "", "Hittade inget");    
            } 
            return jsonResponse;
        } else {
            errorHandler.newError("error", "", "Hittade inga svar efter " + url);
            }

    } catch (error) {
       errorHandler.newError("error", "Api problem", "Något gick fel med api, " + response.status);
    }
}

export function categoryFiller(){
    const dropdown = document.getElementById("dropdown");
    fetchApi("https://swapi.dev/api/")
        .then(response => {
            for (let item in response) {
                let option = document.createElement("option");
                dropdown.append(option);
                let string = item;
                option.innerText = string.charAt(0).toUpperCase() + string.slice(1);
                option.value = item;
            }
        })
}

export async function getData(id, subject, page) {
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
                
            }, 2000);
            

        });
     
}

