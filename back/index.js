const cors = require('cors')
const db = require('mysql')
const express = require('express')
const { response } = require('express')

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

app.post('/create', (confg, response) => {
  let caracterConfig = confg.body

  con.query(`CREATE TABLE IF NOT EXISTS ${caracterConfig.user_id} 
    (user TEXT, id TEXT, name TEXT, breed TEXT, age INT, life INT)`)

  con.query(`INSERT INTO ${caracterConfig.user_id} VALUES 
    ('${caracterConfig.user_id}', '${caracterConfig.id}', '${caracterConfig.name}', '${caracterConfig.breed}', ${caracterConfig.age}, 100)`)

  response.json({
    status: 'OK',
    name: caracterConfig.name
  })
})

//update the caracter
app.post('/update', (newConfg, res) => {
  newConfg = newConfg.body
  con.query(`UPDATE ${newConfg.user_id} SET name='${newConfg.name}', breed='${newConfg.breed}', age=${newConfg.age}, life=100 WHERE id=${newConfg.id}`)
      console.log('ok')
      res.json({
        status: 'OK',
        name: newConfg.name
      })
})

//delete a expecidc caracter of the user
app.post('/delete', (confg, response) => {
  confg = confg.body
  console.log(confg)
  con.query(`DELETE FROM ${confg.user_id} WHERE id=${confg.id}`)
  response.json({status: 'ok'})
})



// Return a json with all caracters

app.post('/getAll', (confg, response) => {
  let catacterConfg = confg.body
  let AllCaractersInfo = {}
  let dataFromDB = 
  con.query(`SELECT * FROM ${catacterConfg.user_id}`, 
    (error, SqlResponse) => {
      if (error) throw error;

      for (dataPosition in SqlResponse) {
          AllCaractersInfo[dataPosition] = {
            user_id: SqlResponse[dataPosition].user,
            id: SqlResponse[dataPosition].id,
            name: SqlResponse[dataPosition].name,
            breed: SqlResponse[dataPosition].breed,
            age: SqlResponse[dataPosition].age,
            life: SqlResponse[dataPosition].life
        }
      }
      console.log(AllCaractersInfo)
      response.json(AllCaractersInfo)
    })
  })


app.post('/createUser', (user, response) => {
  let userInfo = user.body
  con.query(`CREATE TABLE IF NOT EXISTS users (login TEXT, password TEXT, user_id TEXT)`)
  con.query(`INSERT INTO users VALUES ('${userInfo.login}', '${userInfo.password}', '${userInfo.user_id}')`)
  response.json({staus: 'ok'})
})

app.post('/loginUser', (user, response) => {
  let userInfo = user.body
  
  let id = con.query(`SELECT user_id FROM users WHERE login='${userInfo.login}' AND password='${userInfo.password}'`, 
  (error, login) => {
    if (error) throw error
      
    try { 
      response.json({
        user_id: login[0].user_id,
        status: 'ok'
      })
    } catch (err) {
      response.json({
        status: 'error',
        reason: 'noUser'
      })
    }
  })
})
