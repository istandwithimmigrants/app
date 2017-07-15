import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  language: require('./language').default
})

export default rootReducer
