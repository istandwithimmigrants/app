import React from 'react'
import { connect } from 'react-redux'

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'

const LawyerQuestions = () => (
  <div>
    <Table>
      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
        <TableRow>
          <TableHeaderColumn>Date</TableHeaderColumn>
          <TableHeaderColumn>Question</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false}>
        <TableRow>
          <TableRowColumn>Jan. 1</TableRowColumn>
          <TableRowColumn>How do I get a green card?</TableRowColumn>
        </TableRow>
      </TableBody>
    </Table>
  </div>
)

export default LawyerQuestions
