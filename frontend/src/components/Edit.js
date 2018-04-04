import React,{ Component } from 'react';
import { FormGroup,ControlLabel,FormControl,option,Button } from 'react-bootstrap';
import { editPost,editComment,editPostIndex } from '../actions'
import { connect } from 'react-redux'

class Edit extends Component{


	state={
		title:this.props.title,
		text:this.props.text,
	}

	edit(page){
			let data=null
			if (this.props.cate==="posts") {
				data={body:this.state.text,title:this.state.title}
			}
			else{
				data={body:this.state.text,timestamp:Date.now()}
			}
			console.log("123")
			fetch(`http://localhost:3001/${this.props.cate}/${this.props.id}`,
		        {
		        	method:'PUT',
		            headers: { 'Authorization': 'whatever-you-want','Content-Type': 'application/json' },
		            body:JSON.stringify(data)
		        }
		     ).then(res=>res.json()).then(data => {
		    	console.log(data);
		    	if(this.props.cate==="posts"){
		    		if(page==="one"){
		    			this.props.editPost(data)
		    			this.props.closeEditPost()
		    		}
		    		else{
		    			this.props.editPostIndex(data)
		    			this.props.closeEditPost()
		    		}
		    	}
		    	else{
		    		this.props.editComment(data)
		    		this.props.closeEditComment()
		    	}
		    })

		}

	handleClick(e){

		switch(e.target.name)
		{
			case 'title':
				this.setState({title:e.target.value});
				break;
			case 'text':
				this.setState({text:e.target.value})
				break;
		}
	}

	render(){
		console.log(this.props.id);
		return (
			<div>
	    		{this.props.cate==="posts"&&<FormGroup controlId="formControlsText">
	      			<ControlLabel>请输入题目</ControlLabel>
	      			<FormControl type="text" label="题目" name="title" placeholder="请输入题目" value={this.state.title} onChange={this.handleClick.bind(this)}/>
	    		</FormGroup>}
	    		<FormGroup controlId="formControlsTextarea">
	      			<ControlLabel>正文</ControlLabel>
	      			<FormControl componentClass="textarea" name="text" placeholder="正文" value={this.state.text} onChange={this.handleClick.bind(this)}/>
	    		</FormGroup>
	    		<Button bsStyle="primary" onClick={this.edit.bind(this,this.props.page)}>提交</Button>
    		</div>
		)
	}
}

function mapDispatchToProps (dispatch) {
  return {
    editPost: (data)=>{dispatch(editPost(data))},
    editPostIndex: (data)=>{dispatch(editPostIndex(data))},
    editComment: (data)=>{dispatch(editComment(data))}
  }  
}
export default connect(null,mapDispatchToProps)(Edit);






