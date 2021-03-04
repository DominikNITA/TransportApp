const { Router } = require('express')
const router = Router()
const gen = require('./mapGenerator.js')

router.get('/map', (req, res) => {
  res.end(req.app.locals.map.kappa)
})

var fs = require('fs')
const path = './api/map.json'

router.post('/map', async (req, res) => {
  req.app.locals.map = await gen(req.body.options)
  fs.writeFile(path, JSON.stringify(req.app.locals.map), function (err) {
    if (err) {
      throw err
    }
  })
  res.send(req.app.locals.map)
})

module.exports = router
