import React, { Component } from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import {Link} from 'react-router'

import Login from './Login'

import TextField from 'material-ui/TextField'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'

const style = {
  margin: 12
}

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      qNum: ''
    }
  }

  handleChange = (event) => {
    this.setState({qNum: event.target.value})
  }

  render() {
    return (
      <div>
        <AppBar
          iconElementRight={<Login />}
          iconElementLeft={<div><TextField style={{ backgroundColor: 'white', width: 140 }} hintText=" Question Number" onChange={this.handleChange}/><Link to={`/question/${this.state.qNum}`}><RaisedButton label="Take me to my question" style={style}/></Link></div>}
        />
        {this.props.children}
      </div>
    )
  }
}
