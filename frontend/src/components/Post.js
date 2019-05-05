import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formattingDate, selectBadgeByVoteScore } from '../utils/helpers'
import { Link, withRouter } from 'react-router-dom'
import { 
    ListGroup,
    Button
} from 'react-bootstrap'
import { handleVoteScorePost } from '../actions/posts'
import { handleInitialData } from '../actions/shared'

class Post extends Component {

    handlerVoteScorePost = (postId, option) => {
        let post = { postId, option }

        const { dispatch } = this.props

        dispatch(handleVoteScorePost(post)).then((item) => {
            dispatch(handleInitialData())
        })
    }

    render() {
        const { post } = this.props

        if (post === null) {
            return <p>This Post doesn't exists</p>
        }

        const {
            id, timestamp, voteScore, title, commentCount
        } = post

        return (
            <ListGroup.Item key={id} action>
                <Link to={`/post/details/${id}`}>
                    {formattingDate(timestamp)} - {title} {selectBadgeByVoteScore(voteScore)} - Comments: {commentCount}
                </Link>
                <Button variant="warning" type="submit" className="float-right" onClick={() => this.handlerVoteScorePost(id, "downVote")}>
                    Vote -
                </Button>
                <Button variant="success" style={{ marginLeft: 10, marginRight: 10 }} type="submit" className="float-right" onClick={() => this.handlerVoteScorePost(id, "upVote")}>
                    Vote +
                </Button>
            </ListGroup.Item>
        )
    }
}

function mapStateToProps ({ posts }, { id }) {

    let newPosts = posts != null ? Object.values(posts) : []
    let post = newPosts.filter(item => item.id === id)[0]

    return {
        post
    }
}

export default withRouter(connect(mapStateToProps)(Post))