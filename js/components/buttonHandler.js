// Tar emot inputs ifrån sidan, skickar de vidare
// benjamin
// search api call på apin och apin ska kalla på dom modifier      -    addEventListener skickar request om api data till jenny api sedan skickas det till dommodifier sen läggs det up på sidan

// search
export function getValueOnClick() {
  const btnToSearch = document.querySelector(".searchBtn");
  btnToSearch.addEventListener("click", () => {
    let value = document.querySelector(".search").value;
    console.log(value);
  });
}

/*let searchInput = document.querySelector(".search")

export function btnSearch(){
  const btnToSearch = document.querySelector('.searchBtn');
  btnToSearch.addEventListener('click', (e) =>{
    console.log()
  }
  )
};*/

//getData
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

// komma tillbaka till search sidan                                -    visa första diven igen
