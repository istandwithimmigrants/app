'use strict'

const db = require('APP/db')
const Question = db.model('questions')
const Response = db.model('responses')

module.exports = require('express').Router()
  .get('/',
    // The forbidden middleware will fail *all* requests to list question.
    (req, res, next) =>
      Question.findAll()
        .then(question => res.json(question))
        .catch(next))
  .post('/',
    (req, res, next) =>
      Question.create(req.body)
      .then(question => {
        res.status(201).json(question)
      })
      .catch(next))
  .get('/:id',
    (req, res, next) =>
      Question.findAll({
        include: [{
          model: Response,
          where: {question_id: req.params.id}
        }]
      })
      .then(question => {
        console.log('hit route', question)
        res.json(question)
      })
      .catch(next))
