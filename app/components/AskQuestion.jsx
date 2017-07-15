import React, { Component } from 'react'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import {List, ListItem} from 'material-ui/List'
import RaisedButton from 'material-ui/RaisedButton'

export default class AskQuestion extends Component {
  render() {
    return (
      <div style={{textAlign: 'center'}}>
          <TextField
            floatingLabelText="Your question"
            multiLine={true}
            rows={4}
            rowsMax={4}
          />
          <br />
          <RaisedButton label="Ask" primary={true} />
          <List>
            <ListItem primaryText="How do I get a green card?" />
            <ListItem primaryText="What do I do if I have a criminal record?" />
            <ListItem primaryText="How do I get healthcare?" />
          </List>
          <TextField
            floatingLabelText="If this doesn't answer your question"
          />
      </div>
    )
  }
}
