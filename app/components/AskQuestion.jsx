import React, { Component } from 'react'
import { connect } from 'react-redux'

import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import {List, ListItem} from 'material-ui/List'
import RaisedButton from 'material-ui/RaisedButton'
import Help from 'material-ui/svg-icons/action/help'

const questions = [{id: 0, text: 'How do I get a green card?'}, {id: 1, text: 'What if I have a criminal record?'}]

class AskQuestion extends Component {
  state = {
    show: false
  }
  render() {
    const language = this.props.language
    let question = '', followup = ''
    language === 'en' ? (question = 'Your question', followup = 'If this does not answer your question') : (question = 'Su pregunta', followup = 'Si todavia tiene una pregunta')
    return (
      <div style={{textAlign: 'center'}}>
        <TextField
          floatingLabelText={question}
          multiLine={true}
          rows={4}
          rowsMax={4}
        />
        <br />
        <RaisedButton icon={<Help />} primary={true} onTouchTap={() => this.setState({ show: true })} />
          {this.state.show &&
          <div>
            <List>
              {questions.map(question =>
              <ListItem key={question.id} primaryText={question.text} />
              )}
            </List>
            <TextField
              floatingLabelText={followup}
              multiLine={true}
              rows={4}
              rowsMax={4}
            />
            <br />
            <RaisedButton icon={<Help />} primary={true} />
          </div>
        }
      </div>
    )
  }
}

const mapState = ({language}) => ({language})

export default connect(mapState, null)(AskQuestion)
