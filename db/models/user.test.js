'use strict'

const db = require('APP/db')
    , {User} = db
    , {expect} = require('chai')

/* global describe it before afterEach */

describe('User', () => {
  before('Await database sync', () => db.didSync)
  // afterEach('Clear the tables', () => db.truncate({ cascade: true }))

  describe('authenticate(plaintext: String) ~> Boolean', () => {
    it('resolves true if the password matches', () =>
      User.create({ name: 'bob', password: 'ok' })
        .then(user => user.authenticate('ok'))
        .then(result => expect(result).to.be.true))

    it("resolves false if the password doesn't match", () =>
      User.create({ name: 'bob', password: 'ok' })
        .then(user => user.authenticate('not ok'))
        .then(result => expect(result).to.be.false))
  })
  describe('getter', () => {
    it('returns domain', () => {
      User.create({name: 'bob', email: 'obama@gmail.com'})
        .then(user => user.domain)
        .then(result => expect(result).to.equal('gmail.com'))
    })

    it('gives eligibility to answer for new vetted user', () =>
      User.create({ name: 'bob', is_vetted: true })
        .then(user => user.is_authorized_to_post)
        .then(result => expect(result).to.be.true)
    )

    it('gives ineligibility to answer for evil user', () =>
      User.create({ name: 'bob', is_vetted: true, abuse_flags: 5, helpful_votes: 0 })
        .then(user => user.is_authorized_to_post)
        .then(result => expect(result).to.be.false)
    )
  })
})
