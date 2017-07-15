'use strict'

// bcrypt docs: https://www.npmjs.com/package/bcrypt
const bcrypt = require('bcryptjs')
    , {STRING, VIRTUAL, BOOLEAN, ARRAY, INTEGER, ENUM, DATE, NOW} = require('sequelize')

module.exports = db => db.define('users', {
  name: {
    type: STRING,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: STRING,
    validate: {
      isEmail: true,
      notEmpty: true
    }
  },
  is_vetted: BOOLEAN,
  vetted_via: ENUM('auto', 'manual'),
  vetted_date: {
    type: DATE,
    defaultValue: NOW
  },
  questions_answered: {
    type: INTEGER,
    defaultValue: 0
  },
  helpful_votes: {
    type: INTEGER,
    defaultValue: 0
  },
  abuse_flags: {
    type: INTEGER,
    defaultValue: 0
  },
  password_digest: STRING, // This column stores the hashed password in the DB, via the beforeCreate/beforeUpdate hooks
  password: VIRTUAL // Note that this is a virtual, and not actually stored in DB
}, {
  getterMethods: {
    domain() {
      return this.email.split('@')[1]
    },
    is_authorized_to_post() {
      return this.is_vetted && (this.abuse_flags < 2 || this.abuse_flags < this.helpful_votes/50)
    }
  },
  // indexes: [{fields: ['email'], unique: true}],
  hooks: {
    beforeCreate: setEmailAndPassword,
    beforeUpdate: setEmailAndPassword,
  },
  defaultScope: {
    attributes: {exclude: ['password_digest']}
  },
  instanceMethods: {
    // This method is a Promisified bcrypt.compare
    authenticate(plaintext) {
      return bcrypt.compare(plaintext, this.password_digest)
    }
  }
})

module.exports.associations = (User, {OAuth, State}) => {
  User.hasOne(OAuth)
  User.belongsTo(State)
  // User.belongsToMany(Thing, {as: 'favrites', through: Fave})
}

function setEmailAndPassword(user) {
  user.email = user.email && user.email.toLowerCase()
  if (!user.password) return Promise.resolve(user)

  return bcrypt.hash(user.get('password'), 10)
    .then(hash => user.set('password_digest', hash))
}
