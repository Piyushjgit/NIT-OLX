import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'

const NotFound = () => {
    return (
        <Container className='mt-3'>
            <Row>
                <Col>
                    <img src="https://cdn-icons.flaticon.com/png/512/4196/premium/4196404.png?token=exp=1649766489~hmac=22928531385176b7ee4f80758ef92d2a" alt="Image" />
                </Col>
                <Row className='my-auto ml-5'>
                    <Col>
                        <h1><strong>Page Not Found</strong></h1>
                        <p>Sorry, but we can't find the page you are looking for...</p>
                        <Button href='/home' variant='light'><strong>Back to Home</strong></Button>
                    </Col>
                </Row>
                <Col>
                </Col>
            </Row>
        </Container>
    )
}

export default NotFound
