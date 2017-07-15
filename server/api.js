'use strict'

const api = module.exports = require('express').Router()
const Translate = require('@google-cloud/translate')
const translate = Translate()
const text = 'hola cómo está'
const target = 'en'

api
  .get('/heartbeat', (req, res) => res.send({ok: true}))
  .get('/', (req, res) => {
    translate.translate(text, target)
    .then((results) => {
      let translations = results[0]
      translations = Array.isArray(translations) ? translations : [translations]

      console.log('Translations:')
      translations.forEach((translation, i) => {
        console.log(`${text[i]} => (${target}) ${translation}`)
      })
    })
    .catch((err) => {
      console.error('ERROR:', err)
    })
  })
  .use('/auth', require('./auth'))
  .use('/users', require('./users'))
  .use('/questions', require('./questions'))
  .use('/responses', require('./responses'))
  .use('/subscriptions', require('./subscriptions'))
// No routes matched? 404.
api.use((req, res) => res.status(404).end())
