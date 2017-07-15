import React, { Component } from 'react'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import Drawer from 'material-ui/Drawer'
import AppBar from 'material-ui/AppBar'
import {List, ListItem} from 'material-ui/List'
import RaisedButton from 'material-ui/RaisedButton'

export default class QuestionPage extends Component {
  render() {
    return (
      <div>
        <p>How do I get a green card?</p>
        <p>This is the lawyer's answer</p>
      </div>
    )
  }
}
