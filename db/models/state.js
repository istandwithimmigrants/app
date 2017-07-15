'use strict'

const {STRING} = require('sequelize')

module.exports = db => db.define('states', {
  name: STRING,
  long_name: STRING,
})

module.exports.associations = (State, {User}) => {
  State.hasMany(User)
}
