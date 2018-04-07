import React,{ Component } from 'react'
import { connect } from 'react-redux'
import AddComment from './addComment'
import { showPostsDetails,showComments,delComment,editPost,addVote,addPostVote,delPost } from '../actions'
import { Button } from 'react-bootstrap';
import Edit from './Edit'
import { Link } from 'react-router-dom'

class PostDetail extends Component{

	state={
		isAdd:false,
		isEditPost:false,
		isEditComment:false,
		commentId:"",
		title:"",
		text:""
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

	showEditPost(){
		this.setState({
			isEditPost:true,
		})
	}

	closeEditPost(){
		this.setState({
			isEditPost:false
		})
	}

	showEditComment(id,text,body){
		this.setState({
			isEditComment:true,
			commentId:id,
			text:text,
			body:body
		})
	}

	closeEditComment(){
		this.setState({
			isEditComment:false
		})
	}

	del(data){
		fetch(`http://localhost:3001/comments/${data}`,
	        {
	        	method:'DELETE',
	            headers: { 'Authorization': 'whatever-you-want' }
	        }
	    ).then(res=>res.json()).then(data => {this.props.delComment(data)})
	}

	Ddel(data){
		fetch(`http://localhost:3001/posts/${data}`,
	        {
	        	method:'DELETE',
	            headers: { 'Authorization': 'whatever-you-want' }
	        }
	    ).then(res=>res.json()).then(data => {this.props.history.push('/');})
	}

	edit(data){
		fetch(`http://localhost:3001/posts/${data}`,
	        {
	        	method:'PUT',
	            headers: { 'Authorization': 'whatever-you-want' }
	        }
	    ).then(res=>res.json()).then(data => {this.props.editPost(data)})

	}

	vote(data1,data2,data3){
		fetch(`http://localhost:3001/${data1}/${data2}`,
	        {
	        	method:'POST',
	            headers: { 'Authorization': 'whatever-you-want','Content-Type': 'application/json' },
	            body: JSON.stringify({option:data3})
	        }
	    ).then(res=>res.json()).then(data => {if(data1==='comments') this.props.addVote(data); else this.props.addPostVote(data)})		
	}

	componentDidMount(){
		let api1=`http://localhost:3001/posts/${this.props.match.params.id}`
		let api2=`http://localhost:3001/posts/${this.props.match.params.id}/comments`
		fetch(api1,{headers:{'Authorization': 'whatever-you-want'}}).then(res=>res.json()).then(data=>{console.log(data);if(JSON.stringify(data)=="{}"){console.log("ggh");throw "404"} else {this.props.showPostsDetails(data);console.log("456")}}).catch((error)=>{if(error==="404"){this.props.history.push('/404');}})
		fetch(api2,{headers:{'Authorization': 'whatever-you-want'}}).then(res=>res.json()).then(data=>{this.props.showComments(data)})
	}

	render(){
		return (
			<div>
				<Link to="/">返回</Link>
				<div>
					{this.props.post&&<div className="row" key={this.props.post.id}>
						<div className="col-xs-1 col-sm-4">{this.props.post.title}</div>
						<div className="col-xs-1 col-sm-4">{this.props.post.body}</div>
						<div className="col-xs-1 col-sm-1">类别:{this.props.post.category}</div>
						<div className="col-xs-1 col-sm-1">评论数:{this.props.post.commentCount}</div>
						<div className="col-xs-1 col-sm-2">time:{this.props.post.timestamp}</div>
						<div className="col-xs-1 col-sm-1">点赞数:{this.props.post.voteScore}</div>
						<div onClick={this.showEditPost.bind(this)}>编辑</div>
						<div className="col-xs-1 col-sm-1" onClick={this.Ddel.bind(this,this.props.post.id)}>删除</div>
						<div className="col-xs-1 col-sm-1" onClick={this.vote.bind(this,'posts',this.props.post.id,'upVote')}>upVote</div>
						<div className="col-xs-1 col-sm-1" onClick={this.vote.bind(this,'posts',this.props.post.id,'downVote')}>downVote</div>
					</div>}
					<div>用户评论</div>
					{
						this.props.comments&&this.props.comments.map((comment)=>(
							<div className="row" key={comment.id}>
								<div className="col-xs-1 col-sm-3">{comment.body}</div>
								<div className="col-xs-1 col-sm-1">作者:{comment.author}</div>
								<div className="col-xs-1 col-sm-2">time:{comment.timestamp}</div>
								<div className="col-xs-1 col-sm-1">点赞数:{comment.voteScore}</div>
								<div className="col-xs-1 col-sm-1" onClick={this.del.bind(this,comment.id)}>删除</div>
								<div className="col-xs-1 col-sm-1" onClick={this.showEditComment.bind(this,comment.id,comment.title,comment.body)}>编辑</div>
								<div className="col-xs-1 col-sm-1" onClick={this.vote.bind(this,'comments',comment.id,'upVote')}>upVote</div>
								<div className="col-xs-1 col-sm-1" onClick={this.vote.bind(this,'comments',comment.id,'downVote')}>downVote</div>
							</div>
						))	
					}
					<Button bsStyle="primary" onClick={this.showAdd.bind(this)}>添加评论</Button>
					{this.state.isAdd&&<AddComment id={this.props.post.id} closeAdd={this.closeAdd.bind(this)}/>}
					{this.state.isEditPost&&<Edit cate="posts" id={this.props.post.id} closeEditPost={this.closeEditPost.bind(this)} title={this.props.post.title} text={this.props.post.body} page="one"/>}
					{this.state.isEditComment&&<Edit cate="comments" id={this.state.commentId} title={this.state.title} text={this.state.body} closeEditComment={this.closeEditComment.bind(this)}/>}
				</div>

			</div>
		)
	}
}

function mapStateToProps ({ posts,comments }/*默认值加解构数组*/) {
	console.log(comments)
  return {
    post: posts,
    comments: comments!=null&&comments.filter((comment)=>{if (!comment.deleted) {return comment}}),
  }  
}

function mapDispatchToProps (dispatch) {
  return {
  	delComment:(data)=>{dispatch(delComment(data));console.log(data)},
    showPostsDetails: (data) => {dispatch(showPostsDetails(data));console.log(data)},
    showComments:(data)=>{dispatch(showComments(data));console.log(data)},
    editPost: (data) => {dispatch(editPost(data));console.log(data)},
    addVote:(data)=>{dispatch(addVote(data));console.log(data)},
    addPostVote:(data)=>{dispatch(addPostVote(data));console.log(data)},
    delPost: (data) => {dispatch(delPost(data));console.log(data)},
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(PostDetail);



