// Tar emot inputs ifrån sidan, skickar de vidare

// export function clickedButton(){
//     return "Du tryckte på knappen";
// }
// benjamin
// search api call på apin och apin ska kalla på dom modifier      -    addEventListener skickar request om api data till jenny api sedan skickas det till dommodifier sen läggs det up på sidan
function init() {
  const searchBtn = document.getElementById('searchBtn');
  searchBtn.addEventListener(
      'click', 
      searchBtnClick
  );
}
init();


function searchBtnClick(){
  alert("Hej")
}
searchBtnClick();











// read more tömma första diven. visar ny api request              -    töm befintliga diven sedan visa detaljvy

// komma tillbaka till search sidan                                -    visa första diven igen
