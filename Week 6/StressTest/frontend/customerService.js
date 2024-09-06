const HOST_URL = "http://localhost:8080";
const CUSTOMER_SERVICE_URL = `${HOST_URL}/customer/`;
const CUSTOMER_SERVICE_URL_ALL_USERS = `${CUSTOMER_SERVICE_URL}all`;
const CUSTOMER_SERVICE_URL_SEARCH_USERS = `${CUSTOMER_SERVICE_URL}search`;

let currentPage = 0; // Track the current page
const pageSize = 5; // Set the number of items per page
let sortBy = 'id'; // Default sort field
let order = 'Descending'; // Default sort order

function renderUserRow(user) {
    return `
        <tr id="userRow${user.id}">
            <th scope="row">${user.id}</th>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td class="d-flex justify-content-end"><button type="button" onclick="deleteUser(${user.id})" class="btn btn-danger btn-md me-2">Delete</button><button type="button" onclick="openUpdateModal(${user.id}, '${user.firstName}', '${user.lastName}')" class="btn btn-primary btn-md me-2">Update</button></td>
        </tr>
    `;
}

async function deleteUser(userId) {
    try {
        const response = await fetch(CUSTOMER_SERVICE_URL + userId, {
            method: "DELETE",
        });

        if (response.ok) {
            // User deleted successfully, refresh the table
            await loadUserTable(currentPage);
        } else {
            // Handle error case
            console.error("Error deleting user:", response.status);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

async function updateUser(event) {
    event.preventDefault(); // Prevent form submission

    const userId = document.getElementById("updateUserId").value;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;

    const updatedUser = {
        firstName: firstName,
        lastName: lastName,
    };

    try {
        const response = await fetch(CUSTOMER_SERVICE_URL + userId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedUser),
        });

        if (response.ok) {
            // User updated successfully, refresh the table
            await loadUserTable(currentPage);
            closeUpdateModal(); // Close the modal
        } else {
            console.error("Error updating user:", response.status);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}


async function createUser(event) {
    event.preventDefault(); // Prevent form submission

    const firstName = document.getElementById("create_firstName").value;
    const lastName = document.getElementById("create_lastName").value;

    const newUser = {
        firstName: firstName,
        lastName: lastName,
    };
    console.log(newUser);
    try {
        const response = await fetch(CUSTOMER_SERVICE_URL + "create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
        });

        if (response.ok) {
            // User created successfully, refresh the table
            await loadUserTable(currentPage);
            closeCreateModal(); // Close the modal
        } else {
            console.error("Error creating new user:", response.status);
        }
    } catch (error) {
        console.error("Error:", error);
    }

    console.log(newUser);
}

// Attach the updateUser function to the form submission
document.getElementById("updateUserForm").addEventListener("submit", updateUser);
document.getElementById("createUserForm").addEventListener("submit", createUser);

function openUpdateModal(userId, firstName, lastName) {
    document.getElementById("updateUserId").value = userId;
    document.getElementById("firstName").value = firstName;
    document.getElementById("lastName").value = lastName;
    document.getElementById("updateUserModal").style.display = "block";
}

function openCreateModal() {
    document.getElementById("createUserModal").style.display = "block";
}

function closeCreateModal() {
    document.getElementById("createUserModal").style.display = "none";
}

function closeUpdateModal() {
    document.getElementById("updateUserModal").style.display = "none";
}



// Function to load user table
async function loadUserTable(pageNo = 0, keyword = '') {
    let url;

    if (keyword) {
        // Use search URL if a keyword is provided
        url = `${CUSTOMER_SERVICE_URL_SEARCH_USERS}?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&order=${order}&keyword=${keyword}`;
    } else {
        // Use all users URL if no keyword is provided
        url = `${CUSTOMER_SERVICE_URL_ALL_USERS}?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&order=${order}`;
    }

    // Get User Data
    let customerResponse = await sendHttpRequest(url);

    console.log(customerResponse);

    let customerData = await customerResponse.content; // Access the content of the Page object
    let totalPages = customerResponse.totalPages; // Get total pages for pagination

    // Re-render the User Table
    let customerTblBody = document.getElementById("customerTblBody");
    customerTblBody.innerHTML = "";

    customerData.forEach((customer) => {
        customerTblBody.innerHTML += renderUserRow(customer);
    });

    // Update pagination controls
    updatePaginationControls(pageNo, totalPages);
}



// Function to search for users
function search() {
    const keyword = document.getElementById("search-input").value; // Get the search keyword
    loadUserTable(currentPage, keyword); // Load the user table with the search keyword
}

// Attach the search function to the input
document.getElementById("search-input").addEventListener("keyup", search);

// Initial load of all users on page load
document.addEventListener("DOMContentLoaded", () => {
    loadUserTable(currentPage); // Load all users initially
});

// Attach the search function to the input
document.getElementById("search-input").addEventListener("keyup", search);

// Initial load of all users on page load
document.addEventListener("DOMContentLoaded", () => {
    loadUserTable(currentPage); // Load all users initially
});

function updatePaginationControls(currentPage, totalPages) {
    const paginationContainer = document.getElementById("paginationControls");
    paginationContainer.innerHTML = ""; // Clear existing controls

    const paginationList = document.createElement("ul");
    paginationList.className = "pagination";

    // Previous button
    const prevItem = document.createElement("li");
    prevItem.className = "page-item" + (currentPage === 0 ? " disabled" : ""); // Disable if on the first page
    const prevLink = document.createElement("a");
    prevLink.className = "page-link";
    prevLink.innerText = "Previous";
    prevLink.href = "#";
    prevLink.onclick = () => {
        if (currentPage > 0) {
            loadUserTable(currentPage - 1);
        }
    };
    prevItem.appendChild(prevLink);
    paginationList.appendChild(prevItem);

    // Page number buttons
    for (let i = 0; i < totalPages; i++) {
        const pageItem = document.createElement("li");
        pageItem.className = "page-item" + (i === currentPage ? " active" : ""); // Highlight current page
        const pageLink = document.createElement("a");
        pageLink.className = "page-link";
        pageLink.innerText = i + 1; // Display page numbers starting from 1
        pageLink.href = "#";
        pageLink.onclick = () => {
            loadUserTable(i);
        };
        pageItem.appendChild(pageLink);
        paginationList.appendChild(pageItem);
    }

    // Next button
    const nextItem = document.createElement("li");
    nextItem.className = "page-item" + (currentPage === totalPages - 1 ? " disabled" : ""); // Disable if on the last page
    const nextLink = document.createElement("a");
    nextLink.className = "page-link";
    nextLink.innerText = "Next";
    nextLink.href = "#";
    nextLink.onclick = () => {
        if (currentPage < totalPages - 1) {
            loadUserTable(currentPage + 1);
        }
    };
    nextItem.appendChild(nextLink);
    paginationList.appendChild(nextItem);

    // Append the pagination list to the container
    paginationContainer.appendChild(paginationList);
}
// Sorting function
function setSorting(newSortBy) {
    if (sortBy === newSortBy) {
        // Toggle order if the same field is clicked
        order = (order === 'Ascending') ? 'Descending' : 'Ascending';
    } else {
        // Set new sort field and default to ascending
        sortBy = newSortBy;
        order = 'Ascending';
    }

    // Reload the user table with the current keyword (if any)
    const keyword = document.getElementById("search-input").value;
    loadUserTable(currentPage, keyword);

    // Update sorting icons
    updateSortingIcons();
}

// Function to update sorting icons
function updateSortingIcons() {
    const idHeader = document.getElementById("idSortIcon");
    const idHeaderDown = document.getElementById("idSortIconDown");
    const firstNameHeader = document.getElementById("firstNameSortIcon");
    const firstNameHeaderDown = document.getElementById("firstNameSortIconDown");
    const lastNameHeader = document.getElementById("lastNameSortIcon");
    const lastNameHeaderDown = document.getElementById("lastNameSortIconDown");

    // Reset icons
    idHeader.style.display = 'none';
    idHeaderDown.style.display = 'none';
    firstNameHeader.style.display = 'none';
    firstNameHeaderDown.style.display = 'none';
    lastNameHeader.style.display = 'none';
    lastNameHeaderDown.style.display = 'none';

    // Set icons based on current sorting
    if (sortBy === 'firstName') {
        if (order === 'Ascending') {
            firstNameHeader.style.display = 'inline'; // Show up icon
        } else {
            firstNameHeaderDown.style.display = 'inline'; // Show down icon
        }
    } else if (sortBy === 'lastName') {
        if (order === 'Ascending') {
            lastNameHeader.style.display = 'inline'; // Show up icon
        } else {
            lastNameHeaderDown.style.display = 'inline'; // Show down icon
        }
    } else if (sortBy === 'id') {
        if (order === 'Ascending') {
            idHeader.style.display = 'inline'; // Show up icon
        } else {
            idHeaderDown.style.display = 'inline'; // Show down icon
        }
    }
}

async function sendHttpRequest(url, method = "GET", toJson = true, body = null) {
    let response = await fetch(url, {
        method: method,
        body: body,
    });

    if (toJson) {
        return response.json();
    } else {
        return response;
    }
}

// Load the first page of users on initial load
loadUserTable(currentPage);