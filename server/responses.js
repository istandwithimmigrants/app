'use strict'

const db = require('APP/db')
const Response = db.model('responses')

module.exports = require('express').Router()
  .post('/',
    (req, res, next) =>
      Response.create(req.body)
      .then(user => res.status(201).json(user))
      .catch(next))
  .get('/:id',
    (req, res, next) =>
      Response.findById(req.params.id)
      .then(responses => res.json(responses))
      .catch(next))
