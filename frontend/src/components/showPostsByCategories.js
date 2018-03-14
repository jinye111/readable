import React,{Component} from 'react';
import { connect } from 'react-redux';
import { showPostsByCategory } from '../actions'
import {Link} from 'react-router-dom'
class showPostsByCategories extends Component{

	componentDidMount(){
		this.getPosts(this.props.match.params.category)	
	}

	getPosts(path){
		let api
		if (path==="all") {
			api="http://localhost:3001/posts"
		}
		else(
			api=`http://localhost:3001/${path}/posts`
		)
		fetch(api,
			{headers:{ 'Authorization': 'whatever-you-' }}
		).then(res=>res.json()).then(data=>this.props.showPostsByCategory(data))
	}

	render(){
		return (
			<div>
			{this.props.posts&&this.props.posts.map((post)=>(
						<Link to={`/${post.category}/${post.id}/`}><div className="row" key={post.id}>
							<div className="col-xs-1 col-sm-4">{post.body}</div>
							<div className="col-xs-1 col-sm-1">类别:{post.category}</div>
							<div className="col-xs-1 col-sm-1">评论数:{post.commentCount}</div>
							<div className="col-xs-1 col-sm-2">time:{post.timestamp}</div>
							<div className="col-xs-1 col-sm-1">点赞数:{post.voteScore}</div>
						</div></Link>
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
    showPostsByCategory: (data) => {dispatch(showPostsByCategory(data));console.log(data)}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(showPostsByCategories)