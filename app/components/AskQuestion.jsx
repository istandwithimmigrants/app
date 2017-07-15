import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router'
import axios from 'axios'

import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import {List, ListItem} from 'material-ui/List'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Help from 'material-ui/svg-icons/action/help'
import Dialog from 'material-ui/Dialog'

const questions = [{id: 0, text: 'How do I get a green card?'}, {id: 1, text: 'What if I have a criminal record?'}]

class AskQuestion extends Component {
  state = {
    show: false,
    question1: '',
    question2: '',
    dialog: false
  }
  saveQuestion = () => {
    axios.post('/api/questions', {question_text: this.state.question2, id: 1234})
    .then(res => this.setState({ dialog: true }))
    .catch(err => console.error(err))
  }
  handleClose = () => this.setState({ dialog: false })
  render() {
    const actions = [
      <Link to='questions/0' >
        <FlatButton
          label="OK"
          primary={true}
          keyboardFocused={true}
          onTouchTap={this.handleClose}
        />
      </Link>
    ]
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
          onChange={e => this.setState({ question1: e.target.value })}
        />
        <br />
        {!this.state.show && <RaisedButton icon={<Help />} primary={true} onTouchTap={() => this.setState({ show: true })} />}
          {this.state.show &&
          <div>
            <List>
              {questions.map(question =>
              <ListItem key={question.id} primaryText={question.text} containerElement={<Link to={`/questions/${question.id}`} />}/>
              )}
            </List>
            <TextField
              floatingLabelText={followup}
              multiLine={true}
              rows={4}
              rowsMax={4}
              onChange={e => this.setState({ question2: e.target.value })}
            />
            <br />
            <RaisedButton icon={<Help />} primary={true} onTouchTap={this.saveQuestion} />
          </div>
        }
        <Dialog
          title="Question Number"
          actions={actions}
          modal={false}
          open={this.state.dialog}
          onRequestClose={this.handleClose}>
          Please write down this number to come back to this question: 1234
        </Dialog>
      </div>
    )
  }
}

const mapState = ({language}) => ({language})

export default connect(mapState, null)(AskQuestion)
