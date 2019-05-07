import {
    _getCategories,
    _getPosts,
    _getPost,
    _getComments,
    _savePost,
    _editPost,
    _saveComment,
    _deleteComment,
    _voteScoreComment,
    _voteScorePost,
    _deletePost,
    _editComment
  } from './_DATA.js'
  
export function getInitialData () {
    return Promise.all([
        _getCategories(),
        _getPosts()
    ]).then(([categories, posts]) => ({
        categories,
        posts
    }))
}

export function getPost (postId) {
    return _getPost(postId)
}
  
export function savePost (post) {
    return _savePost(post)
}

export function editPost (post) {
    return _editPost(post)
}

export function getComments (postId) {
    return _getComments(postId)
}

export function saveComment (comment) {
    return _saveComment(comment)
}

export function deleteComment (commentId) {
    return _deleteComment(commentId)
}

export function voteScoreComment (comment) {
    return _voteScoreComment(comment)
}

export function voteScorePost (post) {
    return _voteScorePost(post)
}

export function deletePost (postId) {
    return _deletePost(postId)
}

export function editComment (comment) {
    return _editComment(comment)
}

export function getPosts () {
    return _getPosts()
}
  
//   export function saveComments (info) {
//     return _saveComments(info)
//   }