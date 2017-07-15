'use strict'

const {STRING, BIGINT, BOOLEAN} = require('sequelize')

module.exports = db => db.define('subscriptions', {
// TODO add validation for phone #
  text_number: {
    type: BIGINT
  },
  email: {
    type: STRING,
    isEmail: true
  },
  is_active: {
    type: BOOLEAN,
    defaultValue: true
  },
  is_verified: BOOLEAN
})

module.exports.associations = (Subscription, {Question}) => {
  Subscription.belongsTo(Question)
}
