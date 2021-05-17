const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const Login = require('../models/Login')

router.get('/', async (req, res) => {
  res.json(await Login.find())
})

router.put('/', async (req, res) => {
  await Login.updateMany({
    login: req.body.login,
    password: bcrypt.hashSync(req.body.password, 8),
    role: req.body.role
  })
  res.json({ state: 'updated' })
})

router.post('/', async (req, res) => {
  const logindata = await Login.find()
  const passwordIsValid = bcrypt.compareSync(req.body.password, logindata[0].password)
  res.json({ state: passwordIsValid })
})

module.exports = router
