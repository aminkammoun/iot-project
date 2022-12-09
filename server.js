const express = require('express')
const app = express()
const apiMqtt = require('./mqtt')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Origin', 'http://localhost/')
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE')
  res.header(
    'Access-Control-Allow-Headers',
    'x-www-form-urlencoded,Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  next()
})
app.use(cors())
app.use(express.json())

app.use('/api/mqtt', apiMqtt)

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Amine application.' })
})
if (process.env.NODE_ENV == 'production') {
  app.use(express.static(__dirname + '/dist/'))
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/dist/index.html'))
}

const port = process.env.NODE_DOCKER_PORT || 8080
app.listen(port, () => console.log(`Listening on port ${port}...`))
