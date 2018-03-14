import { SHOW_POSTS,SHOW_CATEGORIES,SHOW_POSTS_BYCATEGORIES,SHOW_POSTS_DETALI,SHOW_COMMENTS,ADD_COMMENT,ADD_POST,DEL_POSTS,DEL_COMMENTS,EDIT_POSTS,EDIT_COMMENTS,ADD_VOTE,ADD_PVOTE } from '../actions'
import { combineReducers } from 'redux'

export function posts(state = null, action){
  const {posts}=action
  const {id}=action
  console.log(state)
  switch(action.type){
    case SHOW_POSTS:
      return posts
    case DEL_POSTS:
      return state.filter((s)=>{if(s.id!==id) {return s}})

    case SHOW_POSTS_BYCATEGORIES:
      return posts

    case SHOW_POSTS_DETALI:
      return posts

    case ADD_POST:
      return state.concat(posts)

    case EDIT_POSTS:
      return posts

    case ADD_PVOTE:
      return posts

    default :
      return state
  }
}

export function categories(state = null, action){
  const {categories}=action
  console.log(state)
  switch(action.type){
    case SHOW_CATEGORIES:
      return categories
      

    default :
      return state
  }
}


export function comments(state = null, action){
  const { comments }=action
  console.log(state)
  console.log(comments)
  const {id}=action
  switch(action.type){
    case SHOW_COMMENTS:
      return comments

    case ADD_COMMENT:
      return state.concat(comments)

    case DEL_COMMENTS:
      return state.filter((s)=>{if(s.id!==id) {return s}})

    case EDIT_COMMENTS:
      return state.map((s)=>{if (s.id!==comments.id) {return s} return comments})

    case ADD_VOTE:
      return state.map((s)=>{if (s.id!==comments.id) {return s} return comments})


    default :
      return state
  }  
}

export default combineReducers({
  posts,
  categories,
  comments
})