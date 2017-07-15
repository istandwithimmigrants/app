import React from 'react'
import { connect } from 'react-redux'

import Login from './Login'
import TextField from 'material-ui/TextField'

import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'

const App = ({children}) => (
  <div>
    <AppBar
      iconElementRight={<Login />}
      iconElementLeft={<TextField style={{backgroundColor: 'white', width: 140}} hintText=" Question Number" />}
      />
    {children}
  </div>
)

export default App
