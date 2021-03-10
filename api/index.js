const express = require('express')
const cors = require('cors')
const app = express()

const hello = require('./hello')
const weather = require('./weather')
const mapApi = require('./map/index')

app.use(cors())
app.use(express.json());
app.use('/api', hello)
app.use('/api', weather)
app.use('/api', mapApi)


app.get('/', (req, res, next) => {
  res.status(200).send({
    minTemp: 13,
    maxTemp: 19,
  })
  next()
  //res.send('Hello world')
})

var fs = require('fs')
const { error } = require('console')
const path = './api/map.json'
try {
  // const d = { kappa: 'abc' }
  // fs.writeFile(path, JSON.stringify(d), function(err){
  //   if (err) {
  //     throw err
  //   }
  // })
  if (fs.existsSync(path)) {
    console.log('Loading map file')
    fs.readFile(path, function (err, data) {
      if (err) {
        throw err
      }
      const content = data
      app.locals.map = JSON.parse(content)
      console.log('Loading succesful!')
    })
  } else {
    console.log('Map file not found')
  }
} catch (err) {
  console.log(err)
}

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