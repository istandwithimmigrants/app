import React from 'react'
import { connect } from 'react-redux'

import Login from './Login'

import TextField from 'material-ui/TextField'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'

const App = ({children, language}) => {
  const questionNum = language === 'en' ? 'Question Number' : 'Numero de Pregunta'
  return (
  <div>
    <AppBar
      iconElementRight={<Login />}
      iconElementLeft={<TextField style={{backgroundColor: 'white', width: 150}} hintText={questionNum} />}
      />
    {children}
  </div>
  )
}

const mapState = ({language}) => ({language})

export default connect(mapState, null)(App)
