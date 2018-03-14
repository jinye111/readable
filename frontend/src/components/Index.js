import React, { Component } from 'react';
import ShowPost from './showPosts'
import ShowCategorie from './ShowCategories'
import { Button } from 'react-bootstrap';
import AddPost from './AddPost';

class Index extends Component{

	state={
		isAdd:false
	}

	showAdd(){
		this.setState({
			isAdd:true
		})
	}

	closeAdd(){
		this.setState({
			isAdd:false
		})
	}

	render(){
		return (
			<div>
				<ShowCategorie/>
        		<ShowPost />
        		<Button bsStyle="primary" onClick={this.showAdd.bind(this)}>添加帖子</Button>
        		{this.state.isAdd&&<AddPost closeAdd={this.closeAdd.bind(this)}/>}
			</div>
		)
	}
}

export default Index;