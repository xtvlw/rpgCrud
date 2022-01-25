
const url = new URL('http://0.0.0.0:3000/')



let server = {
    method: "POST",
    headers: {
         "Content-Type": "application/json"
    },
    body: JSON.stringify({user_id: 'main'})
}


//create a json with caracters values, {name, age, breed, id}
function create() {
    let dataUser = JSON.parse(localStorage.getItem('user'))
    let caracter = {}
    let name = document.querySelector('#caracter-name').value
    let breed = document.getElementsByName('breed')
    let age = Number(document.querySelector('#caracter-age').value)

    if (name == '' || breed == '' || age == 0) {
        alert('insert the caracter informations')
    }
    caracter['user_id'] = dataUser.user
    caracter['id'] = Math.random().toString()
    caracter['name'] = name
    caracter['age'] = age
    for (arg in breed) {
        if (breed[arg].checked) {
            caracter['breed'] = breed[arg].id
        }
    }
    server['body'] = JSON.stringify(caracter)
    fetch(url+'create', server)
        .then(res => {
            alert(`caracter was created!`)
        })
}

//load the caracter to the select tag
function loadCaracters () {
    let dataUser = JSON.parse(localStorage.getItem('user'))
    let selectElem = document.querySelector('#caracters')
    fetch(url+'getAll', server)
        .then(server => server.json())
        .then(caractersConfg => {
            dataUser = caractersConfg
            console.log(dataUser)
            for (caracter in caractersConfg){
                let optionElem = document.createElement('option')
                optionElem.setAttribute('id', caractersConfg[caracter].id)
                optionElem.innerText = caractersConfg[caracter].name
                selectElem.appendChild(optionElem)
        }
    })
}

//change to the corrent selected caracter and update the display info
function onUpdate () {
    let selectIndex = document.getElementById('caracters').selectedIndex
    let listElem = document.getElementById('detail-info')
    listElem.innerHTML = ''

    let infoCaracter = dataUser[selectIndex]
    for (i in infoCaracter) {
        let inf = document.createElement('li')
        inf.innerText = `${i}: ${infoCaracter[i]}`
        listElem.appendChild(inf)
    }
}

//generate a json with the values {name, age, breed, id}
function update () {
    let idElem = document.querySelector('#caracters')
    let caracterId = idElem.options[idElem.selectedIndex].id
    let newName = document.querySelector('#caracter-name').value
    let newAge = parseInt(document.querySelector('#caracter-age').value)
    let newBreed = document.getElementsByName('breed')
    
    let newCaracter = {}

    for (breed in newBreed) {
        if (newBreed[breed].checked){
            newCaracter['breed'] = newBreed[breed].id //in the element id was declared as the breed
            console.log(newCaracter)
        }
    }
    newCaracter['age'] = newAge
    newCaracter['name'] = newName
    newCaracter['id'] = caracterId
    newCaracter['user_id'] = dataUser.user_id

    // sending to the server
    server.body = JSON.stringify(newCaracter)
    fetch(url+'update', server)
        .then(console.log(`${newCaracter} was updated`))

    location.reload()
}

//get the id to delete the caracter
function DelCaracter () {
    let idElem = document.querySelector('#caracters')
    let id = {
        id: idElem.options[idElem.selectedIndex].id,
        user_id: dataUser[0].user_id
    }
    console.log(id)
    server['body'] = JSON.stringify(id)
    fetch(url+'delete', server)
        .then(alert('DELETED'))

    location.reload()
}



function createrCaracter () {
    let loginText = document.querySelector('#login').value
    let passwordText = document.querySelector('#pass').value
    let confirmPassText = document.querySelector('#conf-pass').value
    
    if (loginText == '' || passwordText == '' || confirmPassText == '') {
        alert('insert data!')
    } else if (passwordText != confirmPassText) {
        alert("password don't met!")
    } else {
        let newUser = {
            login: loginText,
            password: passwordText,
            user_id: Math.random().toString()
        }
        server['body'] = JSON.stringify(newUser)
        fetch(url+'createUser', server)
            .then(response => response.json())
            .then(alert('user created'))
    }
    location.reload()
}

function loginCaracter () {
    let loginText = document.querySelector('#login').value
    let passwordText = document.querySelector('#pass').value
    if (loginText == '' || passwordText == '') {
        alert('insert data!')
    } else {
        let user = {
            login: loginText,
            password: passwordText
        }
        server['body'] = JSON.stringify(user)
        fetch(url+'loginUser', server)
            .then(response => response.json())
            .then(data => {
                if (data.status == 'error') {
                    alert('user not foud!')
                } else {
                    dataUser = {user: data.user_id}
                    let localstorage = localStorage.setItem('user', json.stringify(dataUser))
                }
            })
    }
   window.location.href='./index.html'
}
