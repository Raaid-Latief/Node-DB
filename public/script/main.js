alert('Please Login')

fetch('https://raaid.herokuapp.com/users').then((res) => res.json()).then((data) => {console.log(data)})


