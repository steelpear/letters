const fs = require('fs')
const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')
const Record = require('../models/Record')

router.get('/', async (req, res) => {
  res.json(await Record.find().sort({ qrDate: -1 }))
})

router.get('/count', async (req, res) => {
  res.json(await Record.countDocuments())
})

router.get('/limit/:limit/:skip', async (req, res) => {
  res.json(await Record.find().sort({ letterDate: -1 }).limit(Number(req.params.limit)).skip(Number(req.params.skip)))
})

router.get('/:id', async (req, res) => {
  res.json(await Record.findById(req.params.id))
})

router.get('/find/:letterid', async (req, res) => {
  res.json(await Record.findOne({ letterId: req.params.letterid }))
})

router.get('/random/:num', async (req, res) => {
  res.json(await Record.aggregate([{ $sample: { size: Number(req.params.num) } }]))
})

router.post('/', async (req, res) => {
  const record = new Record(req.body)
  await record.save()
  res.json({ state: 'success' })
})

// router.put('/:id', async (req, res) => {
//   await Record.findByIdAndUpdate(req.params.id, req.body)
//   res.json({ state: 'updated' })
// })

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
