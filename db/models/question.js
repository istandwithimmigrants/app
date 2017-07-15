'use strict'

const {INTEGER, STRING, BOOLEAN, ARRAY} = require('sequelize')

module.exports = db => db.define('questions', {
  access_code: {
    type: STRING(6)
  },
  question_text: {
    type: STRING(1200),
    len: [10, 1200]
  },
  // Todo: normalized list of languages, w English & source name
  source_language: STRING,
  english_text: STRING(1500),
  tags: {
    type: ARRAY(STRING)
  },
  // nations should be normalized
  national_origin: STRING,
  is_us_citizen: BOOLEAN,
  has_green_card: BOOLEAN,
  helpful_votes: INTEGER,
  abuse_flags: INTEGER

})
module.exports.associations = (Question, {Response, Subscription}) => {
  Question.hasMany(Response)
  Question.hasMany(Subscription)
}
