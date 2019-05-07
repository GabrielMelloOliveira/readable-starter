import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Container, Button, Form } from 'react-bootstrap'
import Header from './Header'
import { handleAddPost } from '../actions/posts'
import uuidv1 from 'uuid/v1'
import { Redirect } from 'react-router-dom'

class SavePost extends Component {

    state = {
        title: '',
        body: '',
        category: 'react',
        toBack: false,
        alert: false
    }

    handleChangeTitle = (e) => {
        const title = e.target.value

        this.setState(() => ({
            title
        }))
    }

    handleChangeBody = (e) => {
        const body = e.target.value
        console.log(body)

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

        if (title !== '' && body !== '' && category !== '') {

            let post = { 
                title, 
                body, 
                category,
                id: uuidv1()
            } 

            dispatch(handleAddPost(post))

            this.setState(() => ({
                title: '',
                body: '',
                category: '',
                toBack: true
            }))
        } else {
            this.setState(() => ({
                alert: true
            }))
        }
    }

    handleBack = () => {
        this.setState({
            toBack: true
        })
    }

    render() {

        if (this.state.toBack === true) {
            return <Redirect to='/' />
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

                        { 
                            this.state.alert ? <label style={{ marginLeft: 10, color: 'red' }}>Please fill all fields</label> : ''
                        }
                    </Form>
                </Container>
            </Fragment>
        )
    }
}

function mapStateToProps ({ categories, posts }) {
    return {
        categories: Object.values(categories),
        posts: posts != null ? Object.values(posts) : []
    }
}

export default connect(mapStateToProps)(SavePost)