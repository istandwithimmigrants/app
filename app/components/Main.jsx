import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Check from 'material-ui/svg-icons/action/done'

import { setLanguage } from '../reducers/language'

class Main extends Component {
  state = {
    value: 'en'
  }

  handleChange = (event, index, value) => this.setState({value})

  render() {
    return (
      <div style={{textAlign: 'center', backgroundImage: 'url(immigrants.jpg)', backgroundRepeat: 'no-repeat', backgroundSize: '100%', height: '100vh', opacity: 0.4}} >
        <SelectField
          style={{backgroundColor: 'white'}}
          floatingLabelText="Your Language"
          value={this.state.value}
          onChange={this.handleChange}
        >
          <MenuItem value={'en'} primaryText="English" />
          <MenuItem value={'es'} primaryText="Spanish" />
          <MenuItem value={'zh'} primaryText="Chinese" />
          <MenuItem value={'ru'} primaryText="Russian" />
          <MenuItem value={'it'} primaryText="Italian" />
        </SelectField>
        <br />
        <Link to='ask' >
          <RaisedButton icon={<Check />} onTouchTap={() => this.props.setLanguage(this.state.value)} />
        </Link>
      </div>
    )
  }
}

export default connect(null, {setLanguage})(Main)
