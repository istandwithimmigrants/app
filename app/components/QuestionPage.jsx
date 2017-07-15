import React, { Component } from 'react'
import axios from 'axios'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import Drawer from 'material-ui/Drawer'
import AppBar from 'material-ui/AppBar'
import {List, ListItem} from 'material-ui/List'
import RaisedButton from 'material-ui/RaisedButton'
import Help from 'material-ui/svg-icons/action/help'
import Info from 'material-ui/svg-icons/action/info'
import Add from 'material-ui/svg-icons/content/add'
import Remove from 'material-ui/svg-icons/content/remove'
import IconButton from 'material-ui/IconButton'
import Badge from 'material-ui/Badge'

export default class QuestionPage extends Component {
  state = {
    question: {}
  }
  componentDidMount() {
    axios.get('/api/questions/1234')
    .then(res => {
      this.setState({ question: res.data })
      console.log(res.data)
    })
    .catch(err => console.error(err))
  }
  render() {
    return (
      <div>
        <List>
          <ListItem primaryText="This is a question" leftIcon={<Help />} />
          <ListItem secondaryText="This is an answer answer answer answer answer answer answer answer answer answer answer answer answer answer answer answer answer answer" secondaryTextLines={2}leftIcon={<Info />} />
        </List>
        <Badge
          badgeContent={10}
          primary={true}
          badgeStyle={{top: 12, right: 12}}
        >
          <IconButton>
            <Add />
          </IconButton>
        </Badge>
        <Badge
          badgeContent={2}
          secondary={true}
          badgeStyle={{top: 12, right: 12}}
        >
          <IconButton>
            <Remove />
          </IconButton>
        </Badge>
        <br />
        <TextField
          hintText="Ask another question"
          multiLine={true}
          rows={4}
        />
      </div>
    )
  }
}
