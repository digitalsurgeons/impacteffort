require('dotenv').config()

const express = require('express')
const chart = require('./lib/chart')
const mail = require('./lib/mail')
const template = require('./lib/template')

const app = express()
app.use(express.json())

app.use(express.static('public'))

app.post('/progress', (req, res) => {
  const answers = req.body.form_response.answers

  chart(answers, params => {
    mail(params, {
      bcc: process.env.EMAIL,
      template
    })
  })

  res.send('ok')
})

app.get('/', (req, res) => {
  res.sendFile('index.html', {
    root: './templates'
  })
})

app.listen(3000, () => {
  console.log(`Example app listening on port 3000!`)
})
