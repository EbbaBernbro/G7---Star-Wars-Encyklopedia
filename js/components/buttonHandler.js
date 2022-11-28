// Tar emot inputs ifrån sidan, skickar de vidare
// benjamin
// search api call på apin och apin ska kalla på dom modifier      -    addEventListener skickar request om api data till jenny api sedan skickas det till dommodifier sen läggs det up på sidan

// search
/*const btnToSearch = document.querySelector(".searchBtn");
// ska en validerings funktion regex

btnToSearch.addEventListener("click", getData("strängvärde", "subjekt")*/
import * as api from './apiRequests.js';
const btnToSearch = document.querySelector(".searchBtn");
export function getValueOnClick() {
  btnToSearch.addEventListener("click", () => {
    let value = document.querySelector(".search").value;
    console.log(value);
    let subject = document.querySelector(".selectType").value
    console.log(subject)
    api.getData(value, subject)
  });
}
getValueOnClick();









export function readMore(){


  
}








// read more
/*export function btnReadMore(){
  const btnToSearch = document.querySelector('.btn btn-primary');
  btnToSearch.addEventListener('click', hej)
};




//back to search
export function btnBackToSearch(){
  const btnToSearch = document.querySelector('.searchBtn');
  btnToSearch.addEventListener('click', hej)
};*/

// read more tömma första diven. visar ny api request              -    töm befintliga diven sedan visa detaljvy

// export function clickedButton(){
//     return "Du tryckte på knappen";
// }
