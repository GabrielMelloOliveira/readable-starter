import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { 
    ToggleButton, 
    ToggleButtonGroup, 
    ListGroup, 
    Container, 
    Row, 
    Col, 
    Button, 
    ButtonToolbar 
} from 'react-bootstrap'
import Header from './Header'
import Post from './Post'

class Dashboard extends Component {
    state = {
        orderBy: 1
    }

    handleOrderBy = (e) => {
        this.setState(() => ({
            orderBy: e
        }))
    }

    orderBy = (list) => {
        return list.sort((a, b) => {
            if (this.state.orderBy === 1) {
                if (a.voteScore > b.voteScore) return -1
                if (a.voteScore < b.voteScore) return 1
                return 0
            } else if (this.state.orderBy === 2) {
                if (a.timestamp > b.timestamp) return -1
                if (a.timestamp < b.timestamp) return 1
                return 0
            } else {
                return 0
            }
        });
    }

    render() {

        let posts = this.orderBy(this.props.posts).filter(item => item.deleted !== true)

        return (
            <Fragment>
                <Header />
                <Container style={{ marginTop: 50 }}>
                    <Row>
                        <ButtonToolbar>
                            <Button href="\post" variant="primary" style={{ marginLeft: 15, marginBottom: 15 }}>
                                Add New Post
                            </Button>
                        </ButtonToolbar>

                        <ButtonToolbar>
                            <ToggleButtonGroup onChange={this.handleOrderBy} type="radio" name="options" value={this.state.orderBy} defaultValue={this.state.orderBy} style={{ marginLeft: 15, marginBottom: 15 }}>
                                <ToggleButton value={1}>Order by Score</ToggleButton>
                                <ToggleButton value={2}>Order by Date</ToggleButton>
                            </ToggleButtonGroup>
                        </ButtonToolbar>
                    </Row>
                    <Row>
                        <Col md="9">
                            <ListGroup>
                                { posts.map((post) => (
                                    <Post key={post.id} id={post.id}/>
                                ))}
                            </ListGroup>
                        </Col>
                        <Col md="3">
                            <ListGroup>
                                <ListGroup.Item action href="/" active>
                                    All categories
                                </ListGroup.Item>
                                { this.props.categories.map((category) => (
                                    <ListGroup.Item key={category.name} action href={`/categories/${category.name}`}>{category.name}</ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Col>
                    </Row>
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

export default connect(mapStateToProps)(Dashboard)