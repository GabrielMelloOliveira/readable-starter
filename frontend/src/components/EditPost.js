import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Container, Button, Form } from 'react-bootstrap'
import Header from './Header'
import { Redirect } from 'react-router-dom'
import { handleEditPost } from '../actions/posts'

class EditPost extends Component {

    state = {
        title: this.props.post.title,
        body: this.props.post.body,
        category: this.props.post.category,
        toBack: false
    }

    handleChangeTitle = (e) => {
        const title = e.target.value

        this.setState(() => ({
            title
        }))
    }

    handleChangeBody = (e) => {
        const body = e.target.value

        this.setState(() => ({
            body
        }))
    }

    handleChangeCategory = (e) => {
        const category = e.target.value

        this.setState(() => ({
            category
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { title, body, category } = this.state
        const { dispatch } = this.props
        
        let post = this.props.post

        post.title = title
        post.body = body
        post.category = category

        dispatch(handleEditPost(post))

        this.setState(() => ({
            title: '',
            body: '',
            category: '',
            toBack: true
        }))
    }

    handleBack = () => {
        this.setState({
            toBack: true
        })
    }

    render() {

        if (this.state.toBack === true) {
            return <Redirect to={`/${this.props.post.category}/${this.props.post.id}`} />
        }

        return (
            <Fragment>
                <Header />
                <Container style={{ marginTop: 50 }}>
                    <Form>
                        <Form.Group controlId="formTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control onChange={this.handleChangeTitle} value={this.state.title} type="text" placeholder="Enter a title" />
                        </Form.Group>

                        <Form.Group controlId="formBody">
                            <Form.Label>Content</Form.Label>
                            <Form.Control onChange={this.handleChangeBody} value={this.state.body} as="textarea" rows="3" placeholder="Enter a content" />
                        </Form.Group>

                        <Form.Group controlId="formCategory">
                            <Form.Label>Category</Form.Label>
                            <Form.Control onChange={this.handleChangeCategory} value={this.state.category} as="select">
                                { this.props.categories.map((category) => (
                                    <option key={category.name}>{category.name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Button variant="primary" type="submit" style={{ marginRight: 10 }} onClick={this.handleSubmit}>
                            Save
                        </Button>
                        <Button variant="danger" type="submit" onClick={this.handleBack}>
                            Back
                        </Button>
                    </Form>
                </Container>
            </Fragment>
        )
    }
}

function mapStateToProps ({ categories, posts }, props) {
    const { id } = props.match.params

    let newPosts = posts != null ? Object.values(posts) : []
    let post = newPosts.filter(item => item.id === id)[0]

    return {
        categories: Object.values(categories),
        posts: newPosts,
        post: post
    }
}

export default connect(mapStateToProps)(EditPost)