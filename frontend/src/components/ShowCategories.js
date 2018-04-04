import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showPostsByCategories,showCategories } from '../actions'
import {Link} from 'react-router-dom'


class ShowCategorie extends Component{

	componentDidMount(){

		fetch('http://localhost:3001/categories',
        	{headers: { 'Authorization': 'whatever-you-want' }})
		.then(res=>res.json()).then(data=>{this.props.showCategories(data.categories)})
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
			{headers:{ 'Authorization': 'whatever-you-want' }}
		).then(res=>res.json()).then(data=>this.props.showPostsByCategories(data))
	}


	render(){
		return(
			<div>
				
				<div>全部分类</div>
				{
					this.props.categories&&this.props.categories.map((category)=>(
						<div key={category.path}>
							<Link to={`/${category.path}`}><div>{category.name}</div></Link>
						</div>
					))
				}
			</div>
		);	
	}
}

// function mapStateToProps ({ posts, categories }/*默认值加解构数组*/) {
//   return {
//     posts: posts.map((post)=(if (post==) {})),
//     categories: categories
//   }  
// }

// function mapDispatchToProps (dispatch) {
//   return {
//     showPostsByCategories: (data) => {dispatch(showPostsByCategories(data));console.log(data)}
//   }
// }

function mapStateToProps ({ posts, categories }/*默认值加解构数组*/) {
  return {
    categories: categories
  }  
}

function mapDispatchToProps (dispatch) {
  return {
    showCategories: (data) => {dispatch(showCategories(data))}
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(ShowCategorie);





