import { 
    RECEIVE_POSTS, 
    RECEIVE_POST, 
    ADD_POST,
    EDIT_POST
} from '../actions/posts'

export default function posts (state = {}, action) {
    switch(action.type) {
        case RECEIVE_POSTS:
            return {
                ...state,
                ...action.posts
            }
        case RECEIVE_POST:
            return {
                ...state,
                ...action.post
            }
        case ADD_POST:
            return {
                ...state,
                [action.post.id]: action.post,
            }
        case EDIT_POST:
            return {
                ...state,
                ...action.post
            } 
        default: 
            return state
    }
}