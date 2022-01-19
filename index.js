function create() {
    let caracter = {}
    let name = document.querySelector('#caracter-name').value
    let breed = document.getElementsByName('breed')
    let age = Number(document.querySelector('#caracter-age').value)

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
    console.log(caracter)
}

function onLoadUpdate () {
    let select = document.querySelector('#caracters')
    carcs = {
        0: {
            name: 'a',
            age: 10,
            breed: 'elf',
            id: '0.465464654'
        },
        1: {
            name: 'b',
            age: 13,
            breed: 'orc',
            id: '0.46564654'
        },
        2: {
            name: 'c',
            age: 130,
            breed: 'elf',
            id: '0.46ds5464654'
        },
        3: {
            name: 'a',
            age: 10,
            breed: 'elf',
            id: '0.465464654'
        },
        4: {
            name: 'a',
            age: 10,
            breed: 'elf',
            id: '0.465464654'
        }
    }
    for (info in carcs) {
        let op = document.createElement('option')
        op.setAttribute('id', carcs[info].id)
        op.setAttribute('class', 'op')
        op.innerText = carcs[info].name
        select.appendChild(op)
    }
}

function update () {

    let opSelect = document.querySelector('.op')
    for (op in opSelect) {
        if (opSelect[op].selected)
    }

    let caracter = {}
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