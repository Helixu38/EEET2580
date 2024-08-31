const HOST_URL = "http://localhost:8080";
const CUSTOMER_SERVICE_URL = `${HOST_URL}/customer/`;
const CUSTOMER_SERVICE_URL_ALL_USERS = `${CUSTOMER_SERVICE_URL}all`;


function renderUserRow(user) {
    return `
        <tr id="userRow${user.id}">
            <th scope="row">${user.id}</th>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td><button type="button" onclick="deleteUser(${user.id})" class="btn btn-danger">Delete</button></td>
        </tr>
    `
}

async function deleteUser(userId) {
    try {
        const response = await fetch(CUSTOMER_SERVICE_URL + userId, {
            method: 'DELETE',
        });

        if (response.ok) {
            // User deleted successfully, refresh the table
            await loadUserTable();
        } else {
            // Handle error case
            console.error('Error deleting user:', response.status);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function loadUserTable() {
    // Get User Data
    let customerResponse = await sendHttpRequest(
                                CUSTOMER_SERVICE_URL_ALL_USERS
                            );

    console.log(customerResponse);

    let customerData = await customerResponse;
            
    // Re-render the User Table
    let customerTblBody = document.getElementById('customerTblBody');
    
    customerTblBody.innerHTML = '';

    customerData.forEach(customer => {
        customerTblBody.innerHTML += renderUserRow(customer);
    });
}

async function sendHttpRequest(url, method = 'GET', toJson = true, body = null) {

    let response = await fetch(url, {
        method: method,
        body: body
    })

    if (toJson) {
        return response.json();
    } else {
        return response;
    }
}

loadUserTable();