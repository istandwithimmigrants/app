'use strict'

const {INTEGER, STRING, BOOLEAN, ENUM} = require('sequelize')

module.exports = db => db.define('responses', {
  response_text: {
    type: STRING(1200),
    len: [20, 1200]
  },
  source_language: STRING,
  english_text: STRING(1500),
  helpful_votes: INTEGER,
  abuse_flags: INTEGER,
  response_type: {
    type: ENUM('answer', 'followup')
  },
  allow_followup: BOOLEAN
}, {
  getterMethods: {
    is_authorized_to_post() {
      return this.abuse_flags < 3 || this.abuse_flags < this.helpful_votes/20
    }
  }
})

module.exports.associations = (Response, {Question}) => {
  Response.belongsTo(Question)
}
