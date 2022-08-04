alert('Please Login')


let users = [];

const userContainer = document.getElementById("users");

fetch('http://localhost:6969/users')
  .then((res) => res.json())
  .then((data) => {
    users = data;
    console.log(data);
    showUsers(data);
  });

function showUsers(users) {
  //   prodContainer.innerHTML = "";
  users.forEach((user) => {
    userContainer.innerHTML += `
    <div class="col-md-6 d-flex justify-content-center my-4">
        <div id="users" clas="w-100">
            <div class='text-center'>
                <h2 id="userId">${user.user_id}</h2>
                <h4 id="userFullName">${user.full_name}</h4>
                <p id="userBillingAddress">Billing Address: ${user.billing_address}</p>
                <p id="userDefaultShippingAddress">Shipping Address: ${user.default_shipping_address}</p>
                <p id="userCountry">Country: ${user.country}</p>
                <p id="userPhone">Phone: ${user.phone}</p>
                <p id="userType">User Type: ${user.user_type}</p>
            </div>
        </div>
    </div>
    `;
  });
}
