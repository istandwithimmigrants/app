import React, { Component } from 'react'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import Drawer from 'material-ui/Drawer'
import AppBar from 'material-ui/AppBar'

export default class Main extends Component {
  state = {
    value: 1,
  }

  handleChange = (event, index, value) => this.setState({value})

  render() {
    return (
      <div>
        <Drawer open={true}>
          <AppBar
            title="Find a Question"
            iconElementLeft={<span />}
          />
          <TextField
            floatingLabelText="Question number"
            style={{width: 150}}
          />
        </Drawer>
        <div style={{textAlign: 'center'}}>
          <TextField
            floatingLabelText="Your question"
            multiLine={true}
            rows={4}
            rowsMax={4}
          />
        </div>
      </div>
    )
  }
}
