import React, { Component } from 'react'
import { Jumbotron, Container } from 'react-bootstrap'

class Header extends Component {
    render() {
        return (
            <Jumbotron fluid>
                <Container>
                    <h1>Udacity Project</h1>
                    <p>
                        This is a udacity project.
                    </p>
                </Container>
            </Jumbotron>
        )
    }
}

export default Header