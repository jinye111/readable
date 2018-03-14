import React, { Component } from 'react';
import { showPosts,showCategories,delPost } from '../actions'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

class showPost extends Component{

	componentDidMount(){
	    fetch('http://localhost:3001/posts',
	        {
	            headers: { 'Authorization': 'whatever-you-want' }
	        }
	    ).then(res=>res.json()).then(data => {this.props.showPosts(data)})
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
					<div>
						<Link to={`/${post.category}/${post.id}/`} key={post.id}><div className="row" key={post.id} onClick={this.postDetail.bind(null,post.id)}>
							<div className="col-xs-1 col-sm-4">{post.title}</div>
							<div className="col-xs-1 col-sm-1">类别:{post.category}</div>
							<div className="col-xs-1 col-sm-1">评论数:{post.commentCount}</div>
							<div className="col-xs-1 col-sm-2">time:{post.timestamp}</div>
							<div className="col-xs-1 col-sm-1">点赞数:{post.voteScore}</div>
						</div></Link>
						<span onClick={this.del.bind(this,post.id)}>删除</span>
					</div>	
				))
				}
			</div>
		);
	}
}

function mapStateToProps ({ posts }/*默认值加解构数组*/) {
  return {
    posts: posts!=null&&Array.isArray(posts)&&posts.filter((post)=>{if (!post.deleted) {return post}})
  }  
}

function mapDispatchToProps (dispatch) {
  return {
    showPosts: (data) => {dispatch(showPosts(data));console.log(data)},
    delPost: (data) => {dispatch(delPost(data));console.log(data)},
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(showPost)