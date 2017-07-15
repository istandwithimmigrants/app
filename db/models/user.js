'use strict'

// bcrypt docs: https://www.npmjs.com/package/bcrypt
const bcrypt = require('bcryptjs')
    , {STRING, VIRTUAL, BOOLEAN, ARRAY, INTEGER, ENUM, DATE, NOW} = require('sequelize')

module.exports = db => db.define('users', {
  name: {
    type: STRING,
    validate: {
      notEmpty: true,
    }
  },
  email: {
    type: STRING,
    validate: {
      isEmail: true,
      notEmpty: true,
    }
  },
  isVetted: BOOLEAN,
  vettedVia: ENUM('auto', 'manual'),
  vettedDate: {
    type: DATE,
    defaultValue: NOW
  },
  questionsAnswered: {
    type: INTEGER,
    defaultValue: 0
  },
  helpfulVotes: {
    type: INTEGER,
    defaultValue: 0
  },
  abuseFlags: {
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
    isElgibleToAnswer() {
      return this.isVetted && (this.abuseFlags < 2 || this.abuseFlags < this.helpfulVotes/50)
    }
  },
  indexes: [{fields: ['email'], unique: true}],
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

module.exports.associations = (User, {OAuth}) => {
  User.hasOne(OAuth)
  // User.belongsToMany(Thing, {as: 'favorites', through: Favorite})
}

function setEmailAndPassword(user) {
  user.email = user.email && user.email.toLowerCase()
  if (!user.password) return Promise.resolve(user)

  return bcrypt.hash(user.get('password'), 10)
    .then(hash => user.set('password_digest', hash))
}
