// server.js
// 

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Chatkit = require('pusher-chatkit-server')

const HTTP_PORT = process.env.PORT || 8080;
const path = require("path");

const app = express()

const chatkit = new Chatkit.default({
  instanceLocator: 'v1:us1:e2068def-9683-46dd-bc93-d325e7e677d3',
  key: '91f21339-1fda-49bb-9acd-67f047a4f27d:vFFPrL8bXboUwDZcLth+vv8pBWIZkKcU4+ThLpf8CYw=',
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

// setup the static folder 
app.use(express.static("build"));


app.post('/users', (req, res) => {
  const { username } = req.body
  chatkit
    .createUser({
      id: username,
      name: username
    })
    .then(() => res.sendStatus(201))
    .catch(error => {
      if (error.error_type === 'services/chatkit/user_already_exists') {
        res.sendStatus(200)
      } else {
        res.status(error.status).json(error)
      }
    })
})

app.post('/authenticate', (req, res) => {
  const authData = chatkit.authenticate({ userId: req.query.user_id })
  res.status(authData.status).send(authData.body)
})

app.use((req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});


app.listen(HTTP_PORT, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv\nHeroku version on Veil-chat\nVeil-chat server listening on port ${HTTP_PORT}\nvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv`)
  }
})