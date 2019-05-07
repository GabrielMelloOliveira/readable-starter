import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Container, Button } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import { 
    formattingDate, 
    selectBadgeByVoteScore 
} from '../utils/helpers'
import { handleDeletePost, handleGetPosts } from '../actions/posts'
import Header from './Header'
import Comments from './Comments'

class DetailsPost extends Component {

    state = {
        toHome: false,
        toEdit: false
    }

    handlerDeletePost = (postId) => {
        const { dispatch } = this.props

        dispatch(handleDeletePost(postId)).then(_ => {
            this.setState({ 
                toHome: true,
                toEdit: false
            })
        })
    }

    handlerEditPost = () => {
        this.setState({ 
            toHome: false,
            toEdit: true
        })
    }

    handleBackToHome = () => {
        this.setState({ 
            toHome: true,
            toEdit: false
        })
    }

    render() {

        if (this.props.post === null || this.props.post === undefined) {
            return <Fragment>
                <Header /> 
                <Container style={{ marginTop: 50, textAlign: 'center' }}>
                    <h1 style={{ textAlign: 'center' }}>Post not found</h1>
                </Container>
            </Fragment>
        }

        const { 
            id, title, body, author,
            timestamp, voteScore, commentCount
        } = this.props.post

        if (this.state.toHome === true && this.state.toEdit === false) {
            return <Redirect to='/' />
        } else if (this.state.toHome === false && this.state.toEdit === true) {
            return <Redirect to={`/post/${id}`} />
        }

        return (
            <Fragment>
                <Header />
                <Container style={{ marginTop: 50 }}>
                    <div>
                        <h2>{title} {selectBadgeByVoteScore(voteScore)}</h2>
                        <p style={{ marginBottom: '1.25rem', color: '#999' }}>Author: {author} - {formattingDate(timestamp)}</p>
                        <p>{body}</p>
                        <p>Comment Count: {commentCount}</p>
                        <Button variant="primary" type="submit" style={{ marginRight: 10 }} onClick={this.handlerEditPost}>
                            Edit Post
                        </Button>
                        <Button variant="danger" type="submit" onClick={() => this.handlerDeletePost(id)}>
                            Delete Post
                        </Button>
                        <Button variant="dark" className="float-right" type="submit" onClick={() => this.handleBackToHome()}>
                            Back to Home
                        </Button>
                    </div>
                    <Comments id={id} />
                </Container>
            </Fragment>
        )
    }
}

function mapStateToProps ({ categories, posts }, props) {
    const { category, post_id } = props.match.params

    let newPosts;
    let post;

    if (posts != null) {
        newPosts = posts != null ? Object.values(posts) : []
        post = newPosts.filter(item => item.id === post_id && item.category === category)[0]
    } else {
        handleGetPosts().then(items => {
            posts = items
            newPosts = posts != null ? Object.values(posts) : []
            post = newPosts.filter(item => item.id === post_id && item.category === category)[0]
        })
    }

    return {
        categories: Object.values(categories),
        posts: newPosts,
        post: post
    }
}

export default connect(mapStateToProps)(DetailsPost)