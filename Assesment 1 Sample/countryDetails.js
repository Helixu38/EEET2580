//Get the name after user click on the card
console.log(new URLSearchParams(location.search).get('name'));
let countryName = new URLSearchParams(location.search).get('name')
let countryApiByName = `https://restcountries.com/v3.1/name/${countryName}`

getCountryByName();
function getCountryByName(){
    fetch(countryApiByName)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const container = document.getElementById('countries-container');
        data.forEach(country => {
          
          let countryList = [];
          // console.log(country)
          Object.keys(country.languages).forEach(
            languague =>{
              // console.log(country.languages[languague.toString()]);
              countryList.push(country.languages[languague.toString()]);
              // console.log(countryList);
            }
          )
          
          const countryDetail = document.createElement('div');
          countryDetail.className = 'country-details';
          countryDetail.style ="display: flex; align-items:center;gap:2pc ;margin-top : 2%"
          countryDetail.innerHTML = `
              <img  src="${country.flags.png}" class="card-img-top" alt="${country.name.common} flag">
              <div class="details-text">
                <h1>${country.name.common} </h1>
                <div style ="display:flex; flex-direction: column ; max-height: 150px ; flex-wrap: wrap ; gap:2pc">
                  <p><strong>Capital:</strong> ${country.capital != undefined ? country.capital : 'N/A'} </p>
                  <p><strong>Region:</strong> ${country.region}</p>
                  <p><strong>Languages:</strong> ${countryList}</p>
                  <p><strong>Population:</strong> ${country.population.toLocaleString()} </p>
                  <p><strong>Timezones:</strong> ${country.timezones} </p>
                </div>
              </div>
            
          `;
          container.appendChild(countryDetail);
          // console.log("Hello")  
    });
});
}

    


