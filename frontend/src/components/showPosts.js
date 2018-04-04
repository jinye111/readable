import React, { Component } from 'react';
import { showPosts,showCategories,delPost } from '../actions'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import {vote} from '../utils/vote';
import { addPostVoteInIndex } from '../actions'
import Edit from './Edit'

class showPost extends Component{

	state={
		isEditPost:false,
		id:"",
		title:"",
		body:""
	}

	componentDidMount(){
	    fetch('http://localhost:3001/posts',
	        {
	            headers: { 'Authorization': 'whatever-you-want' }
	        }
	    ).then(res=>res.json()).then(data => {this.props.showPosts(data)})
	}

	showEditPost(id,body,title){
		this.setState({
			isEditPost:true,
			id:id,
			body:body,
			title:title
		})
	}

	closeEditPost(){
		this.setState({
			isEditPost:false
		})
	}

	postDetail(data){
		let api1=`http://localhost:3001/posts/${data}`
		let api2=`http://localhost:3001/posts/${data}/comments`
		fetch(api1,{headers:{'Authorization': 'whatever-you-want'}}).then(res=>res.json()).then(data=>{fetch(api2,{headers:{'Authorization': 'whatever-you-want'}}).then(res=>res.json()).then(data=>console.log(data))})
	}

	del(data){
		fetch(`http://localhost:3001/posts/${data}`,
	        {
	        	method:'DELETE',
	            headers: { 'Authorization': 'whatever-you-want' }
	        }
	    ).then(res=>res.json()).then(data => {this.props.delPost(data)})
	}


	
	render(){
		console.log(this.props.posts)
		return(
			<div>
				{this.props.posts&&Array.isArray(this.props.posts)&&this.props.posts.map((post)=>(
					<div key={post.id}>
						<Link to={`/${post.category}/${post.id}/`} key={post.id}><div className="row" onClick={this.postDetail.bind(null,post.id)}>
							<div className="col-xs-1 col-sm-4">{post.title}</div>
							<div className="col-xs-1 col-sm-1">类别:{post.category}</div>
							<div className="col-xs-1 col-sm-1">评论数:{post.commentCount}</div>
							<div className="col-xs-1 col-sm-2">time:{post.timestamp}</div>
							<div className="col-xs-1 col-sm-1">点赞数:{post.voteScore}</div>
						</div></Link>
						<span className="col-xs-1 col-sm-1" onClick={this.showEditPost.bind(this,post.id,post.body,post.title)}>编辑</span>
						<span className="col-xs-1 col-sm-1" onClick={vote.bind(this,'posts',post.id,'upVote')}>upVote</span>
						<span className="col-xs-1 col-sm-1" onClick={vote.bind(this,'posts',post.id,'downVote')}>downVote</span>
						<span className="col-xs-1 col-sm-1" onClick={this.del.bind(this,post.id)}>删除</span>
					</div>	
				))
				}
				{this.state.isEditPost&&<Edit cate="posts" id={this.state.id} title={this.state.title} text={this.state.body} closeEditPost={this.closeEditPost.bind(this)}/>}
			</div>
		);
	}
}

function mapStateToProps ({ posts }/*默认值加解构数组*/) {
  return {
    posts: posts!=null&&Array.isArray(posts)&&posts.sort(function(a,b){
		return b.voteScore-a.voteScore
    })
  }  
}

function mapDispatchToProps (dispatch) {
  return {
    showPosts: (data) => {dispatch(showPosts(data));console.log(data)},
    delPost: (data) => {dispatch(delPost(data));console.log(data)},
    addPostVote:(data)=>{dispatch(addPostVoteInIndex(data))}
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(showPost)