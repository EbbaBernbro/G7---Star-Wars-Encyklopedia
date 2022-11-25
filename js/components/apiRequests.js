// Här hämtar vi data ifrån Swapi och skickar det tillbaka med en return funktion


const baseUrl = "https://swapi.dev/api/";

// Denna funktionen gör själva hämtningen och returnerar json
// Använder try och catch för att fånga upp fel
// Använder await för att vänta in svar innan koden forsätter.
async function fetchApi(url) {
    try{
        const response = await fetch(url);
        if(response.ok){
            //.json gör det till ett objekt som går att hantera i javascript .json är asynkront 
            const jsonResponse = await response.json(); 
            return jsonResponse;
        }
        //Felhantering la även in ifall det skulle bli något fel 
        else{
            console.log("Ett fel uppstod vid hämtningen");
        }
    }catch (error){
        console.log(error);
    }
}

// Hämtar data från api enligt ingående parametrar och returnerar svar (subject är planet eller people)
export async function getData(id, subject){
    let answer;
    const url=`${baseUrl}${subject}/?search=${id}`;
    await fetchApi(url)
        .then(response => {            
            //return answer = response;
            console.log(response)
        });
    // return answer;    
}

