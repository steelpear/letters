const express = require('express')
const router = express.Router()
const Settings = require('../models/Settings')

router.get('/', async (req, res) => {
  res.json(await Settings.find())
})

router.put('/', async (req, res) => {
  await Settings.updateMany(req.body)
  res.json({ state: 'updated' })
})

module.exports = router
