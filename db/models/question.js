'use strict'

const {INTEGER, STRING, BOOLEAN, ARRAY} = require('sequelize')

module.exports = db => db.define('questions', {
  access_code: {
    type: STRING(6)
  },
  question_text: {
    type: STRING(1200),
    len: [20, 1200]
  },
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
