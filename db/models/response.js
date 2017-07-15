'use strict'

const {INTEGER, STRING, BOOLEAN, ENUM} = require('sequelize')

module.exports = db => db.define('responses', {
  response_text: {
    type: STRING(1200)
  },
  helpful_votes: INTEGER,
  abuse_flags: INTEGER,
  response_type: {
    type: ENUM('answer', 'followup')
  },
  allow_followup: BOOLEAN
})

module.exports.associations = (Response, {Question}) => {
  Response.belongsTo(Question)
}
