

import * as errorHandler from './errorHandler.js';
import * as domModifier from './domModifier.js';

const baseUrl = "https://swapi.dev/api/";


async function fetchApi(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            
            const jsonResponse = await response.json();

         
            if(jsonResponse.results.length == 0){
    
                errorHandler.newError("Fel", "", "Hittade inget");
    
            }
            
            return jsonResponse;
        }
       
        else {
           
            errorHandler.newError("error", "", "Hittade inga svar efter " + url);
        }

    } catch (error) {
       
        errorHandler.newError("error", "Api problem", "Något gick fel med api, " + response.status);
    }
}

export async function getData(id, subject, page) {
    let answer;

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

