import React, { Component } from 'react'
import { Link } from 'react-router'

import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'

class Login extends Component {
  state = {
    open: false
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({
      open: false
    })
  }

  handleSubmit = evt => {
    evt.preventDefault()
    const email = evt.target.email.value
    const password = evt.target.password.value
    this.props.login(email, password)
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <Link to='lawyer' >
        <FlatButton
          label="Submit"
          type="submit"
          form="login"
          primary={true}
          keyboardFocused={true}
          onTouchTap={this.handleClose}
        />
      </Link>,
    ]
    return (
      <div>
        <FlatButton
          label="Lawyer Login"
          onTouchTap={this.handleOpen}
          style={{color: 'white'}} />
        <Dialog
          title="Login"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}>
          <form id="login" onSubmit={this.handleSubmit}>
            <TextField
              name="email"
              hintText="Email Address"
            /><br />
            <br />
            <TextField
              name="password"
              type="password"
              hintText="Password"
            /><br />
            <br />
          </form>
        </Dialog>
      </div>
    )
  }
}

import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect(
  state => ({}),
  {login},
)(Login)
