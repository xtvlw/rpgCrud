
const url = new URL('http://0.0.0.0:3000/')

let server = {
    method: "POST",
    headers: {
         "Content-Type": "application/json"
    }
}

//create a json with caracters values, {name, age, breed, id}
function create() {
    let caracter = {}
    let name = document.querySelector('#caracter-name').value
    let breed = document.getElementsByName('breed')
    let age = Number(document.querySelector('#caracter-age').value)

    if (name == '' || breed == '' || age == 0) {
        alert('insert the caracter informations')
    }
    caracter['user_id'] = 'main'
    caracter['id'] = Math.random().toString()
    caracter['name'] = name
    caracter['age'] = age
    for (arg in breed) {
        if (breed[arg].checked) {
            caracter['breed'] = breed[arg].id
        }
    }
    console.log(caracter.age)
    server['body'] = JSON.stringify(caracter)
    fetch(url+'create', server)
        .then(res => {
            console.log(res)
        })
}

//load the caracter to the select tag
function onLoadUpdate () {
    let select = document.querySelector('#caracters')

    for (info in carcs) {
        let op = document.createElement('option')
        op.setAttribute('id', carcs[info].id)
        op.setAttribute('class', 'op')
        op.innerText = carcs[info].name
        select.appendChild(op)
    }

}

//change to the corrent selected caracter and update the display info
function onUpdate () {
    let index = document.getElementById('caracters').selectedIndex
    let elem = document.getElementById('detail-info')
    elem.innerHTML = ''
    let infoCaracter = carcs[index]
    for (i in infoCaracter) {
        let inf = document.createElement('li')
        inf.innerText = `${i}: ${infoCaracter[i]}`
        elem.appendChild(inf)
    }
}

//generate a json with the values {name, age, breed, id}
function update () {
    let caracter = {}

    let opSelect = document.getElementById('caracters').selectedIndex
    let ops = document.getElementById('caracters').options
    caracter['id'] = ops[opSelect].id

    let name = document.querySelector('#caracter-name').value
    let breed = document.getElementsByName('breed')
    let age = parseInt(document.querySelector('#caracter-age').value)

    if (name == '' || breed == '' || age == 0) {
        alert('insert the caracter informations')
    }

    caracter['id'] = Math.random().toString()
    caracter['name'] = name
    caracter['age'] = age
    for (arg in breed) {
        if (breed[arg].checked) {
            caracter['breed'] = breed[arg].id
        }
    }
}

//get the id to delete the caracter
function DelCaracter () {
    let opSelect = document.getElementById('caracters').selectedIndex
    let ops = document.getElementById('caracters').options
    let id = ops[opSelect].id
}
