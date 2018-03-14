export const SHOW_POSTS = 'SHOW_POSTS'
export const SHOW_CATEGORIES = 'SHOW_CATEGORIES'
export const SHOW_POSTS_BYCATEGORIES='SHOW_POSTS_BYCATEGORIES'
export const SHOW_POSTS_DETALI='SHOW_POSTS_DETALI'
export const SHOW_COMMENTS='SHOW_COMMENTS'
export const ADD_COMMENT='ADD_COMMENT'
export const ADD_POST='ADD_POST'
export const DEL_POSTS='DEL_POSTS'
export const DEL_COMMENTS='DEL_COMMENTS'
export const EDIT_POSTS='EDIT_POSTS'
export const EDIT_COMMENTS='EDIT_COMMENTS'
export const ADD_VOTE='ADD_VOTE'
export const ADD_PVOTE='ADD_PVOTE'




export function showPosts (data) {
  return {
    type: SHOW_POSTS,
    posts:data,
  }
}

export function delPost (data) {
  return {
    type: DEL_POSTS,
    id:data.id,
  }
}


export function showPostsByCategory(data){
  return {
    type: SHOW_POSTS_BYCATEGORIES,
    posts: data,
  }
}

export function addC(data){
  return {
    type: ADD_COMMENT,
    comments: data,
  }
}

export function addP(data){
  return {
    type: ADD_POST,
    posts: data,
  }
}


export function showCategories (data) {
  return {
    type: SHOW_CATEGORIES,
    categories: data,
  }
}

export function showPostsDetails(data) {
  return {
    type: SHOW_POSTS_DETALI,
    posts: data,
  }
}

export function showComments(data) {
  return {
    type: SHOW_COMMENTS,
    comments: data,
  }
}

export function delComment(data) {
  return {
    type: DEL_COMMENTS,
    id: data.id,
  } 
}

export function editPost(data){
  return {
    type:EDIT_POSTS,
    posts: data,
  }
}

export function editComment(data){
  return {
    type:EDIT_COMMENTS,
    comments: data,
  }
}

export function addVote(data){
  return {
    type:ADD_VOTE,
    comments:data
  }
}

export function addPostVote(data){
  return {
    type:ADD_PVOTE,
    posts:data
  }
}





