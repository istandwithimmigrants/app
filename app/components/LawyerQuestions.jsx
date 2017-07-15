import React from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router'

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'

const questions = [{type: 'unanswered', text: 'How do I get a green card', id: 0, date: 'Jan 1'}]

const LawyerQuestions = (props) => {
  return (
  <div>
    <Table>
      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
        <TableRow>
          <TableHeaderColumn>Date</TableHeaderColumn>
          <TableHeaderColumn>Question</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false}>
      {questions.filter(question => question.type === props.category).map(question =>
        <TableRow key={question.id} >
          <TableRowColumn>{question.date}</TableRowColumn>
          <TableRowColumn>
            <Link to={`/questions/${question.id}`}>
              {question.text}
            </Link>
          </TableRowColumn>
        </TableRow>
      )}
      </TableBody>
    </Table>
  </div>
  )
}

export default LawyerQuestions
