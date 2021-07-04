const fs = require('fs')
const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')
const Record = require('../models/Record')

router.get('/', async (req, res) => {
  res.json(await Record.find().sort({ letterDate: -1 }))
})

router.get('/count', async (req, res) => {
  res.json(await Record.countDocuments())
})

router.get('/last', async (req, res) => {
  res.json(await Record.find().limit(1).sort({ $natural: -1 }))
})

router.get('/limit/:limit/:skip/:public', async (req, res) => {
  res.json(await Record.find({ letterPublic: req.params.public }).sort({ letterDate: -1 }).limit(+req.params.limit).skip(+req.params.skip))
})

router.get('/:id', async (req, res) => {
  res.json(await Record.findById(req.params.id))
})

router.get('/find/:letterid', async (req, res) => {
  res.json(await Record.findOne({ letterId: req.params.letterid }))
})

router.get('/random/:num', async (req, res) => {
  res.json(await Record.aggregate([{ $sample: { size: +req.params.num } }]))
})

router.post('/', async (req, res) => {
  const record = new Record(req.body)
  await record.save()
  res.json({ state: 'success' })
})

router.post('/public/:id/:value', async (req, res) => {
  await Record.findByIdAndUpdate(req.params.id, { $set: { letterPublic: req.params.value } })
  res.json({ state: 'updated' })
})

router.post('/delmany', async (req, res) => {
  await Record.deleteMany({ _id: req.body.ids })
  res.json({ state: 'Записи удалены' })
})

router.delete('/delete/:id', async (req, res) => {
  await Record.findByIdAndRemove(req.params.id)
  res.json({ state: 'Запись удалена' })
})

router.post('/mailer', (req, res) => {
  fs.readFile('configmail.config', 'utf8', (err, data) => {
    // eslint-disable-next-line no-console
    if (err) { console.log(err) }
    const mailConfig = JSON.parse(data)
    const transporter = nodemailer.createTransport({
      service: mailConfig.service,
      auth: {
        user: mailConfig.user,
        pass: mailConfig.pass
      }
    })
    const mailOptions = {
      from: 'Letters mailer <steelpear@yandex.ru>',
      to: req.body.email,
      subject: 'Letters notice',
      text: 'Новое письмо № ' + req.body.qrId
    }
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        // eslint-disable-next-line no-console
        return console.log(error.message)
      }
      // eslint-disable-next-line no-console
      console.log('Message sent: %s', info.messageId)
    })
  })
  res.json({ state: 'success' })
})

module.exports = router
