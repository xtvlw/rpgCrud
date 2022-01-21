const cors = require('cors')
const db = require('mysql')
const express = require('express')

const app = express()
app.use(cors())
app.use(express.json())


app.post('/main', (req, res) => {
    console.log(req.body)
    res.json({
      'hello': 'world'
    })
})

app.listen(3000)

//Data base connection
// NEVER DO IT, it's for fun use and pratice, this code is very unsafe!
const con = db.createConnection({
    host: "localhost",
    user: "js",
    password: "pass",
    database: 'rpg'
  });
  
  con.connect(function(err) {
    if (err) throw err;
      console.log("Connected!");
  });


//json example, all functions ios based on this!
/*
data = {
  user_id: 'root122',
  id: '3cna',
  name: 'tank',
  bleed: 'human',
  age: 20,
  life: 100
}
*/

//create caracter

app.post('/create', (confg, res) => {
  confg = confg.body

  console.log(confg, typeof(confg))
  con.query(`CREATE TABLE IF NOT EXISTS ${confg.user_id} (id TEXT, name TEXT, bleed TEXT, age INT, life INT)`)
  con.query(`INSERT INTO ${confg.user_id} VALUES ('${confg.id}', '${confg.name}', '${confg.breed}', ${confg.age}, 100)`)
  res.json({ status: 'OK' })
})

//update the caracter
function update(newConfg) {
  con.query(`UPDATE ${newConfg.user_id} SET
      name='${newConfg.name}', bleed='${newConfg.bleed}', 
      age=${newConfg.age}, life=${newConfg.life}`)
}

//delete a expecidc caracter of the user
function destroi (confg) {
  con.query(`DELETE FROM ${confg.user_id} WHERE id='${confg.id}'`)
}



//return a json with all caracters of the user

function getAll (confg) {
  let dataCaracter = con.query(`SELECT * FROM ${confg.user_id}`, function (err, res) {
    if (err) throw err;
        console.log('ok')

    let result = {}
    for (dict in res) {
      let data = res[dict]
      result[dict] = {
        id: data.id,
        name: data.name,
        bleed: data.bleed,
        age: data.age,
        life: data.life
      }
    }
    console.log(result)
  })
}

