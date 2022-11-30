// Här hämtar vi data ifrån Swapi och skickar det tillbaka med en return funktion

import * as errorHandler from './errorHandler.js';
import * as domModifier from './domModifier.js';

const baseUrl = "https://swapi.dev/api/";

// Denna funktionen gör själva hämtningen och returnerar json
// Använder try och catch för att fånga upp fel
// Använder await för att vänta in svar innan koden forsätter.
async function fetchApi(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            //.json gör det till ett objekt som går att hantera i javascript .json är asynkront 
            const jsonResponse = await response.json();

            console.log(jsonResponse.results.length);
            if(jsonResponse.results.length == 0){
    
                errorHandler.newError("Fel", "", "Hittade inget");
    
            }
            
            return jsonResponse;
        }
        //Felhantering la även in ifall det skulle bli något fel 
        else {
            console.log("Ett fel uppstod vid hämtningen");
            errorHandler.newError("error", "", "Hittade inga svar efter " + url);
        }

    } catch (error) {
        console.log(error);
        errorHandler.newError("error", "Api problem", "Något gick fel med api, " + response.status);
    }
}

// Hämtar data från api enligt ingående parametrar och returnerar svar (subject är planet eller people)
export async function getData(id, subject, page) {
    let answer;

    if(!page){
        page = 1;
    }
    const url = `${baseUrl}${subject}/?search=${id}&page=${page}`;
    await fetchApi(url)
        .then(response => {
            //return answer = response;
            console.log(response)
            domModifier.renderData(response, id);

        });
    // return answer;    
}

