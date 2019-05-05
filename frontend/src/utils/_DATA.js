const URL_BASE = 'http://localhost:3001'
const TOKEN = 'gabriel-oliveira'
const HEADER = { headers: { 'Authorization': TOKEN } }

export function _getCategories () {
    return fetch(`${URL_BASE}/categories`, HEADER)
        .then(response => response.json())
        .then(data => data.categories)
}

export function _getPosts () {
    return fetch(`${URL_BASE}/posts`, HEADER)
        .then(response => response.json())
        .then(data => data)
}

export function _getPost (postId) {
    return fetch(`${URL_BASE}/posts/${postId}`, HEADER)
        .then(response => response.json())
        .then(data => data)
}

export function _getComments (postId) {
    return fetch(`${URL_BASE}/posts/${postId}/comments`, HEADER)
        .then(response => response.json())
        .then(data => data)
}

export function _savePost(post) {
    return fetch(`${URL_BASE}/posts`, {
        method: 'POST',
        headers: { 
            'Authorization': TOKEN, 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(post)
    })
    .then(response => response.json())
    .then(data => data)
}

export function _editPost(post) {
    return fetch(`${URL_BASE}/posts/${post.id}`, {
        method: 'PUT',
        headers: { 
            'Authorization': TOKEN, 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(post)
    })
    .then(response => response.json())
    .then(data => data)
}

export function _saveComment(comment) {
    return fetch(`${URL_BASE}/comments`, {
        method: 'POST',
        headers: { 
            'Authorization': TOKEN, 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(comment)
    })
    .then(response => response.json())
    .then(data => data)
}

export function _deleteComment(commentId) {
    return fetch(`${URL_BASE}/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': TOKEN, 
            'Content-Type': 'application/json' 
        }
    })
}

export function _voteScoreComment(comment) {
    return fetch(`${URL_BASE}/comments/${comment.commentId}`, {
        method: 'POST',
        headers: {
            'Authorization': TOKEN, 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({option: comment.option})
    })
}

export function _voteScorePost(post) {
    return fetch(`${URL_BASE}/posts/${post.postId}`, {
        method: 'POST',
        headers: {
            'Authorization': TOKEN, 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({option: post.option})
    })
}

export function _deletePost(postId) {
    return fetch(`${URL_BASE}/posts/${postId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': TOKEN, 
            'Content-Type': 'application/json' 
        }
    })
}

export function _editComment(comment) {
    return fetch(`${URL_BASE}/comments/${comment.id}`, {
        method: 'PUT',
        headers: { 
            'Authorization': TOKEN, 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(comment)
    })
    .then(response => response.json())
    .then(data => data)
}