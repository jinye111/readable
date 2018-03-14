import React, { Component } from 'react';
import { FormGroup,ControlLabel,FormControl,option,Button } from 'react-bootstrap';
import { connect } from 'react-redux'
import { uuid } from '../utils/uuid'
import { addP } from '../actions'

class AddPost extends Component{


	state={
		title:'',
		author:'',
		text:'',
		category:'react'
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


	AddPost(){
		fetch('http://localhost:3001/posts',
			{
				method:'POST',
				headers:{
					'Authorization': 'whatever-you-want',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({id:uuid(22,16),timestamp:Date.now(),title:this.state.title,body:this.state.text,author:this.state.author,category:this.state.category})
			}).then(res=>res.json()).then(data=>{this.props.addP(data);this.props.closeAdd()})
	}


	render(){
		return(
			<div>
			<FormGroup controlId="formControlsText">
      			<ControlLabel>请输入标题</ControlLabel>
      			<FormControl type="text" label="正文" name="title" placeholder="请输入题目" value={this.state.title} onChange={this.handleClick.bind(this)}/>
    		</FormGroup>
    		<FormGroup controlId="formControlsText">
      			<ControlLabel>请输入作者</ControlLabel>
      			<FormControl type="text" label="正文" name="author" placeholder="请输入作者" value={this.state.author} onChange={this.handleClick.bind(this)}/>
    		</FormGroup>
    		<FormGroup controlId="formControlsSelect">
      			<ControlLabel>选择类型</ControlLabel>
      			<FormControl componentClass="select" name="category" placeholder="select" value={this.state.category} onChange={this.handleClick.bind(this)}>
               		{this.props.categories&&this.props.categories.map((category)=>(
        				<option value={category.name} key={category.path}>{category.name}</option>
					))}
      			</FormControl>
    		</FormGroup>
    		<FormGroup controlId="formControlsTextarea">
      			<ControlLabel>正文</ControlLabel>
      			<FormControl componentClass="textarea" name="text" placeholder="正文" value={this.state.text} onChange={this.handleClick.bind(this)}/>
    		</FormGroup>
    		<Button bsStyle="primary" onClick={this.AddPost.bind(this)}>提交</Button>
    		</div>
		);
	}
}

function mapStateToProps ({ categories }/*默认值加解构数组*/) {
  return {
    categories: categories
  }  
}

function mapDispatchToProps (dispatch) {
  return {
    addP : (data)=>{dispatch(addP(data))}
  }  
}
export default connect(mapStateToProps,mapDispatchToProps)(AddPost);




