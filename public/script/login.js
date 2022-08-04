async function Login(e) {
    e.preventDefault();
    const response = await fetch(
      "https://uzairs-e-commerce.herokuapp.com/users/login",
      {
        method: "POST",
        body: JSON.stringify({
          email: document.querySelector("#email").value,
          password: document.querySelector("#password").value,
        }),
        headers: {
          "content-type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    alert("Logged in successfully");
    return data;
  }