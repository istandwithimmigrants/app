'use strict'

const db = require('APP/db')
    , {Question, Response, Subscription} = db
    , {expect} = require('chai')
console.log("assn",Response.associations)
/* global describe it before afterEach */
describe('Stuff', () => {
  before('Await database sync', () => db.didSync)
  // afterEach('Clear the tables', () => db.truncate({ cascade: true }))
describe('Question', () => {


  describe('exists', () => {
    Question.create({
      question_text: 'This is a value of at least 20 chars'
    })
    .then((q) => expect(q).to.exist)
    // .catch((e) => console.log('#Question test', e))
  })
})

describe('Response', () => {
  // before('Await database sync', () => db.didSync)
  // afterEach('Clear the tables', () => db.truncate({ cascade: true }))

  describe('exists', () => {
    Question.create({
      question_text: 'This is a question, pls to respond.'
    })
    .then((q) => Response.create({
      question_id: q.id,
      response_text: 'I am here for to answer your question.',
      // response_type: 'answer'
    }))
    .then((res) => expect(res.response_text).to.contain('I am here'))
    // .catch((e) => console.log('#Resp test', e))
  })
})
describe('Subscription', () => {
  // before('Await database sync', () => db.didSync)
  // afterEach('Clear the tables', () => db.truncate({ cascade: true }))

  describe('exists', () => {
    Question.create({
      question_text: 'Here is my excellent question: dare you respond?'
    })
    .then((q) => Subscription.create({
      question_id: q.id,
      text_number: 2125557912
    }))
    .then((res) => expect(res).to.equal(2125557912))
    .catch((e) => console.log('#Subs test', e))
  })
})
})
