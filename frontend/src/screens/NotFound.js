import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import pdt from './image.png';
const NotFound = () => {
    return (
        <Container className='mt-3'>
            <Row>
                <Col>
                    <img src={pdt} alt="Image" style={{maxWidth:'80vw',maxHeight:'80vh'}}/>
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
