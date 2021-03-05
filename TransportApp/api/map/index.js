const { Router } = require('express')
const router = Router()
const gen = require('./mapGenerator.js')

router.get('/map', (req, res) => {
  res.send(req.app.locals.map)
})

var fs = require('fs')
const path = './api/map.json'

router.post('/map', async (req, res) => {
  console.log('POST /map')
  console.log(req.body)
  req.app.locals.map = await gen(req.body.options)
  fs.writeFile(path, JSON.stringify(req.app.locals.map), function (err) {
    if (err) {
      throw err
    }
  })
  res.send(req.app.locals.map)
})

module.exports = router
