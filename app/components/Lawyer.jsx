import React, { Component } from 'react'
import LawyerQuestions from './LawyerQuestions'
import {Tabs, Tab} from 'material-ui/Tabs'

export default class Lawyer extends Component {
  render() {
    return (
      <div>
        <Tabs>
          <Tab label="All Your Questions" >
            <LawyerQuestions />
          </Tab>
          <Tab label="Unanswered Questions" >
            <LawyerQuestions />
          </Tab>
          <Tab
            label="Questions with Follow-ups"
          >
            <LawyerQuestions />
          </Tab>
        </Tabs>
      </div>
    )
  }
}
