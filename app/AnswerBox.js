import React, { Component } from 'react';

class AnswerBox extends Component {
  constructor(props){
    super(props);
    this.state = {
        loggedIn: false,
        };
    this.handleClick = this.handleClick.bind(this);     
    this.logInCheck = this.logInCheck.bind(this);   
    }

handleClick(event) {
  event.preventDefault();
  console.log("clicked button");
  this.logInCheck();
  }

logInCheck(){
    //fetch the database to see if the lawyers exist (if yes, then  )
    this.setState(prevState => ({
        loggedIn: !prevState.loggedIn
    }));
  }

showResults(){
    if(this.state.loggedIn === true){
        return(
            <div>
                <p> you can edit now</p>
            </div>
            )
    }
}


    render(){
    	return(
            <div>
    		<h2> we are in the AnswerBox box </h2>
            <form>
                <label>
                    Your Response
                <input type="text" name="name" />
                </label>
                 <input type="submit" value={this.state.loggedIn} onClick = {this.handleClick}/>
                </form>
            {console.log(this.state.loggedIn)}
            {this.showResults()}
            {this.props.answer}
            </div>
    		)
    }
}

export default AnswerBox;