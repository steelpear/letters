const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const Login = require('../models/Login')

router.get('/', async (req, res) => {
  res.json(await Login.find())
})

router.post('/new', async (req, res) => {
  const record = new Login({
    login: req.body.login,
    password: bcrypt.hashSync(req.body.password, 8),
    role: req.body.role
  })
  await record.save()
  res.json({ state: 'success' })
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
  let passwordIsValid = false
  const logindata = await Login.find()
  logindata.forEach(function (item, i, logindata) {
    passwordIsValid = bcrypt.compareSync(req.body.password, item.password)
    if (passwordIsValid) {
      return res.json({ state: passwordIsValid })
    }
  })
  res.json({ state: passwordIsValid })
})

module.exports = router
