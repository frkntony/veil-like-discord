  // const express = require('express')
  // const bodyParser = require('body-parser')
  // const cors = require('cors')
  // const Chatkit = require('pusher-chatkit-server')

  // const app = express()

  // // my chatkit handshake
  // const chatkit = new Chatkit.default({
  //   instanceLocator: 'v1:us1:e2068def-9683-46dd-bc93-d325e7e677d3',
  //   key: '91f21339-1fda-49bb-9acd-67f047a4f27d:vFFPrL8bXboUwDZcLth+vv8pBWIZkKcU4+ThLpf8CYw='
  // })

  // app.use(bodyParser.urlencoded({ extended: false }))
  // app.use(bodyParser.json())
  // app.use(cors())

  // app.post('/users', (req, res) => {
  //   const { username } = req.body

  //   chatkit
  //     .createUser({
  //       name: username,
  //       id: username
  //     })
  //     .then(() => res.sendStatus(201))
  //     .catch(error => {
  //       if (error.error_type === 'services/chatkit/user_already_exists') {
  //         res.send(200)
  //       } else {
  //         res.status(error.statusCode).json(error)
  //       }
  //     })

  // })

  // app.post('/authenticate', (req, res) => {
  //   const authData = chatkit.authenticate({ userId: req.query.user_id })
  //   res.status(authData.status).send(authData.body)
  // })

  // const PORT = 3001
  // app.listen(PORT, err => {
  //   if (err) {
  //     console.error(err)
  //   } else {
  //     console.log(`Running on port ${PORT}`)
  //   }
  // })

  // ---

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Chatkit = require('pusher-chatkit-server')

const app = express()

const chatkit = new Chatkit.default({
  instanceLocator: 'v1:us1:e2068def-9683-46dd-bc93-d325e7e677d3',
  key: '91f21339-1fda-49bb-9acd-67f047a4f27d:vFFPrL8bXboUwDZcLth+vv8pBWIZkKcU4+ThLpf8CYw=',
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

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


const PORT = 3001
app.listen(PORT, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`Running on port ${PORT}`)
  }
})