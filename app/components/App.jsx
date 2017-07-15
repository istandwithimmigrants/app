import React from 'react'
import { connect } from 'react-redux'

import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'

const App = ({children}) => (
  <div>
    <AppBar
      showMenuIconButton={false}
      title='Welcome'
      iconElementRight={<FlatButton label="Lawyer Login" />}
      />
    {children}
  </div>
)

export default App
