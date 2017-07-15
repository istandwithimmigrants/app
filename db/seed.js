'use strict'

const db = require('APP/db')
    , {User, State, Question, Response, Subscription} = db
    , {mapValues} = require('lodash')

function seedEverything() {
  const seeded = {
    users: users(),
    questions: questions(),
    responses: responses(),
    subscriptions: subscriptions(),
    states: states(),
  }

  seeded.questions = questions(seeded)
  seeded.responses = responses(seeded)
  seeded.subscriptions = subscriptions(seeded)
  return Promise.props(seeded)
}

const users = seed(User, {
  amy: {
    email: 'amy@amy.com',
    name: 'Amy Roberts',
    password: '1234',
    is_vetted: true,
    vetted_via: 'auto',
    helpful_votes: 62,
    abuse_flags: 0,
    questions_answered: 38
  },
  joe: {
    name: 'Diamond Joe',
    email: 'joe@joe.com',
    password: '1234',
    is_vetted: true,
    vetted_via: 'auto',
    helpful_votes: 14,
    abuse_flags: 3,
    questions_answered: 22
  },
  meg: {
    email: 'meg@meg.meg',
    name: 'Meg Space',
    password: '1234',
    is_vetted: false,
  }
})//
const questions = seed(Question, {
  q1: {
    access_code: 'abc',
    question_text: 'I do not know how to program my VCR. \n All the directions are in Spanish.',
    helpful_votes: 1,
    national_origin: 'New Jersey',
    is_us_citizen: true
  },
  q2: {
    access_code: 'def',
    question_text: 'Do you know the way to San Jose? I\'ve been away too long.',
    tags: ['California', 'directions'],
    helpful_votes: 111,
    abuse_flags: 1,
    national_origin: 'France',
    is_us_citizen: false,
    has_green_card: true
  }
})

/* comments on Favorite moved to the bottom  */
const responses = seed(Response, ({users, questions}) => ({
  r1: {
    response_text: 'RTFM',
    response_type: 'answer',
    question_id: questions.q1.id,
    user_id: users.meg.id,
    helpful_votes: 11,
    allow_followup: false
  }
}))

const subscriptions = seed(Subscription, ({questions}) => ({
  sub1: {
    text_number: 6465551212,
    question_id: questions.q2.id,
    is_active: true
  }
}))

const states = seed(State, {
  name: 'NY',
  long_name: 'New York'
})

if (module === require.main) {
  db.didSync
    .then(() => db.sync({force: true}))
    .then(seedEverything)
    .finally(() => process.exit(0))
}

class BadRow extends Error {
  constructor(key, row, error) {
    super(error)
    this.cause = error
    this.row = row
    this.key = key
  }

  toString() {
    return `[${this.key}] ${this.cause} while creating ${JSON.stringify(this.row, 0, 2)}`
  }
}

// seed(Model: Sequelize.Model, rows: Function|Object) ->
//   (others?: {...Function|Object}) -> Promise<Seeded>
//
// Takes a model and either an Object describing rows to insert,
// or a function that when called, returns rows to insert. returns
// a function that will seed the DB when called and resolve with
// a Promise of the object of all seeded rows.
//
// The function form can be used to initialize rows that reference
// other models.
function seed(Model, rows) {
  console.log('seedin', Model)
  return (others={}) => {
    if (typeof rows === 'function') {
      rows = Promise.props(
        mapValues(others,
          other =>
            // Is other a function? If so, call it. Otherwise, leave it alone.
            typeof other === 'function' ? other() : other)
      ).then(rows)
      .catch(e => console.log(e))
    }

    return Promise.resolve(rows)
      .then(rows => Promise.props(
        Object.keys(rows)
          .map(key => {
            const row = rows[key]
            return {
              key,
              value: Promise.props(row)
                .then(row => Model.create(row)
                  .catch(error => { throw new BadRow(key, row, error) })
                )
            }
          }).reduce(
            (all, one) => Object.assign({}, all, {[one.key]: one.value}),
            {}
          )
        )
      )
      .then(seeded => {
        console.log(`Seeded ${Object.keys(seeded).length} ${Model.name} OK`)
        return seeded
      }).catch(error => {
        console.error(`Error seeding ${Model.name}: ${error} \n${error.stack}`)
      })
  }
}

module.exports = Object.assign(seed, {users, questions, responses, subscriptions, states})

// const responses = seed(Response,
//   // We're specifying a function here, rather than just a rows object.
//   // Using a function lets us receive the previously-seeded rows (the seed
//   // function does this wiring for us).
//   //
//   // This lets us reference previously-created rows in order to create the join
//   // rows. We can reference them by the names we used above (which is why we used
//   // Objects above, rather than just arrays).
//   ({users, questions}) => ({
//     // The easiest way to seed associations seems to be to just create rows
//     // in the join table.
//     'obama loves surfing': {
//       user_id: users.barack.id,    // users.barack is an instance of the User model
//                                    // that we created in the user seed above.
//                                    // The seed function wires the promises so that it'll
//                                    // have been created already.
//       thing_id: questions.surfing.id  // Same thing for questions.
//     },
//     'god is into smiting': {
//       user_id: users.god.id,
//       thing_id: questions.smiting.id
//     },
//     'obama loves puppies': {
//       user_id: users.barack.id,
//       thing_id: questions.puppies.id
//     },
//     'god loves puppies': {
//       user_id: users.god.id,
//       thing_id: questions.puppies.id
//     },
//   })
// )
