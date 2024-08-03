const staffAPI = `https://randomuser.me/api/?results=20`;
// Use the errorStaff to test the catch error
// const errorStaff = `https://randomuser.me/apis/?results=20`

getStaff();
function getStaff(){
    fetch(staffAPI)
    .then(response => {
        if(!response.ok){
            console.log("An error occurs while retrieving our staff data");

            const container = document.getElementById(`staffs-container`);
            const staffCard = document.createElement('div');
            staffCard.className = 'col-md-4 staff-card';
            staffCard.innerHTML = `
                <div class="card">
                    
                <div class="card-body">
                    <h1>An error occurs while retrieving our staff data</h1>
                </div>
                </div>
          `;
            container.appendChild(staffCard);
            // throw new Error(`HTTP error! Status: ${response.status}`);

            
        }
        return response.json();
    })
    .then(data =>{
        console.log(data);
        const container = document.getElementById(`staffs-container`);
        data.results.forEach(staff => {
            console.log(staff)

            const staffCard = document.createElement('div');
            staffCard.className = 'col-xs-6 col-sm-4 col-lg-3';
            staffCard.innerHTML = `
                <div id="card-entire" class="card">
                    
                <div class="card-body">
                <img id="card-img"  src="${staff.picture.large}" class="card-img-top" alt="${staff.name}" >
                    <p class="card-title"><strong>${staff.name.first} ${staff.name.last}</strong></p>
                    <p>${staff.email}</p>
                    <p ><strong>City:  </strong> ${staff.location.city} <a href ="https://www.google.com/maps/search/${staff.location.city}" target="_blank" rel="noopener noreferrer" class="fa-solid fa-location-dot"></a></p>
                    <p ><strong>City:  </strong> ${staff.location.country}</p>
                    
                
                </div>
                </div>
          `;
          container.appendChild(staffCard);
        })
    })  
}


function searchStaffs(){
    let searchInput = document.getElementById("search-input");
    let searchValue = searchInput.value;
    console.log(searchValue);

    fetch(staffAPI)
    .then(response => {
        if(!response.ok){
            console.log("An error occurs while retrieving our staff data");

            const container = document.getElementById(`staffs-container`);
            const staffCard = document.createElement('div');
            staffCard.className = 'col-md-4 staff-card';
            staffCard.innerHTML = `
                <div class="card">
                    
                <div class="card-body">
                    <h1>An error occurs while retrieving our staff data</h1>
                </div>
                </div>
          `;
            container.appendChild(staffCard);
            // throw new Error(`HTTP error! Status: ${response.status}`);

            
        }
        return response.json();
    })
    .then(data =>{
        console.log(data);
        const container = document.getElementById(`staffs-container`);
        data.results.forEach(staff => {
            if(searchValue == staff.name.first){
            console.log(staff)

            const staffCard = document.createElement('div');
            staffCard.className = 'col-md-4 staff-card';
            staffCard.innerHTML = `
                <div id="card-entire" class="card">
                    
                <div class="card-body">
                <img id="card-img"  src="${staff.picture.large}" class="card-img-top" alt="${staff.name}" >
                    <p class="card-title"><strong>${staff.name.first} ${staff.name.last}</strong></p>
                    <p>${staff.email}</p>
                    <p ><strong>City:  </strong> ${staff.location.city} <i class="fa-solid fa-location-dot"></i></p>
                    <p ><strong>City:  </strong> ${staff.location.country}</p>
                    
                
                </div>
                </div>
          `;
          container.appendChild(staffCard);
            } else{
                const staffCard = document.createElement('div');
                staffCard.className = 'col-md-4 country-card';
                staffCard.innerHTML = ``
                
              }
        })
    }) 
    
}

