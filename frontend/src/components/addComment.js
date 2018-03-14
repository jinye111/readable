import React, { Component } from 'react';
import { FormGroup,ControlLabel,FormControl,option,Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { uuid } from '../utils/uuid';
import { addC } from '../actions'

class AddComment extends Component{


	state={
		title:'',
		author:'',
		text:'',
		category:''
	}

	handleClick(e){

		switch(e.target.name)
		{
			case 'title':
				this.setState({title:e.target.value});
				break;
			case 'author':
				this.setState({author:e.target.value})
				break;
			case 'category':
				this.setState({category:e.target.value})
				break;
			case 'text':
				this.setState({text:e.target.value})
				break;
		}
	}


	addComment(){
		fetch('http://localhost:3001/comments',
			{
				method:'POST',
				headers:{
					'Authorization': 'whatever-you-want',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({id:uuid(22,16),timestamp:Date.now(),body:this.state.text,author:this.state.author,parentId:this.props.id})
			}).then(res=>res.json()).then(data=>{this.props.addC(data);this.props.closeAdd()})
	}


	render(){
		return(
			<div>
    		<FormGroup controlId="formControlsText">
      			<ControlLabel>请输入作者</ControlLabel>
      			<FormControl type="text" label="作者" name="author" placeholder="请输入作者" value={this.state.author} onChange={this.handleClick.bind(this)}/>
    		</FormGroup>
    		<FormGroup controlId="formControlsTextarea">
      			<ControlLabel>正文</ControlLabel>
      			<FormControl componentClass="textarea" name="text" placeholder="正文" value={this.state.text} onChange={this.handleClick.bind(this)}/>
    		</FormGroup>
    		<Button bsStyle="primary" onClick={this.addComment.bind(this)}>提交</Button>
    		</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
  return {
  	addC: (data) => {dispatch(addC(data))}
  }  
}

export default connect(null,mapDispatchToProps)(AddComment);




