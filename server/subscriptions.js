'use strict'

const db = require('APP/db')
const Subscription = db.model('subscriptions')

module.exports = require('express').Router()
  .get('/:questionId',
    (req, res, next) =>
      Subscription.findAll({question_id: req.params.questionId})
        .then(subscriptions => res.json(subscriptions))
        .catch(next))
  .post('/',
    (req, res, next) =>
      Subscription.create(req.body)
      .then(user => res.status(201).json(user))
      .catch(next))
  .get('/:id',
    (req, res, next) =>
      Subscription.findById(req.params.id)
      .then(subscriptions => res.json(subscriptions))
      .catch(next))
