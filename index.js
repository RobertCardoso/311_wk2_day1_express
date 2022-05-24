
const express = require('express')
const app = express()
const port = process.env.PORT || 4000
let bodyPArser = require("body-parser")
app.use(bodyPArser.json())
const { users } = require('./state')

/* BEGIN - create routes here */
app.get("/users", function(req, res){
  console.log("GET /users")
  
  res.json(users)
})

app.get("/users/:id", function(req, res){
  console.log("/GET /users/", req.params.id)
  let found

  for (let i = 0; i < users.length; i++) {
    let item = users[i]
    if(item._id == req.params.id){
       found = item;
     break;
    }
  }

  if(found){
    res.json(found)
  } else {
    res.sendStatus(404);
  }

})

app.post("/users", function(req, res){
  console.log("POST /users");
  let json = req.body

  let newItem= {}
  newItem._id = json._id
  newItem.name = json.name;
  newItem.occupation = json.occupation;
  newItem.avatar = json.avatar
  users.push(newItem)

  res.json(newItem)

})

app.put("/users/:id", function(req, res){
  console.log("PUT /users/", req.params.id )
  let json = req.body
  let found

  for(let i=0; i < users.length; i++){
    let item = users[i]
    if(item._id == req.params.id){
      found = item;
    break;
   }
  }
  if(found){
    found.name = json.name;
    found.occupation = json.occupation;
    found.avatar = json.avatar;

    res.json(found)

  } else {
    res.sendStatus(404);
  }
})

app.delete("/users/:id", function(req, res){
  console.log("DELETE /users/", req.params.id)
  let index = -1
 

  for(let i=0; i < users.length; i++){
    let item = users[i]
    if(item._id == req.params.id){
      index = i
      break;
   }
  }
  let found
  if(index > -1){
    found = users.splice(index, 1)
  }
res.send(`ID:${index + 1} DELETED`);

})

/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))