import React, { Component } from 'react';
import AnswerBox from './AnswerBox'

class QuestionBox extends Component {
  constructor(props){
    super(props);
    this.state = {
    	lawyerLoggedIn: false,
    	answer: [
    	"yes",
    	"no",
    	"maybe"
    		]
        };
    }

searchQuestions(){
	//fetch API and return the specific question number
	//put into the does it work paragraph

	return(
		<div>
			<p> Question 1: does this work </p>
		</div>
		)

}

searchAnswers(){
	//fetch API and set state with the correct answer from the data base
	//set state to change the yes, no, maybe answer
	//this.setState({answer:data})
}

    render(){
    	return(
    		<div>
    			<h2> we are in the Question box </h2>
    			<div className = "questionTitle"> {this.searchQuestions()} </div>
    			{this.searchAnswers()}
    			<AnswerBox answer={this.state.answer} /> 
    		</div>
    		)
    }
}

export default QuestionBox;