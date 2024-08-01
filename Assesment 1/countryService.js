fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        const container = document.getElementById('countries-container');
        data.forEach(country => {
          const countryCard = document.createElement('div');
          countryCard.className = 'col-md-4 country-card';
          countryCard.innerHTML = `
            <div class="card">
              <img src="${country.flags.png}" class="card-img-top" alt="${country.name.common} flag">
              <div class="card-body">
                <h5 class="card-title">${country.name.common}</h5>
                <p><strong>Capital:</strong> ${country.capital != undefined ? country.capital : 'N/A'} </p>
                <p><strong>Region:</strong> ${country.region}</p>
                <p><strong>Languages:</strong> ${country.languages}</p>
                <p><strong>Population:</strong> ${country.population.toLocaleString()} </p>
                <p><strong>Timezones:</strong> ${country.timezones} </p>
                
              </div>
            </div>
          `;
          container.appendChild(countryCard);
    });
});



//Search function
const searchButton = document.getElementById("searchbutton");
searchButton.addEventListener(
    "click",searchCountries
)


function searchCountries(){
    let searchInput = document.getElementById("searchInput");
    let searchValue = searchInput.value;
    
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        const container = document.getElementById('countries-container');
        container.innerHTML = ``;
        data.forEach(country => {
          if(searchValue == country.name.common){
          const countryCard = document.createElement('div');
          countryCard.className = 'col-md-4 country-card';
          countryCard.innerHTML = `
            <div class="card">
              <img src="${country.flags.png}" class="card-img-top" alt="${country.name.common} flag">
              <div class="card-body">
                <h5 class="card-title">${country.name.common}</h5>
                <p><strong>Capital:</strong> ${country.capital != undefined ? country.capital : 'N/A'} </p>
                <p><strong>Region:</strong> ${country.region}</p>
                <p><strong>Languages:</strong> ${country.languages}</p>
                <p><strong>Population:</strong> ${country.population.toLocaleString()} </p>
                <p><strong>Timezones:</strong> ${country.timezones} </p>
                
              </div>
            </div>
          `;
          container.appendChild(countryCard);
          } else{
            const countryCard = document.createElement('div');
            countryCard.className = 'col-md-4 country-card';
            countryCard.innerHTML = ``
            
          }
          if(searchValue == country.region){
            const countryCard = document.createElement('div');
            countryCard.className = 'col-md-4 country-card';
            countryCard.innerHTML = `
              <div class="card">
                <img src="${country.flags.png}" class="card-img-top" alt="${country.name.common} flag">
                <div class="card-body">
                  <h5 class="card-title">${country.name.common}</h5>
                  <p><strong>Capital:</strong> ${country.capital != undefined ? country.capital : 'N/A'} </p>
                  <p><strong>Region:</strong> ${country.region}</p>
                  <p><strong>Languages:</strong> ${country.languages}</p>
                  <p><strong>Population:</strong> ${country.population.toLocaleString()} </p>
                  <p><strong>Timezones:</strong> ${country.timezones} </p>
                  
                </div>
              </div>
            `;
            container.appendChild(countryCard);
            } else{
              const countryCard = document.createElement('div');
              countryCard.className = 'col-md-4 country-card';
              countryCard.innerHTML = ``
              
            }
    });
});
}
const regionArray = ['Antarctic', 'Americas', 'Europe', 'Africa', 'Asia', 'Oceania'];
const subregionArray = ['Caribbean', 'Western Europe', 'Western Africa', 'Central Europe', 'Eastern Asia', 'Polynesia', 'Northern Africa', 'Southern Europe', 'South-Eastern Asia', 'Eastern Africa', 'Southern Africa', 'North America', 'Middle Africa', 
    'Micronesia', 'Southeast Europe', 'Western Asia', 'Northern Europe', 'Melanesia', 'Central Asia', 'Southern Asia', 'South America', 'Australia and New Zealand', 'Central America', 'Eastern Europe'];

function filter(region){
    console.log(region);
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        const container = document.getElementById('countries-container');
        container.innerHTML = ``;
        data.forEach(country => {
          if(region == country.region){
          const countryCard = document.createElement('div');
          countryCard.className = 'col-md-4 country-card';
          countryCard.innerHTML = `
            <div class="card">
              <img src="${country.flags.png}" class="card-img-top" alt="${country.name.common} flag">
              <div class="card-body">
                <h5 class="card-title">${country.name.common}</h5>
                <p><strong>Capital:</strong> ${country.capital != undefined ? country.capital : 'N/A'}</p>
                <p><strong>Region:</strong> ${country.region}</p>
                <p><strong>Languages:</strong> ${country.languages}</p>
                <p><strong>Population:</strong> ${country.population.toLocaleString()} </p>
                <p><strong>Timezones:</strong> ${country.timezones} </p>
                
              </div>
            </div>
          `;
          container.appendChild(countryCard);
          } else{
            const countryCard = document.createElement('div');
            countryCard.className = 'col-md-4 country-card';
            countryCard.innerHTML = ``
            
          }
        });
});
}
// function regionList(){
//     fetch('https://restcountries.com/v3.1/all')
//       .then(response => response.json())
//       .then(data =>{
//         data.forEach(country => {
//             // console.log(regionArray.indexOf(country.region))
//             // console.log(country.region);
//             if(regionArray.indexOf(country.region) == -1){
//                 regionArray.push(country.region);
//             }
//             if(country.subregion != undefined){
//                 if(subregionArray.indexOf(country.subregion) == -1){
//                     subregionArray.push(country.subregion);
//                 }
//             }
//         });

//         console.log(regionArray);
//         console.log(subregionArray);
        
//       });
// }










