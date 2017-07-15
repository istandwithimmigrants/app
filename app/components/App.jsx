import React, { Component } from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import {Link} from 'react-router'

import Login from './Login'

import TextField from 'material-ui/TextField'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import Search from 'material-ui/svg-icons/action/search'

const style = {
  margin: 12
}

class App extends Component {
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
    const questionNum = this.props.language === 'en' ? 'Question Number' : 'Numero de Pregunta'
    return (
      <div>
        <AppBar
          iconElementRight={<Login />}
          iconElementLeft={
            <div>
              <TextField style={{ backgroundColor: 'white', width: 150 }}
              hintText={questionNum}
              onChange={this.handleChange}/>
              <Link to={`/question/${this.state.qNum}`}>
                <IconButton iconStyle={{fill: '#FFFFFF'}} >
                  <Search />
                </IconButton>
              </Link>
              </div>
            }
        />
        {this.props.children}
      </div>
    )
  }
}

const mapState = ({language}) => ({language})

export default connect(mapState, null)(App)
