const { Router } = require('express')
const router = Router()
const cors = require('cors')

//https://flaviocopes.com/express-cors/
router.get('/weather', cors(), (req, res) => {
  const date = new Date()
  const d = date.getDate()
  const baseTemp = 3
  const minTemp = baseTemp + (d % 15)
  const maxTemp = minTemp + 1 + (d % 7)
  res.status(200).send({
    minTemp: minTemp,
    maxTemp: maxTemp,
  })
})

module.exports = router
