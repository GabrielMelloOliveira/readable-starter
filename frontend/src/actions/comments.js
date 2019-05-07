import { showLoading, hideLoading } from 'react-redux-loading'
import { 
    getComments, 
    saveComment, 
    deleteComment, 
    voteScoreComment,
    editComment 
} from '../utils/api'
import { DELETE_POST } from './posts';

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'

export function receiveComments (comments) {
    return {
        type: RECEIVE_COMMENTS,
        comments
    }
}

export function handleGetComments (postId) {
    return (dispatch) => {
        //dispatch(showLoading())

        return getComments(postId)
        //.then((comments) => dispatch(receiveComments(comments)))
        //.then(() => dispatch(hideLoading()))
    }
}

export function addComment (comment) {
    return {
        type: ADD_COMMENT,
        comment
    }
}

export function handleAddComment (comment) {
    return (dispatch) => {
        dispatch(showLoading())

        return saveComment({
            id: comment.id,
            parentId: comment.parentId,
            body: comment.body,
            timestamp: Date.now(),
            author: 'Gabriel Mello',
            voteScore: 1,
            deleted: false,
            parentDeleted: false
        })
        .then((comment) => dispatch(addComment(comment)))
        .then(() => dispatch(hideLoading()))
    }
}

export function removeComment (comment) {
    return {
        type: DELETE_COMMENT,
        comment
    }
}

export function handleDeleteComment (commentId) {
    return (dispatch) => {
        dispatch(showLoading())

        return deleteComment(commentId)
        .then((comment) => dispatch(removeComment(comment)))
        .then(() => dispatch(hideLoading()))
    }
}

export function handleVoteScoreComment (comment) {
    return (dispatch) => {
        dispatch(showLoading())

        return voteScoreComment(comment)
        .then(() => dispatch(hideLoading()))
    }
}

export function handleEditComment (comment) {
    return (dispatch) => {
        dispatch(showLoading())

        return editComment({
            id: comment.id,
            parentId: comment.parentId,
            body: comment.body,
            timestamp: Date.now(),
            author: comment.author,
            voteScore: comment.voteScore,
            deleted: comment.deleted,
            parentDeleted: comment.parentDeleted
        })
        .then(() => dispatch(hideLoading()))
    }
}