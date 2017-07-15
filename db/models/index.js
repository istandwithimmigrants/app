'use strict'

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.

const app = require('APP')
    , debug = require('debug')(`${app.name}:models`)
    // Our model files export functions that take a database and return
    // a model. We call these functions "meta models" (they are models of
    // models).
    //
    // This lets us avoid cyclic dependencies, which can be hard to reason
    // about.
    , metaModels = {
      OAuth: require('./oauth'),
      User: require('./user'),
      State: require('./state'),
      Question: require('./question'),
      Response: require('./response'),
      Subscription: require('./subscription')
    }
    , {mapValues} = require('lodash')

module.exports = db => {
  const models = mapValues(metaModels, defineModel => defineModel(db))

  /*
  We pass the responsibility for associations onto the models themselves:
  If they export an `associations` method, we'll call it, passing
  in all the models that have been defined.

  This moves the association logic to the model files. The Sequelize docs
  suggest a similar setup:
  https://github.com/sequelize/express-example#sequelize-setup
  */
  Object.keys(metaModels)
    .forEach(name => {
      const {associations} = metaModels[name]
      if (typeof associations === 'function') {
        debug('associating model %s', name)
        // Metamodel::associations(self: Model, others: {[name: String]: Model}) -> ()
        // Associate self with others.
        associations.call(metaModels[name], models[name], models)
      }
    })
  return models
}
