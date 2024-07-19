document.addEventListener('DOMContentLoaded', function() {
    fetch('https://restcountries.com/v3.1/subregion/South-Eastern%20Asia')
      .then(response => response.json())
      .then(data => {
        const container = document.getElementById('countries-container');
        data.forEach(country => {
          const countryCard = document.createElement('div');
          countryCard.className = 'col-md-4 country-card';
          countryCard.innerHTML = `
            <div class="card">
              <img src="${country.flags.png}" class="card-img-top" alt="${country.name.common} flag">
              <div class="card-body">
                <h5 class="card-title">${country.name.common}</h5>
                <p><strong>Population:</strong> ${country.population.toLocaleString()} people</p>
                <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
              </div>
            </div>
          `;
          container.appendChild(countryCard);
        });
      });
  });