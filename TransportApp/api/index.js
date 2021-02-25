const express = require('express')
const cors = require('cors')
const app = express()

const hello = require('./hello')
const weather = require('./weather')

app.use('/api', hello)
app.use('/api', weather)
app.use(cors())

app.get('/', (req, res, next) => {
  res.status(200).send({
    minTemp: 13,
    maxTemp: 19,
  })
  next()
  //res.send('Hello world')
})

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Authorization'
  )
  res.header('Content-Type', 'application/json')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
})

if (require.main === module) {
  const port = process.env.PORT || 3001
  app.listen(port, () => {
    console.log(`API server listening on port ${port}`)
  })
}

module.exports = app
