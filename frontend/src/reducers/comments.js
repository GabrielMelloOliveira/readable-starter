import { 
    RECEIVE_COMMENTS, 
    ADD_COMMENT,
    DELETE_COMMENT
} from '../actions/comments'

export default function comments (state = {}, action) {
    switch(action.type) {
        case RECEIVE_COMMENTS:
            return {
                ...state,
                ...action.comments
            }
        case ADD_COMMENT:
            return {
                ...state,
                ...action.comment
            }
        case DELETE_COMMENT:
            // let post = state.posts.filter(item => item.id === comment.parentId)[0]
            // post
            // return {
            //     ...state,
            //     [action.post.id]: 
            // }
            return {
                ...state,
                ...action.comment
            }
        default: 
            return state
    }
}