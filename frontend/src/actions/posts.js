import { savePost, getPost, voteScorePost, deletePost, editPost, getPosts } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_POST = 'RECEIVE_POST'
export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'

export function receivePosts(posts) {
    return {
        type: RECEIVE_POSTS,
        posts
    }
}

export function receivePost(post) {
    return {
        type: RECEIVE_POSTS,
        post
    }
}

export function handleGetPost (postId) {
    return (dispatch) => {
        dispatch(showLoading())

        return getPost(postId)
        .then((postId) => dispatch(getPost(postId)))
        .then(() => dispatch(hideLoading()))
    }
}

export function handleGetPosts () {
    return (dispatch) => getPosts()
}

export function addPost (post) {
    return {
        type: ADD_POST,
        post
    }
}

export function handleAddPost (post) {
    return (dispatch) => {
        dispatch(showLoading())

        return savePost({
            id: post.id,
            title: post.title,
            body: post.body,
            category: post.category,
            timestamp: Date.now(),
            author: 'Gabriel Mello',
            voteScore: 1,
            deleted: false
        })
        .then((post) => dispatch(addPost(post)))
        .then(() => dispatch(hideLoading()))
    }
}

export function updatePost (post) {
    return {
        type: EDIT_POST,
        post
    }
}

export function handleEditPost (post) {
    return (dispatch) => {
        dispatch(showLoading())
        
        return editPost({
            id: post.id,
            title: post.title,
            body: post.body,
            category: post.category,
            timestamp: post.timestamp,
            author: 'Gabriel Mello',
            voteScore: post.voteScore,
            deleted: post.deleted
        })
        .then((post) => dispatch(updatePost(post)))
        .then(() => dispatch(hideLoading()))
    }
}

export function handleVoteScorePost (post) {
    return (dispatch) => {
        dispatch(showLoading())
        
        return voteScorePost(post)
        .then(() => dispatch(hideLoading()))
    }
}

export function removePost (post) {
    return {
        type: DELETE_POST,
        post
    }
} 

export function handleDeletePost (postId) {
    return (dispatch) => {
        dispatch(showLoading())

        return deletePost(postId)
        .then((post) => dispatch(removePost(post)))
        .then(() => dispatch(hideLoading()))
    }
}