import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { selectBadgeByVoteScore } from '../utils/helpers'
import { 
    ListGroup,
    Button,
    Form
} from 'react-bootstrap'
import { 
    handleGetComments, 
    handleAddComment, 
    handleDeleteComment,
    handleVoteScoreComment,
    handleEditComment
} from '../actions/comments'
import uuidv1 from 'uuid/v1'

class Comments extends Component {

    state = {
        show: false,
        showCommentId: 0,
        body: '',
        bodyEdited: '',
        comments: []
    }

    componentDidMount() {
        this.props.dispatch(handleGetComments(this.props.id)).then(comments => {
            this.setState({ comments })
        })
    }

    handleChangeBody = (e) => {
        const body = e.target.value

        this.setState(() => ({
            body
        }))
    }

    handleSubmit = () => {

    }

    handlerEditComment = (comment) => {
        if (this.state.showCommentId === comment.id) {
            this.setState({ showCommentId: 0, bodyEdited: '', commentEdit: null })
        } else {
            this.setState({ showCommentId: comment.id, bodyEdited: comment.body, commentEdit: null })
        }
    }

    handleCloseComment = () => {
        this.setState({ showCommentId: 0 })
    }

    handleChangeCommentBody = (e) => {
        const body = e.target.value
        this.setState({ bodyEdited: body })
    }

    handleClose = () => {
        this.setState({ show: false })
    }

    handleShowComment = () => {
        console.log('Editando comentário', this.state.bodyEdited)

        if (this.state.commentEdit != null) {

            const { dispatch } = this.props
            
            dispatch(handleEditComment(this.state.commentEdit)).then(item => {
                this.props.dispatch(handleGetComments(this.props.id)).then(comments => {
                    this.setState({ 
                        showCommentId: 0, 
                        bodyEdited: '',
                        commentEdit: null
                    })
                })
            })
        }
    }

    handleShow = () => {
        if (this.state.show === false) {
            this.setState({ show: true })
        } else {
            if (this.state.body !== '') {

                const { body } = this.state
                const { dispatch, id } = this.props
                
                let comment = { 
                    body,
                    parentId: id,
                    id: uuidv1()
                } 

                dispatch(handleAddComment(comment)).then((item) => {
                    this.props.dispatch(handleGetComments(this.props.id)).then(comments => {
                        this.setState({ 
                            comments,
                            body: '',
                            show: false
                        })
                    })
                })
            }
        }
    }

    handlerDeleteComment = (commentId) => {
        console.log('Deletando id', commentId)

        const { dispatch } = this.props

        dispatch(handleDeleteComment(commentId)).then((item) => {
            this.props.dispatch(handleGetComments(this.props.id)).then(comments => {
                this.setState({ 
                    comments
                })
            })
        })
    }

    handlerVoteScoreComment = (commentId, option) => {
        let comment = { commentId, option }

        const { dispatch } = this.props

        dispatch(handleVoteScoreComment(comment)).then((item) => {
            this.props.dispatch(handleGetComments(this.props.id)).then(comments => {
                this.setState({ 
                    comments
                })
            })
        })
    }

    orderBy = (list) => {
        return list.sort((a, b) => {
            if (a.voteScore > b.voteScore) return -1
            if (a.voteScore < b.voteScore) return 1
            return 0
        })
    }

    render() {
        let comments = this.orderBy(this.state.comments).filter(item => item.deleted !== true)

        return (
            <Fragment>
                <h4 style={{ marginTop: 50, marginBottom: 30 }}>Comments of post</h4>
                <ListGroup variant="flush">
                    { comments.map((comment) => (
                        <ListGroup.Item key={comment.id} style={{ fontSize: 16 }}>
                            {comment.body} {selectBadgeByVoteScore(comment.voteScore)}
                            <Button variant="danger" type="submit" className="float-right" onClick={() => this.handlerDeleteComment(comment.id)}>
                                Delete Comment
                            </Button>
                            <Button variant="primary" style={{ marginRight: 10 }} type="submit" className="float-right" onClick={() => this.handlerEditComment(comment)}>
                                Edit Comment
                            </Button>
                            <Button variant="warning" style={{ marginRight: 10 }} type="submit" className="float-right" onClick={() => this.handlerVoteScoreComment(comment.id, "downVote")}>
                                Vote -
                            </Button>
                            <Button variant="success" style={{ marginLeft: 10, marginRight: 10 }} type="submit" className="float-right" onClick={() => this.handlerVoteScoreComment(comment.id, "upVote")}>
                                Vote +
                            </Button>
                            <div style={{ display: this.state.showCommentId === comment.id ? 'block' : 'none' }}>
                                <Button variant="primary" type="submit" style={{ marginTop: 20 }} onClick={this.handleShowComment}>
                                    Save Comment
                                </Button>
                                <Button variant="primary" type="submit" style={{ marginTop: 20, marginLeft: 20 }} onClick={this.handleCloseComment}>
                                    Cancel
                                </Button>
                                <Form.Group style={{ marginTop: 10 }} controlId="formBody">
                                    <Form.Control value={this.state.bodyEdited} onChange={this.handleChangeCommentBody} as="textarea" rows="2" placeholder="Enter a new comment" />
                                </Form.Group>
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                <Button variant="primary" type="submit" style={{ marginTop: 20 }} onClick={this.handleShow}>
                    Add Comment
                </Button>
                <Button variant="primary" type="submit" style={{ visibility: this.state.show === true ? 'visible' : 'hidden', marginTop: 20, marginLeft: 20 }} onClick={this.handleClose}>
                    Cancel
                </Button>
                <Form.Group style={{ visibility: this.state.show === true ? 'visible' : 'hidden', marginTop: 10 }} controlId="formBody">
                    <Form.Control value={this.state.body} onChange={this.handleChangeBody} as="textarea" rows="2" placeholder="Enter a new comment" />
                </Form.Group>
            </Fragment>
        )
    }
}

export default connect()(Comments)