import React, { Component } from 'react'
import { Link } from 'react-router'

import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

export default class Main extends Component {
  state = {
    value: 1,
  }

  handleChange = (event, index, value) => this.setState({value})

  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <SelectField
          floatingLabelText="Your Language"
          value={this.state.value}
          onChange={this.handleChange}
        >
          <MenuItem value={1} primaryText="English" />
          <MenuItem value={2} primaryText="Spanish" />
          <MenuItem value={3} primaryText="Mandarin" />
          <MenuItem value={4} primaryText="Korean" />
          <MenuItem value={5} primaryText="Arabic" />
        </SelectField>
        <br />
        <Link to='ask' >
          <RaisedButton label="Submit" primary={true} />
        </Link>
      </div>
    )
  }
}
