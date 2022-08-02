alert('Please Login')

fetch('http://localhost:6969/users').then((res) => res.json()).then((data) => {console.log(data)})

const url = "http://localhost:6969/users";
const users = [];


